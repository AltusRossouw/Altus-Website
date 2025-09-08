# CSV Export Test

Test the CSV export functionality:

1. Visit http://localhost:3000/analytics
2. Enter token: altus-analytics-2024
3. Click "Export CSV" button
4. Check downloaded file

## Sample CSV Output Structure:

```csv
Timestamp,Event,Page Name,Pathname,Referrer,Location,IP,User Agent,Screen Resolution,Language,Timezone,Session ID,Device Type
2025-09-08T15:32:00.854Z,page_view,Altus Rossouw - Embedded Systems Developer & IoT Specialist,/,Direct,Local/Development,::1,Mozilla/5.0...,2056x1329,en-US,Africa/Johannesburg,mfba5e50k7nde2yd1zp,Desktop
```

## API Endpoint:
- GET `/api/analytics?format=csv`
- Authentication: Bearer token required
- Response: CSV file download with proper headers

## Features:
- ✅ Proper CSV escaping for special characters
- ✅ Comprehensive data fields export
- ✅ Device type detection
- ✅ Automatic filename with date
- ✅ Download trigger via browser
