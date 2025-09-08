# Portainer Stack Configuration for Altus Rossouw Website (Private Repository)

## Option 1: Build Locally and Push to Registry (Recommended)

### Step 1: Build and Tag the Image Locally
```bash
# Build the image locally
docker build -t altus-website:latest .

# Tag for your registry (replace with your details)
docker tag altus-website:latest your-dockerhub-username/altus-website:latest

# Push to Docker Hub (or your preferred registry)
docker push your-dockerhub-username/altus-website:latest
```

### Step 2: Portainer Stack Configuration
```yaml
version: '3.8'

services:
  altus-website:
    image: your-dockerhub-username/altus-website:latest
    container_name: altus-rossouw-website
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    restart: unless-stopped
    labels:
      - "com.centurylinklabs.watchtower.enable=true"
```

## Option 2: Local Build and Import to Portainer

### Step 1: Build and Save Image
```bash
# Build the image
docker build -t altus-website:latest .

# Save image to tar file
docker save -o altus-website.tar altus-website:latest
```

### Step 2: Import in Portainer
1. Go to **Images** in Portainer
2. Click **Import**
3. Upload the `altus-website.tar` file
4. Use this stack configuration:

```yaml
version: '3.8'

services:
  altus-website:
    image: altus-website:latest
    container_name: altus-rossouw-website
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## Option 3: SSH Key Access (Advanced)

If you want to build directly from private GitHub:

### Step 1: Add SSH Key to Portainer Host
```bash
# Generate SSH key on Portainer host
ssh-keygen -t rsa -b 4096 -C "portainer@yourserver.com"

# Add public key to GitHub repository deploy keys
cat ~/.ssh/id_rsa.pub
```

### Step 2: Modified Dockerfile for SSH
Create a `Dockerfile.private`:

```dockerfile
FROM node:18-alpine AS base

# Install git and openssh
RUN apk add --no-cache git openssh-client

# Build stage
FROM base AS builder
WORKDIR /app

# Setup SSH for private repo
RUN mkdir -p ~/.ssh && \
    ssh-keyscan github.com >> ~/.ssh/known_hosts

# Clone private repository
ARG SSH_PRIVATE_KEY
RUN echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa && \
    chmod 600 ~/.ssh/id_rsa && \
    git clone git@github.com:AltusRossouw/Altus-Website.git . && \
    rm ~/.ssh/id_rsa

# Install dependencies and build
RUN npm ci --only=production && npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

## Recommended Approach: Docker Hub Registry

### Complete Setup Steps:

1. **Create Docker Hub Account** (if you don't have one)
   - Go to https://hub.docker.com
   - Create account: `altusrossouw` or similar

2. **Build and Push Locally:**
```bash
# Login to Docker Hub
docker login

# Build your image
docker build -t altusrossouw/altus-website:latest .

# Push to registry
docker push altusrossouw/altus-website:latest
```

3. **Portainer Stack:**
```yaml
version: '3.8'

services:
  altus-website:
    image: altusrossouw/altus-website:latest
    container_name: altus-rossouw-website
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    labels:
      - "com.centurylinklabs.watchtower.enable=true"
```

4. **Auto-Updates with Watchtower:**
Add this to your stack for automatic updates:
```yaml
  watchtower:
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --interval 300 altus-rossouw-website
    restart: unless-stopped
```

## Updating Your Website

### Method 1: Push New Version
```bash
# Make changes to your code
# Build new version
docker build -t altusrossouw/altus-website:latest .

# Push update
docker push altusrossouw/altus-website:latest

# Watchtower will auto-update (or manually restart in Portainer)
```

### Method 2: Manual Update in Portainer
1. Go to **Images** in Portainer
2. Pull new image: `altusrossouw/altus-website:latest`
3. Restart your container

This approach gives you full control over your private repository while still enabling easy deployment in Portainer!
