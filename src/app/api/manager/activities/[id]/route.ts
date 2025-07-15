import { NextRequest, NextResponse } from 'next/server'
import { ActivitiesController } from '@/controllers/manager/activities.controller'

// GET /api/activities/[id] - Get a specific activity
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const activity = await ActivitiesController.getActivityById(params.id)
    return NextResponse.json(activity)
  } catch (error) {
    console.error('Error fetching activity:', error)
    if (error instanceof Error && error.message === 'Activity not found') {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    )
  }
}

// PUT /api/activities/[id] - Update a specific activity
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      type, 
      status 
    } = body

    const updatedActivity = await ActivitiesController.updateActivity(params.id, {
      title,
      description,
      type,
      status
    })

    return NextResponse.json(updatedActivity)
  } catch (error) {
    console.error('Error updating activity:', error)
    if (error instanceof Error && error.message === 'Activity not found') {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update activity' },
      { status: 500 }
    )
  }
}

// DELETE /api/activities/[id] - Delete a specific activity
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await ActivitiesController.deleteActivity(params.id)
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Error deleting activity:', error)
    if (error instanceof Error && error.message === 'Activity not found') {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to delete activity' },
      { status: 500 }
    )
  }
} 