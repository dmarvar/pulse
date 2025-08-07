import { NextRequest, NextResponse } from 'next/server'
import { FeatureRequestsController } from '@/controllers/manager'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters = {
      priority: searchParams.get('priority') || undefined,
      status: searchParams.get('status') || undefined,
      category: searchParams.get('category') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined
    }

    const result = await FeatureRequestsController.getFeatureRequests(filters)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in GET /api/manager/feature-requests:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const result = await FeatureRequestsController.createFeatureRequest(body)
    
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/manager/feature-requests:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
} 