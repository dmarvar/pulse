import { NextRequest, NextResponse } from 'next/server'
import { ActivitiesController } from '@/controllers/manager/activities.controller'

// GET /api/activities - List all activities with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const applicationId = searchParams.get('applicationId') || undefined
    const type = searchParams.get('type') || undefined
    const status = searchParams.get('status') || undefined
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const result = await ActivitiesController.getActivities({
      applicationId,
      type,
      status,
      limit,
      offset
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}

// POST /api/activities - Create a new activity
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      applicationId, 
      title, 
      description, 
      type, 
      status = 'ACTIVE',
      createdBy,
      executionDate 
    } = body

    const activity = await ActivitiesController.createActivity({
      applicationId,
      title,
      description,
      type,
      status,
      createdBy,
      executionDate
    })

    return NextResponse.json(activity, { status: 201 })
  } catch (error) {
    console.error('Error creating activity:', error)
    if (error instanceof Error) {
      if (error.message === 'Application ID, title, and type are required') {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        )
      }
      if (error.message === 'Application not found') {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        )
      }
    }
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    )
  }
} 