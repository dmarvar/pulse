# Database Setup and API Documentation

## Overview

This document outlines the database schema design and API endpoints for the PulseOS application management system. The system uses **MongoDB** (designed for Azure Cosmos DB with MongoDB API) as the database and allows you to manage applications, their use cases, owners, scores, and activities.

## Database Schema

### Core Models

#### Application
- **id**: Unique identifier
- **name**: Application name (unique)
- **businessUnit**: Business unit (BU) the application belongs to
- **description**: Optional description
- **ownerName**: Owner's name (optional)
- **ownerEmail**: Owner's email (optional)
- **integrationOwnerName**: Integration owner's name (optional)
- **createdAt/updatedAt**: Timestamps

#### UseCase
- **id**: Unique identifier
- **name**: Use case name
- **description**: Optional description
- **applicationId**: Foreign key to Application

#### ApplicationScore
- **id**: Unique identifier
- **applicationId**: Foreign key to Application (one-to-one)
- **implementationLevel**: Basic, Intermediate, Advanced
- **classification**: Application classification
- **apiAvailability**: API availability status
- **teamInvolvement**: Team involvement level
- **readinessStatus**: Very ready, Medium readiness, Low readiness
- **technicalScore**: Technical score (float)
- **businessScore**: Business score (float)
- **resourceScore**: Resource score (float)
- **totalScore**: Total score (float)
- **grade**: Grade 1, Grade 2, Grade 3

#### Activity
- **id**: Unique identifier
- **applicationId**: Foreign key to Application
- **title**: Activity title
- **description**: Optional description
- **type**: Activity type (CREATED, UPDATED, SCORED, REVIEWED, IMPORTED, etc.)
- **status**: ACTIVE, COMPLETED, CANCELLED
- **createdBy**: Optional user identifier
- **createdAt/updatedAt**: Timestamps

### Junction Tables

None - All relationships are stored as direct fields on the Application entity.

## API Endpoints

### Applications

#### GET /api/applications
- **Description**: List all applications
- **Response**: Array of applications with related data
- **Includes**: useCases, score, recent activities

#### POST /api/applications
- **Description**: Create a new application
- **Body**:
```json
{
  "name": "string (required)",
  "businessUnit": "string (required)",
  "description": "string (optional)",
  "ownerName": "string (optional)",
  "ownerEmail": "string (optional)",
  "integrationOwnerName": "string (optional)",
  "useCases": [
    { "name": "string", "description": "string" }
  ],
  "score": {
    "implementationLevel": "Basic|Intermediate|Advanced",
    "classification": "string",
    "apiAvailability": "string",
    "teamInvolvement": "string",
    "readinessStatus": "Very ready|Medium readiness|Low readiness",
    "technicalScore": 1.0,
    "businessScore": 2.0,
    "resourceScore": 3.0,
    "totalScore": 6.0,
    "grade": "Grade 1|Grade 2|Grade 3"
  }
}
```

#### GET /api/applications/[id]
- **Description**: Get a specific application
- **Response**: Single application with all related data

#### PUT /api/applications/[id]
- **Description**: Update a specific application
- **Body**: Same as POST (all fields optional)

#### DELETE /api/applications/[id]
- **Description**: Delete a specific application
- **Response**: Success message

### Activities

#### GET /api/activities
- **Description**: List activities with optional filtering
- **Query Parameters**:
  - `applicationId`: Filter by application
  - `type`: Filter by activity type
  - `status`: Filter by status
  - `limit`: Number of results (default: 50)
  - `offset`: Pagination offset (default: 0)

#### POST /api/activities
- **Description**: Create a new activity
- **Body**:
```json
{
  "applicationId": "string (required)",
  "title": "string (required)",
  "description": "string (optional)",
  "type": "string (required)",
  "status": "ACTIVE|COMPLETED|CANCELLED (default: ACTIVE)",
  "createdBy": "string (optional)"
}
```

#### GET /api/activities/[id]
- **Description**: Get a specific activity

#### PUT /api/activities/[id]
- **Description**: Update a specific activity
- **Body**:
```json
{
  "title": "string",
  "description": "string",
  "type": "string",
  "status": "ACTIVE|COMPLETED|CANCELLED"
}
```

#### DELETE /api/activities/[id]
- **Description**: Delete a specific activity

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup MongoDB Database

#### Option A: Local MongoDB Installation

1. Install MongoDB on your system:
   - **macOS**: `brew install mongodb-community`
   - **Ubuntu/Debian**: Follow [MongoDB Ubuntu installation guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
   - **Windows**: Download from [mongodb.com](https://www.mongodb.com/try/download/community)

2. Start MongoDB:
```bash
# Start MongoDB service
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

#### Option B: Docker MongoDB

```bash
# Run MongoDB in Docker
docker run --name pulseos-mongo \
  -e MONGO_INITDB_DATABASE=pulseos \
  -p 27017:27017 \
  -d mongo:6.0
```

#### Option C: Azure Cosmos DB (Recommended for Production)

1. Create a Cosmos DB account with MongoDB API in Azure Portal
2. Get the connection string from the Azure Portal
3. Use the connection string in your environment variables

#### Option D: MongoDB Atlas (Cloud)

Use MongoDB Atlas for a fully managed cloud solution:
- **MongoDB Atlas** (Free tier available)
- Easy setup and management
- Global clusters available

### 3. Configure Database Connection

Create a `.env` file in your project root:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/pulseos"

# Optional: Set to production in production environment
NODE_ENV="development"
```

**Replace with your actual database credentials:**
- `localhost:27017`: Your MongoDB host and port
- `pulseos`: Your database name

### 4. Setup Database Schema

```bash
# Push schema to database (creates tables)
npm run db:push

# Generate Prisma client
npm run db:generate
```

### 5. Seed Database with Existing Data

```bash
# Import data from pulseos.json
npm run db:seed
```

### 6. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:8990/api/`

### 7. View Database (Optional)

```bash
# Open Prisma Studio to view/edit data
npm run db:studio
```

## Database Commands

- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate Prisma client
- `npm run db:seed` - Seed database with JSON data
- `npm run db:reset` - Reset database and re-seed
- `npm run db:studio` - Open Prisma Studio

## Example Usage

### Creating an Application

```bash
curl -X POST http://localhost:8990/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New App",
    "businessUnit": "Engineering",
    "description": "A new application for testing",
    "ownerName": "John Doe",
    "ownerEmail": "john@example.com",
    "integrationOwnerName": "John Doe",
    "useCases": [
      {"name": "User Authentication", "description": "Handle user login"}
    ],
    "score": {
      "implementationLevel": "Intermediate",
      "readinessStatus": "Very ready",
      "totalScore": 8.5,
      "grade": "Grade 1"
    }
  }'
```

### Getting All Applications

```bash
curl http://localhost:8990/api/applications
```

### Creating an Activity

```bash
curl -X POST http://localhost:8990/api/activities \
  -H "Content-Type: application/json" \
  -d '{
    "applicationId": "app_id_here",
    "title": "Review Completed",
    "description": "Application review has been completed",
    "type": "REVIEWED",
    "status": "COMPLETED"
  }'
```

## Data Migration

The existing `pulseos.json` data is automatically imported when running `npm run db:seed`. The mapping is:

- `Applicacion` → `Application.name`
- `BU` → `Application.businessUnit`
- `Name of Client (Solution)` → `UseCase.name` (multiple)
- `Owner` → `Application.ownerEmail` (first email) and `Application.ownerName` (derived from email)
- `Intergration Owner` → `Application.integrationOwnerName` (first name)
- `Agent Implementation Level` → `ApplicationScore.implementationLevel`
- `Unnamed: 13` → `ApplicationScore.readinessStatus`
- `Unnamed: 11` → `ApplicationScore.totalScore`
- `Unnamed: 12` → `ApplicationScore.grade`
- Additional unnamed fields → Various score fields

## Schema Flexibility

The schema is designed to be flexible and extensible:

1. **Simple owner storage** with optional name and email fields
2. **Simple integration owner storage** with optional name field
3. **Separate scoring system** with detailed metrics
4. **Activity tracking** for audit trails
5. **Extensible activity types** for different business processes
6. **Direct field storage** for easy modification and queries

This design allows for easy expansion as requirements grow and provides a solid foundation for the application management system.

## MongoDB-Specific Notes

### Connection String Format

The MongoDB connection string follows this format:
```
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```

### Common Connection Examples

**Local Development:**
```env
DATABASE_URL="mongodb://localhost:27017/pulseos"
```

**Local with Authentication:**
```env
DATABASE_URL="mongodb://username:password@localhost:27017/pulseos"
```

**Azure Cosmos DB:**
```env
DATABASE_URL="mongodb://your-cosmosdb-account:your-primary-key@your-cosmosdb-account.mongo.cosmos.azure.com:10255/pulseos?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@your-cosmosdb-account@"
```

**MongoDB Atlas:**
```env
DATABASE_URL="mongodb+srv://username:password@cluster0.abcde.mongodb.net/pulseos?retryWrites=true&w=majority"
```

**Docker Container:**
```env
DATABASE_URL="mongodb://localhost:27017/pulseos"
```

### Troubleshooting

**Connection Issues:**
- Ensure MongoDB is running: `brew services start mongodb-community` (macOS)
- Check if the port is available: `lsof -i :27017`
- Verify MongoDB is accessible: `mongosh mongodb://localhost:27017`

**Authentication Issues:**
- Ensure username/password are correct
- Check database permissions
- For Atlas, ensure IP whitelist includes your IP

**SSL Issues (Cloud Providers):**
Most cloud providers require SSL. Ensure your connection string includes SSL options:
```env
DATABASE_URL="mongodb://username:password@host:27017/database?ssl=true"
```

### Performance Considerations

For production environments:
- Use connection pooling (Prisma handles this automatically)
- Consider read replicas for read-heavy workloads
- Monitor query performance with MongoDB profiler
- Use proper indexing strategies

### Backup and Recovery

**Create Backup:**
```bash
mongodump --uri="mongodb://localhost:27017/pulseos" --out=./backup
```

**Restore Backup:**
```bash
mongorestore --uri="mongodb://localhost:27017/pulseos" ./backup/pulseos
```

### Cosmos DB Specific Features

When using Azure Cosmos DB:
- **Global Distribution**: Automatic multi-region replication
- **Auto-scaling**: Automatic scaling based on demand
- **SLA**: 99.999% availability SLA
- **Multiple APIs**: MongoDB API compatibility layer 