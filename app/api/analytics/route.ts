import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface AnalyticsEntry {
  timestamp: string
  userAgent: string
  referrer: string
  pathname: string
  screenResolution: string
  language: string
  timezone: string
  sessionId: string
  event: string
  pageName?: string
  eventData?: Record<string, unknown>
  ip?: string
  country?: string
}

const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.json')

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.dirname(ANALYTICS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Enhanced IP to location mapping with multiple fallback methods
const getLocationFromIP = async (ip: string): Promise<string> => {
  // Skip localhost and private IPs
  if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.16.')) {
    return 'Local/Development'
  }

  try {
    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout

    // Try free IP geolocation service
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city,status`, {
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      const data = await response.json()
      if (data.status === 'success') {
        const location = [data.city, data.regionName, data.country]
          .filter(Boolean)
          .join(', ')
        return location || 'Unknown Location'
      }
    }
  } catch {
    console.log('Geolocation API failed, using fallback')
  }

  // Fallback: Try to determine from timezone if available
  return 'Unknown Location'
}

const readAnalyticsData = (): AnalyticsEntry[] => {
  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      const data = fs.readFileSync(ANALYTICS_FILE, 'utf8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error reading analytics data:', error)
    return []
  }
}

const writeAnalyticsData = (data: AnalyticsEntry[]) => {
  try {
    ensureDataDirectory()
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing analytics data:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(', ')[0] : request.headers.get('x-real-ip') || 'unknown'
    
    // Get location from IP (async)
    const country = await getLocationFromIP(ip)
    
    // Create analytics entry
    const entry: AnalyticsEntry = {
      ...body,
      ip: ip,
      country: country,
    }

    // Read existing data
    const analyticsData = readAnalyticsData()
    
    // Add new entry
    analyticsData.push(entry)
    
    // Keep only last 1000 entries to prevent file from growing too large
    const recentData = analyticsData.slice(-1000)
    
    // Write back to file
    writeAnalyticsData(recentData)

    return NextResponse.json({ success: true, message: 'Analytics data recorded' })
    
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { success: false, message: 'Error recording analytics' }, 
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Simple authentication - you might want to add proper auth
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.ANALYTICS_TOKEN || 'your-secret-token'
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const analyticsData = readAnalyticsData()
    
    // Check if CSV export is requested
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format')
    
    if (format === 'csv') {
      // Generate CSV data
      const csvData = generateCSV(analyticsData)
      
      return new NextResponse(csvData, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="analytics-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }
    
    // Basic analytics summary
    const summary = {
      totalVisits: analyticsData.length,
      uniqueVisitors: new Set(analyticsData.map(entry => entry.sessionId)).size,
      pageViews: analyticsData.filter(entry => entry.event === 'page_view').length,
      topPages: getTopPages(analyticsData),
      topReferrers: getTopReferrers(analyticsData),
      topLocations: getTopLocations(analyticsData),
      deviceInfo: getDeviceInfo(analyticsData),
      visitsByDay: getVisitsByDay(analyticsData),
      recentVisits: analyticsData.slice(-20).reverse()
    }

    return NextResponse.json(summary)
    
  } catch (error) {
    console.error('Analytics GET error:', error)
    return NextResponse.json(
      { error: 'Error retrieving analytics' }, 
      { status: 500 }
    )
  }
}

const getTopPages = (data: AnalyticsEntry[]) => {
  const pageViews = data.filter(entry => entry.event === 'page_view')
  const pageCounts = pageViews.reduce((acc, entry) => {
    acc[entry.pathname] = (acc[entry.pathname] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }))
}

const getTopReferrers = (data: AnalyticsEntry[]) => {
  const referrerCounts = data.reduce((acc, entry) => {
    const referrer = entry.referrer === 'direct' ? 'Direct' : new URL(entry.referrer || 'unknown://unknown').hostname
    acc[referrer] = (acc[referrer] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return Object.entries(referrerCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([referrer, count]) => ({ referrer, count }))
}

const getDeviceInfo = (data: AnalyticsEntry[]) => {
  const devices = data.map(entry => {
    const ua = entry.userAgent.toLowerCase()
    if (ua.includes('mobile')) return 'Mobile'
    if (ua.includes('tablet')) return 'Tablet'
    return 'Desktop'
  })
  
  const deviceCounts = devices.reduce((acc, device) => {
    acc[device] = (acc[device] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return Object.entries(deviceCounts).map(([device, count]) => ({ device, count }))
}

const getTopLocations = (data: AnalyticsEntry[]) => {
  const locationCounts = data.reduce((acc, entry) => {
    const location = entry.country || 'Unknown'
    acc[location] = (acc[location] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return Object.entries(locationCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([location, count]) => ({ location, count }))
}

const getVisitsByDay = (data: AnalyticsEntry[]) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()
  
  const visitsByDay = last7Days.map(day => {
    const count = data.filter(entry => entry.timestamp.startsWith(day)).length
    return { date: day, count }
  })
  
  return visitsByDay
}

// CSV generation function
const generateCSV = (data: AnalyticsEntry[]): string => {
  // CSV headers
  const headers = [
    'Timestamp',
    'Event',
    'Page Name', 
    'Pathname',
    'Referrer',
    'Location',
    'IP',
    'User Agent',
    'Screen Resolution',
    'Language',
    'Timezone',
    'Session ID',
    'Device Type'
  ]
  
  // Convert data to CSV rows
  const rows = data.map(entry => {
    const deviceType = entry.userAgent.toLowerCase().includes('mobile') ? 'Mobile' :
                      entry.userAgent.toLowerCase().includes('tablet') ? 'Tablet' : 'Desktop'
    
    return [
      new Date(entry.timestamp).toISOString(),
      entry.event || 'unknown',
      entry.pageName || '',
      entry.pathname || '/',
      entry.referrer === 'direct' ? 'Direct' : entry.referrer || '',
      entry.country || 'Unknown',
      entry.ip || 'unknown',
      entry.userAgent || '',
      entry.screenResolution || '',
      entry.language || '',
      entry.timezone || '',
      entry.sessionId || '',
      deviceType
    ].map(field => {
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      const escaped = String(field).replace(/"/g, '""')
      return escaped.includes(',') || escaped.includes('"') || escaped.includes('\n') 
        ? `"${escaped}"` 
        : escaped
    })
  })
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
  
  return csvContent
}
