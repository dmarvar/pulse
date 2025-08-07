import { NextRequest, NextResponse } from 'next/server'
import { FeatureRequestsController } from '@/controllers/manager'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const result = await FeatureRequestsController.linkFeatureRequestToActivity(body)
    
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/manager/feature-requests/link:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    
    const result = await FeatureRequestsController.unlinkFeatureRequestFromActivity(body)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in DELETE /api/manager/feature-requests/link:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
} 