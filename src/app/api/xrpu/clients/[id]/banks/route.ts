import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params;
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json({
      success: true,
      message: `Client banking information with ID ${clientId} has been updated correctly.`,
      timestamp: new Date().toISOString(),
      clientId: clientId
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to update client banking information.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
