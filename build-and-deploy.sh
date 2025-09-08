#!/bin/bash

# Altus Rossouw Website - Build and Deploy Script
# This script builds your Docker image and pushes it to Docker Hub

# Configuration
DOCKER_USERNAME="altusrossouw"
IMAGE_NAME="altus-website"
TAG="latest"

echo "🚀 Building Altus Rossouw Website Docker Image with Analytics..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t ${IMAGE_NAME}:${TAG} .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

echo "✅ Docker build successful!"

# Tag the image for Docker Hub
echo "🏷️  Tagging image for Docker Hub..."
docker tag ${IMAGE_NAME}:${TAG} ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}

# Check if user wants to push to registry
read -p "🔄 Do you want to push to Docker Hub? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Pushing to Docker Hub..."
    docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully pushed to Docker Hub!"
        echo "🌐 Your image is available at: ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}"
        echo ""
        echo "📋 Portainer Stack Configuration:"
        echo "================================"
        echo "version: '3.8'"
        echo ""
        echo "services:"
        echo "  altus-website:"
        echo "    image: ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}"
        echo "    container_name: altus-rossouw-website"
        echo "    ports:"
        echo "      - \"3000:3000\""
        echo "    environment:"
        echo "      - NODE_ENV=production"
        echo "      - ANALYTICS_TOKEN=altus-analytics-secret-2025"
        echo "      - NEXT_TELEMETRY_DISABLED=1"
        echo "    volumes:"
        echo "      - altus_analytics_data:/app/data"
        echo "    restart: unless-stopped"
        echo ""
        echo "volumes:"
        echo "  altus_analytics_data:"
        echo ""
        echo "🎯 Analytics Dashboard: http://your-server:3000/analytics"
        echo "🔑 Default Token: altus-analytics-secret-2025"
        echo ""
        echo "📖 See PORTAINER_DEPLOYMENT.md for complete setup guide"
    else
        echo "❌ Failed to push to Docker Hub!"
        echo "💡 Make sure you're logged in: docker login"
    fi
else
    echo "⏭️  Skipping Docker Hub push"
    echo "📦 Local image ready: ${IMAGE_NAME}:${TAG}"
    echo ""
    echo "💾 To save as tar file for manual import:"
    echo "docker save -o altus-website.tar ${IMAGE_NAME}:${TAG}"
fi

echo ""
echo "🎉 Build process complete!"
echo "� Features included:"
echo "   ✅ Modern IoT/Electronics themed website"
echo "   ✅ Comprehensive analytics system" 
echo "   ✅ Privacy-friendly visitor tracking"
echo "   ✅ Docker optimized for production"
echo "   ✅ Portainer ready configuration"
echo ""
echo "�📖 Next steps:"
echo "   1. Deploy in Portainer using PORTAINER_DEPLOYMENT.md"
echo "   2. Access your website at http://your-server:3000"
echo "   3. View analytics at http://your-server:3000/analytics"
