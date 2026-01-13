'use client'

import { useEffect } from 'react'

interface AnalyticsData {
  timestamp: string
  userAgent: string
  referrer: string
  pathname: string
  screenResolution: string
  language: string
  timezone: string
  sessionId: string
}

class Analytics {
  private static instance: Analytics
  private sessionId: string
  private apiEndpoint: string

  private constructor() {
    this.sessionId = this.generateSessionId()
    this.apiEndpoint = '/api/analytics'
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  private getAnalyticsData(): AnalyticsData {
    return {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      pathname: window.location.pathname,
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      sessionId: this.sessionId
    }
  }

  public trackPageView(pageName?: string) {
    try {
      const data = {
        ...this.getAnalyticsData(),
        event: 'page_view',
        pageName: pageName || document.title
      }

      // Store locally for fallback
      this.storeLocally(data)

      // Send to server (if available)
      fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).catch(_error => {
        console.log('Analytics endpoint not available, storing locally only')
      })

    } catch (_error) {
      console.log('Analytics tracking error:', _error)
    }
  }

  public trackEvent(eventName: string, eventData?: Record<string, unknown>) {
    try {
      const data = {
        ...this.getAnalyticsData(),
        event: eventName,
        eventData: eventData || {}
      }

      this.storeLocally(data)

      fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).catch(() => {
        // Silently fail if endpoint not available
      })

    } catch (error) {
      console.log('Event tracking error:', error)
    }
  }

  private storeLocally(data: Record<string, unknown>) {
    try {
      const existingData = localStorage.getItem('website_analytics') || '[]'
      const analytics = JSON.parse(existingData)
      analytics.push(data)
      
      // Keep only last 100 entries to prevent storage bloat
      const recentAnalytics = analytics.slice(-100)
      localStorage.setItem('website_analytics', JSON.stringify(recentAnalytics))
    } catch {
      // Storage not available or quota exceeded
    }
  }

  public getStoredAnalytics() {
    try {
      const data = localStorage.getItem('website_analytics')
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  public clearStoredAnalytics() {
    try {
      localStorage.removeItem('website_analytics')
    } catch {
      // Storage not available
    }
  }
}

export const useAnalytics = () => {
  useEffect(() => {
    const analytics = Analytics.getInstance()
    analytics.trackPageView()
  }, [])

  return {
    trackEvent: (eventName: string, eventData?: Record<string, unknown>) => {
      Analytics.getInstance().trackEvent(eventName, eventData)
    },
    getAnalytics: () => Analytics.getInstance().getStoredAnalytics(),
    clearAnalytics: () => Analytics.getInstance().clearStoredAnalytics()
  }
}

export default Analytics
