import { NextRequest, NextResponse } from 'next/server'
import { ApplicationsController } from '@/controllers/manager/applications.controller'

// GET /api/applications - List all applications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format')
    
    // Return data formatted for use-cases if requested
    if (format === 'use-cases') {
      const applications = await ApplicationsController.getApplicationsForUseCases()
      return NextResponse.json(applications)
    }
    
    // Default: return regular application data
    const applications = await ApplicationsController.getApplications()
    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

// POST /api/applications - Create a new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const application = await ApplicationsController.createApplication(body)
    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error('Error creating application:', error)
    
    // Handle validation errors
    if (error instanceof Error && error.message.includes('required')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    )
  }
} 