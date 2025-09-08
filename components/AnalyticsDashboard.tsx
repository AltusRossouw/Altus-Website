'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, Users, Monitor, Smartphone, Tablet, Globe, Calendar, TrendingUp } from 'lucide-react'

interface AnalyticsSummary {
  totalVisits: number
  uniqueVisitors: number
  pageViews: number
  topPages: { page: string; count: number }[]
  topReferrers: { referrer: string; count: number }[]
  topLocations: { location: string; count: number }[]
  deviceInfo: { device: string; count: number }[]
  visitsByDay: { date: string; count: number }[]
  recentVisits: any[]
}

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  const fetchAnalytics = async (authToken: string) => {
    try {
      setLoading(true)
      setError(null)

      // Add timeout to prevent infinite loading
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch('/api/analytics', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (response.status === 401) {
        setError('Invalid authentication token')
        setLoading(false)
        return
      }
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.status}`)
      }
      
      const data = await response.json()
      setAnalytics(data)
      setAuthenticated(true)
      setError(null)
      setLoading(false)
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again.')
      } else {
        setError(err instanceof Error ? err.message : 'Error fetching analytics')
      }
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!token.trim()) {
      setError('Please enter an access token')
      return
    }
    fetchAnalytics(token.trim())
  }

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile': return <Smartphone className="w-4 h-4" />
      case 'tablet': return <Tablet className="w-4 h-4" />
      default: return <Monitor className="w-4 h-4" />
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
        <motion.div
          className="bg-dark-card p-8 rounded-lg border border-dark-border max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-electric-blue mb-6 text-center">
            Analytics Dashboard
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Access Token</label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full p-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-electric-blue focus:outline-none"
                placeholder="Enter analytics token"
                required
              />
              {process.env.NODE_ENV === 'development' && (
                <p className="text-xs text-gray-500 mt-1">
                  Dev hint: Check .env.local for ANALYTICS_TOKEN or try "altus-analytics-2024"
                </p>
              )}
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading || !token.trim()}
              className="w-full bg-electric-blue text-dark-bg p-3 rounded-lg font-semibold hover:bg-electric-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
            {(loading || error) && (
              <button
                type="button"
                onClick={() => {
                  setLoading(false)
                  setError(null)
                  setToken('')
                }}
                className="w-full bg-gray-600 text-white p-2 rounded-lg text-sm hover:bg-gray-500 transition-colors"
              >
                Reset
              </button>
            )}
          </form>
        </motion.div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-electric-blue">Loading analytics...</div>
      </div>
    )
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-red-400">Error: {error || 'No data available'}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-electric-blue mb-2">
              Website Analytics Dashboard
            </h1>
            <p className="text-gray-400">Monitor your website's performance and visitor insights</p>
          </div>
          <button
            onClick={() => {
              setAuthenticated(false)
              setAnalytics(null)
              setToken('')
              setError(null)
              setLoading(false)
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Visits', value: analytics.totalVisits, icon: Eye, color: 'electric-blue' },
            { label: 'Unique Visitors', value: analytics.uniqueVisitors, icon: Users, color: 'neon-green' },
            { label: 'Page Views', value: analytics.pageViews, icon: TrendingUp, color: 'cyber-purple' },
            { label: 'Avg. per Visitor', value: Math.round(analytics.totalVisits / analytics.uniqueVisitors || 0), icon: Globe, color: 'circuit-orange' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-dark-card p-6 rounded-lg border border-dark-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                <span className={`text-2xl font-bold text-${stat.color}`}>
                  {stat.value.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Pages */}
          <motion.div
            className="bg-dark-card p-6 rounded-lg border border-dark-border"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-neon-green mb-4">Top Pages</h3>
            <div className="space-y-3">
              {analytics.topPages.map((page, index) => (
                <div key={page.page} className="flex justify-between items-center">
                  <span className="text-gray-300 truncate mr-4">{page.page || '/'}</span>
                  <span className="text-neon-green font-semibold">{page.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Referrers */}
          <motion.div
            className="bg-dark-card p-6 rounded-lg border border-dark-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-cyber-purple mb-4">Top Referrers</h3>
            <div className="space-y-3">
              {analytics.topReferrers.map((referrer, index) => (
                <div key={referrer.referrer} className="flex justify-between items-center">
                  <span className="text-gray-300 truncate mr-4">{referrer.referrer}</span>
                  <span className="text-cyber-purple font-semibold">{referrer.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Locations */}
          <motion.div
            className="bg-dark-card p-6 rounded-lg border border-dark-border"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-electric-blue mb-4">Top Locations</h3>
            <div className="space-y-3">
              {analytics.topLocations.map((location, index) => (
                <div key={location.location} className="flex justify-between items-center">
                  <span className="text-gray-300 truncate mr-4">
                    {location.location === 'Local/Development' ? '🏠 Local' : 
                     location.location === 'Unknown Location' ? '🌍 Unknown' : 
                     `🌍 ${location.location}`}
                  </span>
                  <span className="text-electric-blue font-semibold">{location.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Device Breakdown */}
          <motion.div
            className="bg-dark-card p-6 rounded-lg border border-dark-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-circuit-orange mb-4">Device Types</h3>
            <div className="space-y-4">
              {analytics.deviceInfo.map((device, index) => {
                const percentage = (device.count / analytics.totalVisits * 100).toFixed(1)
                return (
                  <div key={device.device} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getDeviceIcon(device.device)}
                      <span className="ml-3 text-gray-300">{device.device}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 bg-dark-bg rounded-full h-2 mr-3">
                        <div
                          className="bg-circuit-orange h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-circuit-orange font-semibold w-12 text-right">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Visits by Day */}
          <motion.div
            className="bg-dark-card p-6 rounded-lg border border-dark-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-electric-blue mb-4">Visits (Last 7 Days)</h3>
            <div className="space-y-3">
              {analytics.visitsByDay.map((day, index) => {
                const maxCount = Math.max(...analytics.visitsByDay.map(d => d.count))
                const percentage = maxCount > 0 ? (day.count / maxCount * 100) : 0
                return (
                  <div key={day.date} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm w-20">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-dark-bg rounded-full h-2">
                        <div
                          className="bg-electric-blue h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-electric-blue font-semibold w-8 text-right">
                      {day.count}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Recent Visits */}
        <motion.div
          className="bg-dark-card p-6 rounded-lg border border-dark-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Recent Visits</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left p-2 text-gray-400">Time</th>
                  <th className="text-left p-2 text-gray-400">Page</th>
                  <th className="text-left p-2 text-gray-400">Referrer</th>
                  <th className="text-left p-2 text-gray-400">Location</th>
                  <th className="text-left p-2 text-gray-400">Device</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentVisits.slice(0, 10).map((visit, index) => (
                  <tr key={index} className="border-b border-dark-border/50">
                    <td className="p-2 text-gray-300">
                      {new Date(visit.timestamp).toLocaleString()}
                    </td>
                    <td className="p-2 text-gray-300">{visit.pathname || '/'}</td>
                    <td className="p-2 text-gray-300">
                      {visit.referrer === 'direct' ? 'Direct' : new URL(visit.referrer || 'unknown://unknown').hostname}
                    </td>
                    <td className="p-2 text-gray-300">
                      {visit.country !== 'Unknown Location' && visit.country !== 'Local/Development' 
                        ? visit.country 
                        : visit.country === 'Local/Development'
                        ? 'Local'
                        : visit.timezone || 'Unknown'}
                    </td>
                    <td className="p-2 text-gray-300">
                      {visit.userAgent.includes('Mobile') ? 'Mobile' : 
                       visit.userAgent.includes('Tablet') ? 'Tablet' : 'Desktop'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
