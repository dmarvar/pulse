import { NextRequest, NextResponse } from 'next/server'
import { FeatureRequestsController } from '@/controllers/manager'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await FeatureRequestsController.getFeatureRequestById(id)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in GET /api/manager/feature-requests/[id]:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const result = await FeatureRequestsController.updateFeatureRequest(id, body)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in PUT /api/manager/feature-requests/[id]:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await FeatureRequestsController.deleteFeatureRequest(id)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in DELETE /api/manager/feature-requests/[id]:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
} 