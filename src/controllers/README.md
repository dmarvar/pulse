# Controllers

This directory contains business logic controllers that can be used server-side without making HTTP requests to API endpoints.

## Structure

```
src/controllers/
├── manager/
│   ├── activities.controller.ts    # Activities CRUD operations
│   ├── applications.controller.ts  # Applications CRUD operations
│   └── index.ts                   # Manager exports
├── index.ts                       # Main exports
└── README.md                      # This file
```

## Usage

### Import Controllers

```typescript
import { 
  ActivitiesController, 
  ApplicationsController,
  type ActivityFilters,
  type CreateActivityData,
  type CreateApplicationData 
} from '@/controllers'
```

### Activities Controller

#### Get Activities with Filtering
```typescript
const activities = await ActivitiesController.getActivities({
  applicationId: 'app-123',
  type: 'CREATED',
  status: 'ACTIVE',
  limit: 10,
  offset: 0
})
```

#### Create Activity
```typescript
const activity = await ActivitiesController.createActivity({
  applicationId: 'app-123',
  title: 'New Activity',
  description: 'Activity description',
  type: 'CREATED',
  status: 'ACTIVE',
  createdBy: 'user-id'
})
```

#### Get Activity by ID
```typescript
const activity = await ActivitiesController.getActivityById('activity-123')
```

#### Update Activity
```typescript
const updatedActivity = await ActivitiesController.updateActivity('activity-123', {
  title: 'Updated Title',
  status: 'COMPLETED'
})
```

#### Delete Activity
```typescript
await ActivitiesController.deleteActivity('activity-123')
```

### Applications Controller

#### Get All Applications
```typescript
const applications = await ApplicationsController.getApplications()
```

#### Create Application
```typescript
const application = await ApplicationsController.createApplication({
  name: 'My Application',
  businessUnit: 'IT',
  description: 'Application description',
  ownerName: 'John Doe',
  ownerEmail: 'john@example.com',
  useCases: [
    { name: 'Use Case 1', description: 'Description 1' }
  ],
  score: {
    technicalScore: 85,
    businessScore: 90,
    totalScore: 175
  }
})
```

#### Get Application by ID
```typescript
const application = await ApplicationsController.getApplicationById('app-123')
```

#### Update Application
```typescript
const updatedApplication = await ApplicationsController.updateApplication('app-123', {
  name: 'Updated Name',
  description: 'Updated description'
})
```

#### Delete Application
```typescript
await ApplicationsController.deleteApplication('app-123')
```

## Benefits

1. **Server-Side Usage**: Use these controllers in server components, server actions, or other server-side contexts
2. **No HTTP Overhead**: Direct database access without HTTP request/response overhead
3. **Type Safety**: Full TypeScript support with proper type definitions
4. **Error Handling**: Consistent error handling with meaningful error messages
5. **Reusability**: Can be used in multiple contexts (API routes, server components, etc.)

## Error Handling

All controller methods throw errors with descriptive messages. Wrap calls in try-catch blocks:

```typescript
try {
  const activity = await ActivitiesController.getActivityById('invalid-id')
} catch (error) {
  if (error instanceof Error && error.message === 'Activity not found') {
    // Handle not found case
  }
  // Handle other errors
}
```

## Example Usage in Server Components

```typescript
// app/activities/page.tsx
import { ActivitiesController } from '@/controllers'

export default async function ActivitiesPage() {
  const { activities } = await ActivitiesController.getActivities({
    limit: 20
  })

  return (
    <div>
      {activities.map(activity => (
        <div key={activity.id}>{activity.title}</div>
      ))}
    </div>
  )
}
```

## Example Usage in Server Actions

```typescript
// app/actions/activities.ts
'use server'

import { ActivitiesController } from '@/controllers'

export async function createActivity(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  
  try {
    const activity = await ActivitiesController.createActivity({
      applicationId: 'app-123',
      title,
      description,
      type: 'CREATED'
    })
    return { success: true, activity }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
``` 