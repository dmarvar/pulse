# Docker Setup for Pulse Application

This document explains how to containerize and run the Pulse application using Docker with Azure Cosmos DB.

## Prerequisites

- Docker installed on your system
- Docker Compose installed
- Azure Cosmos DB with MongoDB API configured
- Environment variables set up

## Quick Start

### 1. Production Deployment

To run the application in production mode:

```bash
# Build and start the application
docker-compose up -d app

# View logs
docker-compose logs -f app

# Stop the service
docker-compose down
```

The application will be available at `http://localhost:3000`

### 2. Development Mode

To run the application in development mode with hot reloading:

```bash
# Start the development service
docker-compose up -d app-dev

# View logs
docker-compose logs -f app-dev

# Stop services
docker-compose down
```

The development server will be available at `http://localhost:8990`

## Individual Docker Commands

### Build the Production Image

```bash
docker build -t pulse-app .
```

### Run the Production Container

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="your-cosmos-db-connection-string" \
  -e NEXTAUTH_SECRET="your-secret-key" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  pulse-app
```

### Build and Run Development Container

```bash
docker build -f Dockerfile.dev -t pulse-app-dev .
docker run -p 8990:8990 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -e DATABASE_URL="your-cosmos-db-connection-string" \
  -e NEXTAUTH_SECRET="your-secret-key" \
  -e NEXTAUTH_URL="http://localhost:8990" \
  pulse-app-dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Azure Cosmos DB with MongoDB API
DATABASE_URL=mongodb://your-cosmos-account:your-key@your-cosmos-account.mongo.cosmos.azure.com:10255/pulse?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@your-cosmos-account@

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Node Environment
NODE_ENV=production
```

## Database Setup

Your application connects to Azure Cosmos DB with MongoDB API. Ensure your Cosmos DB instance is properly configured with:

- MongoDB API enabled
- Proper connection string with authentication
- Required collections (applications, use_cases, application_scores, activities)

### Database Operations

```bash
# Run Prisma migrations
docker exec -it pulse-app npx prisma db push

# Seed the database
docker exec -it pulse-app npm run db:seed

# Generate Prisma client
docker exec -it pulse-app npx prisma generate
```

## Docker Compose Services

### Production Services

- **app**: Next.js production server (port 3000)

### Development Services

- **app-dev**: Next.js development server with hot reloading (port 8990)

## Volumes

- `./prisma`: Prisma schema and migrations (read-only, development only)

## Networks

All services run on the `pulse-network` bridge network for secure communication.

## Troubleshooting

### Common Issues

1. **Port already in use**: Change ports in `docker-compose.yml`
2. **Database connection failed**: Ensure Cosmos DB connection string is correct and accessible
3. **Build fails**: Check Node.js version compatibility (>=18.17.0)
4. **Prisma connection issues**: Verify Cosmos DB MongoDB API compatibility

### Useful Commands

```bash
# View all containers
docker ps

# View container logs
docker logs pulse-app

# Access container shell
docker exec -it pulse-app sh

# Clean up unused resources
docker system prune -a

# Reset everything
docker-compose down -v
docker-compose up --build
```

## Production Deployment

For production deployment, consider:

1. **Environment Variables**: Use proper secrets management
2. **SSL/TLS**: Set up reverse proxy with HTTPS
3. **Monitoring**: Add health checks and logging
4. **Backup**: Configure MongoDB backups
5. **Scaling**: Use Docker Swarm or Kubernetes

### Example Production docker-compose.yml

```yaml
version: '3.8'
services:
  app:
    build: .
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    restart: always
    ports:
      - "3000:3000"
```

## Security Considerations

- Use strong NEXTAUTH_SECRET
- Secure your Cosmos DB connection string
- Enable Cosmos DB firewall rules and private endpoints
- Run containers as non-root users
- Keep base images updated
- Scan images for vulnerabilities
- Use Azure Key Vault for secrets management

## Performance Optimization

- Use multi-stage builds (already implemented)
- Enable Docker layer caching
- Use .dockerignore to exclude unnecessary files
- Consider using Alpine Linux base images
- Optimize Next.js build output 