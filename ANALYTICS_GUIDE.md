# Website Analytics System

## Overview

Your website now includes a comprehensive analytics system that tracks visitor behavior, page views, and user interactions. The system is privacy-friendly and stores data locally.

## Features

### 📊 **Analytics Dashboard**
- **Total Visits**: Track all website visits
- **Unique Visitors**: Count unique visitors by session
- **Page Views**: Monitor which pages are most popular
- **Referrer Tracking**: See where visitors are coming from
- **Device Analytics**: Mobile vs Desktop vs Tablet usage
- **Time-based Analytics**: Visits over the last 7 days
- **Real-time Activity**: Recent visitor information

### 🔒 **Privacy-Friendly**
- No third-party tracking services
- Data stored locally on your server
- No cookies used for tracking
- Respects user privacy

### 📈 **Event Tracking**
- Button clicks (View Projects, Contact buttons)
- External link clicks (GitHub, LinkedIn, Instagram)
- Project views
- Contact method usage
- Custom events for specific interactions

## Accessing Analytics

### 1. **Analytics Dashboard**
Visit: `https://yourdomain.com/analytics`

### 2. **Authentication**
- Default token: `your-secret-token`
- Change in `.env` file: `ANALYTICS_TOKEN=your-new-token`

### 3. **API Access**
```bash
# Get analytics data
curl -H "Authorization: Bearer your-token" https://yourdomain.com/api/analytics
```

## Setup Instructions

### 1. **Environment Configuration**
Create `.env.local` file:
```bash
ANALYTICS_TOKEN=your-secret-analytics-token-here
```

### 2. **Data Storage**
- Analytics data is stored in `/data/analytics.json`
- File is created automatically when first visitor arrives
- Keeps last 1000 entries to prevent unlimited growth

### 3. **Docker Deployment**
The analytics system works automatically in Docker:
```yaml
environment:
  - ANALYTICS_TOKEN=your-secret-token
volumes:
  - ./data:/app/data  # Persist analytics data
```

## Analytics Data Structure

### Tracked Information
- **Timestamp**: When the visit occurred
- **User Agent**: Browser and device information
- **Referrer**: Where the visitor came from
- **Page Path**: Which page was visited
- **Screen Resolution**: Display size
- **Language**: Browser language
- **Timezone**: User's timezone
- **Session ID**: Unique session identifier
- **Event Type**: page_view, button_click, etc.
- **IP Address**: Visitor IP (basic location)

### Sample Analytics Entry
```json
{
  "timestamp": "2025-01-15T10:30:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://google.com",
  "pathname": "/",
  "screenResolution": "1920x1080",
  "language": "en-US",
  "timezone": "America/New_York",
  "sessionId": "abc123xyz",
  "event": "page_view",
  "ip": "192.168.1.100",
  "country": "Unknown"
}
```

## Dashboard Metrics

### 📊 **Overview Cards**
- **Total Visits**: All recorded visits
- **Unique Visitors**: Distinct sessions
- **Page Views**: Total page loads
- **Average per Visitor**: Visits per unique user

### 📈 **Detailed Analytics**
- **Top Pages**: Most visited pages
- **Top Referrers**: Traffic sources
- **Device Breakdown**: Mobile/Desktop/Tablet usage
- **Daily Trends**: 7-day visit history
- **Recent Activity**: Latest 20 visits with details

## Event Tracking

### Automatically Tracked Events
- `page_view`: Every page load
- `button_click`: CTA and navigation buttons
- `external_link_click`: Links to external sites
- `project_click`: Project portfolio interactions
- `contact_click`: Contact method selection
- `cta_click`: Call-to-action button clicks

### Custom Event Tracking
You can add custom events in your code:
```typescript
import { useAnalytics } from '../lib/analytics'

const { trackEvent } = useAnalytics()

// Track custom events
trackEvent('custom_event', { 
  action: 'download', 
  file: 'resume.pdf',
  location: 'about_section' 
})
```

## Security Considerations

### 🔐 **Access Control**
- Dashboard protected by authentication token
- API endpoints require Bearer token
- No sensitive user data stored
- Data automatically purged (keeps last 1000 entries)

### 🛡️ **Privacy Compliance**
- No personal identification
- No cross-site tracking
- No third-party data sharing
- Session-based identification only

## Backup and Maintenance

### Data Backup
```bash
# Backup analytics data
cp /app/data/analytics.json /backup/analytics-$(date +%Y%m%d).json
```

### Data Cleanup
```bash
# Clear all analytics (if needed)
rm /app/data/analytics.json
```

### Log Rotation
The system automatically:
- Keeps last 1000 entries
- Removes older entries automatically
- Prevents unlimited file growth

## Integration with External Services

### Google Analytics (Optional)
Add to your environment:
```bash
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXXX
```

### Mixpanel (Optional)
```bash
MIXPANEL_TOKEN=your-mixpanel-token
```

## Troubleshooting

### Common Issues

1. **Dashboard Not Loading**
   - Check authentication token
   - Verify `/data` directory permissions
   - Check server logs

2. **No Analytics Data**
   - Confirm tracking is enabled
   - Check browser console for errors
   - Verify API endpoint is accessible

3. **High Storage Usage**
   - Data automatically limited to 1000 entries
   - Old entries are purged automatically
   - Manual cleanup: delete `analytics.json`

## Performance Impact

- **Minimal**: ~1KB per visitor
- **Non-blocking**: Analytics run asynchronously
- **Efficient**: Local storage, no external calls
- **Optimized**: Automatic data rotation

Your analytics system is now ready to provide valuable insights into your website's performance! 🚀
