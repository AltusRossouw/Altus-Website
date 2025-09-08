# Altus Rossouw Website - Docker Deployment Guide

This guide will help you deploy your website using Docker and Portainer.

## 🐳 Docker Setup

### Prerequisites
- Docker installed on your server
- Portainer running
- Access to your server via SSH or Portainer interface

## 🚀 Deployment Options

### Option 1: Deploy via Portainer Stacks (Recommended)

1. **Login to Portainer**
2. **Navigate to Stacks**
3. **Create New Stack**
4. **Copy and paste this docker-compose.yml:**

```yaml
version: '3.8'

services:
  altus-website:
    build: 
      context: .
      dockerfile: Dockerfile
    container_name: altus-rossouw-website
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - web

networks:
  web:
    external: false
```

5. **Deploy the Stack**

### Option 2: Build and Deploy Manually

1. **Clone your repository on the server:**
```bash
git clone https://github.com/AltusRossouw/Altus-Website.git
cd Altus-Website
```

2. **Build the Docker image:**
```bash
docker build -t altus-website .
```

3. **Run the container:**
```bash
docker run -d \
  --name altus-rossouw-website \
  -p 3000:3000 \
  --restart unless-stopped \
  altus-website
```

### Option 3: Using Docker Compose

1. **Clone the repository:**
```bash
git clone https://github.com/AltusRossouw/Altus-Website.git
cd Altus-Website
```

2. **Run with Docker Compose:**
```bash
docker-compose up -d
```

## 🌐 Accessing Your Website

After deployment, your website will be available at:
- **Local**: http://localhost:3000
- **Server**: http://your-server-ip:3000
- **Domain**: Configure reverse proxy to point altusrossouw.co.za to port 3000

## 🔧 Configuration

### Environment Variables
You can customize the deployment by setting these environment variables:

```yaml
environment:
  - NODE_ENV=production
  - PORT=3000
  - HOSTNAME=0.0.0.0
```

### Port Mapping
To use a different port, change the port mapping:
```yaml
ports:
  - "8080:3000"  # Access via port 8080
```

## 🔄 Updating Your Website

### Method 1: Rebuild in Portainer
1. Go to your stack in Portainer
2. Click "Editor"
3. Click "Update the stack"
4. Enable "Re-pull image and redeploy"

### Method 2: Manual Update
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## 🌍 Production Setup with Reverse Proxy

For production deployment with your domain (altusrossouw.co.za):

### Using Traefik (Recommended for Portainer)
```yaml
version: '3.8'

services:
  altus-website:
    build: .
    container_name: altus-rossouw-website
    networks:
      - web
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.altus-website.rule=Host(\`altusrossouw.co.za\`)"
      - "traefik.http.routers.altus-website.entrypoints=websecure"
      - "traefik.http.routers.altus-website.tls.certresolver=letsencrypt"
      - "traefik.http.services.altus-website.loadbalancer.server.port=3000"
    restart: unless-stopped

networks:
  web:
    external: true
```

### Using Nginx Proxy Manager
1. Create a new proxy host in Nginx Proxy Manager
2. **Domain**: altusrossouw.co.za
3. **Forward Hostname/IP**: container name or IP
4. **Forward Port**: 3000
5. Enable SSL with Let's Encrypt

## 📊 Container Management

### Useful Docker Commands
```bash
# View running containers
docker ps

# View logs
docker logs altus-rossouw-website

# Restart container
docker restart altus-rossouw-website

# Stop container
docker stop altus-rossouw-website

# Remove container
docker rm altus-rossouw-website

# Remove image
docker rmi altus-website
```

## 🛠 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port mapping: `"3001:3000"`

2. **Build fails**
   - Check Docker logs: `docker logs container-name`
   - Ensure all dependencies are in package.json

3. **Website not accessible**
   - Check if container is running: `docker ps`
   - Verify port mapping
   - Check firewall settings

### Performance Optimization

- The Docker image is optimized with multi-stage builds
- Uses Node.js Alpine for smaller image size
- Includes only production dependencies
- Enables Next.js standalone output for better performance

## 🔐 Security Considerations

- Container runs as non-root user
- Only necessary ports are exposed
- Environment variables for sensitive data
- Regular updates recommended

---

Your website is now containerized and ready for deployment! 🚀
