# 🚀 Portainer Deployment - GitHub Build

## ✅ DEPLOYMENT READY - Latest Update

**Status:** Analytics dashboard authentication issue **RESOLVED** ✅
- Fixed initial loading state bug that caused "Authenticating..." to stick
- Added proper error handling with 10-second timeout protection  
- Improved UX with reset button and logout functionality
- Successfully tested in Docker container locally
- All systems ready for production deployment

Your website is now ready to deploy in Portainer directly from your public GitHub repository!

## 📋 Quick Deploy Instructions

### Step 1: Access Portainer
1. Login to your Portainer instance
2. Navigate to **Stacks**
3. Click **Add Stack**

### Step 2: Stack Configuration
- **Name**: `altus-rossouw-website`
- **Build method**: `Docker Compose`
- **Source**: `Repository` or `Upload`

### Step 3: Docker Compose Configuration

Copy and paste this configuration:

```yaml
version: '3.8'

services:
  altus-website:
    build: 
      context: https://github.com/AltusRossouw/Altus-Website.git
      dockerfile: Dockerfile
    container_name: altus-rossouw-website
    ports:
      - "3123:3000"
    environment:
      - NODE_ENV=production
      - ANALYTICS_TOKEN=altus-analytics-secret-2025
      - NEXT_TELEMETRY_DISABLED=1
      - PORT=3000
      - HOSTNAME=0.0.0.0
    volumes:
      - altus_analytics_data:/app/data
    restart: unless-stopped
    labels:
      - "com.centurylinklabs.watchtower.enable=true"
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  altus_analytics_data:
    driver: local
```

### Step 4: Deploy
1. Click **Deploy the stack**
2. Wait for the build process to complete (may take 5-10 minutes)
3. Monitor the build logs in Portainer

## 🌐 Access Your Website

After successful deployment:

### Main Website
- **URL**: `http://your-server-ip:3123`
- **Features**: Full IoT/Electronics themed portfolio
- **Responsive**: Mobile-friendly design
- **Interactive**: Animations and effects

### Analytics Dashboard
- **URL**: `http://your-server-ip:3123/analytics`
- **Token**: `altus-analytics-secret-2025`
- **Features**: Visitor tracking, device analytics, page views

## 🔧 Configuration Details

### Port Configuration
- **External Port**: `3123` (customizable)
- **Internal Port**: `3000` (container port)
- **Access**: `http://your-server:3123`

### Environment Variables
```yaml
NODE_ENV: production          # Production mode
ANALYTICS_TOKEN: altus-analytics-secret-2025  # Dashboard access
NEXT_TELEMETRY_DISABLED: 1   # Disable Next.js telemetry
PORT: 3000                   # Internal port
HOSTNAME: 0.0.0.0           # Bind to all interfaces
```

### Data Persistence
- **Volume**: `altus_analytics_data`
- **Mount Point**: `/app/data`
- **Purpose**: Stores analytics data
- **Persistence**: Survives container restarts

### Health Monitoring
- **Health Check**: Built-in container health monitoring
- **Endpoint**: `http://localhost:3000/`
- **Interval**: Every 30 seconds
- **Auto-restart**: If unhealthy

## 🔄 Updates and Maintenance

### Auto-Updates (Optional)
If you have Watchtower running:
```yaml
services:
  watchtower:
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - WATCHTOWER_LABEL_ENABLE=true
    restart: unless-stopped
```

### Manual Updates
1. Go to your stack in Portainer
2. Click **Editor**
3. Click **Update the stack**
4. Enable **Re-build image** option
5. Deploy

### Backup Analytics Data
```bash
# Create backup
docker run --rm -v altus_analytics_data:/data -v $(pwd):/backup alpine tar czf /backup/analytics-$(date +%Y%m%d).tar.gz /data
```

## 🛠 Troubleshooting

### Build Issues
- **Long build time**: First build takes 5-10 minutes
- **Build failure**: Check Portainer logs
- **Port conflicts**: Change external port from 3123 to another

### Runtime Issues
- **Site not accessible**: Check container is running
- **Analytics not working**: Verify volume is mounted
- **Performance**: Monitor container resources

### Common Solutions
```bash
# Check container status
docker ps | grep altus-rossouw-website

# View logs
docker logs altus-rossouw-website

# Restart container
docker restart altus-rossouw-website
```

## 🔒 Security Recommendations

### Change Analytics Token
Replace `altus-analytics-secret-2025` with your own secure token:
```yaml
environment:
  - ANALYTICS_TOKEN=your-secure-token-here
```

### Firewall Configuration
- Open port `3123` for web access
- Restrict analytics dashboard access if needed
- Use reverse proxy for production

## 🌍 Production Setup (Optional)

### With Domain Name
If you want to use `altusrossouw.co.za`:

```yaml
# Add to your existing stack
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.altus-website.rule=Host(\`altusrossouw.co.za\`)"
  - "traefik.http.routers.altus-website.entrypoints=websecure"
  - "traefik.http.routers.altus-website.tls.certresolver=letsencrypt"
  - "traefik.http.services.altus-website.loadbalancer.server.port=3000"
```

### SSL Certificate
- Use Nginx Proxy Manager or Traefik
- Point domain to your server IP
- Enable automatic SSL certificates

## 📊 What You Get

### Website Features
- ✅ **Professional Design**: Modern IoT/Electronics theme
- ✅ **Responsive Layout**: Works on all devices
- ✅ **Interactive Elements**: Smooth animations
- ✅ **SEO Optimized**: Meta tags and performance
- ✅ **Fast Loading**: Next.js optimization

### Analytics Features
- ✅ **Visitor Tracking**: Page views and unique visitors
- ✅ **Device Analytics**: Mobile/Desktop/Tablet breakdown
- ✅ **Traffic Sources**: Referrer tracking
- ✅ **Event Tracking**: Button clicks and interactions
- ✅ **Time Analytics**: Daily visit trends
- ✅ **Privacy Friendly**: No third-party tracking

### Technical Features
- ✅ **Docker Optimized**: Multi-stage build
- ✅ **Health Monitoring**: Built-in health checks
- ✅ **Data Persistence**: Analytics data survives restarts
- ✅ **Auto-restart**: Container restart policies
- ✅ **Logging**: Comprehensive logging system

---

## 🎉 Ready to Launch!

Your complete professional website with analytics is now ready to deploy in Portainer! 

**Just copy the docker-compose configuration above into Portainer and launch your stack.** 🚀

**Access URLs after deployment:**
- 🌐 **Main Site**: `http://your-server:3123`
- 📊 **Analytics**: `http://your-server:3123/analytics`
