import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApplicationsController } from '@/controllers'

// GET /api/applications/[id] - Get a specific application
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        useCases: true,
        score: true,
        activities: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error fetching application:', error)
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    )
  }
}

// PUT /api/applications/[id] - Update a specific application
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { 
      name, 
      businessUnit, 
      description, 
      ownerName,
      ownerEmail,
      integrationOwnerName,
      useCases, 
      score 
    } = body

    // Check if application exists
    const existingApplication = await prisma.application.findUnique({
      where: { id }
    })

    if (!existingApplication) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    // Update basic application data
    await prisma.application.update({
      where: { id },
      data: {
        name,
        businessUnit,
        description,
        ownerName,
        ownerEmail,
        integrationOwnerName
      }
    })

    // Handle use cases update
    if (useCases) {
      // Delete existing use cases
      await prisma.useCase.deleteMany({
        where: { applicationId: id }
      })

      // Create new use cases
      if (useCases.length > 0) {
        await prisma.useCase.createMany({
          data: useCases.map((useCase: { name: string; description?: string }) => ({
            applicationId: id,
            name: useCase.name,
            description: useCase.description
          }))
        })
      }
    }

    // Handle score update
    if (score) {
      await prisma.applicationScore.upsert({
        where: { applicationId: id },
        update: {
          implementationLevel: score.implementationLevel,
          classification: score.classification,
          apiAvailability: score.apiAvailability,
          teamInvolvement: score.teamInvolvement,
          readinessStatus: score.readinessStatus,
          technicalScore: score.technicalScore,
          businessScore: score.businessScore,
          resourceScore: score.resourceScore,
          totalScore: score.totalScore,
          grade: score.grade
        },
        create: {
          applicationId: id,
          implementationLevel: score.implementationLevel || 'Basic',
          classification: score.classification,
          apiAvailability: score.apiAvailability,
          teamInvolvement: score.teamInvolvement,
          readinessStatus: score.readinessStatus || 'Low readiness',
          technicalScore: score.technicalScore,
          businessScore: score.businessScore,
          resourceScore: score.resourceScore,
          totalScore: score.totalScore,
          grade: score.grade || 'Grade 3'
        }
      })
    }

    // Create activity for update
    await prisma.activity.create({
      data: {
        applicationId: id,
        title: 'Application Updated',
        description: `Application "${name || existingApplication.name}" was updated`,
        type: 'UPDATED',
        status: 'COMPLETED',
        executionDate: new Date().toISOString()
      }
    })

    // Fetch the complete updated application
    const completeApplication = await prisma.application.findUnique({
      where: { id },
      include: {
        useCases: true,
        score: true,
        activities: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    return NextResponse.json(completeApplication)
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}

// DELETE /api/applications/[id] - Delete a specific application
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await ApplicationsController.deleteApplication(id)
    
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Error deleting application:', error)
    
    if (error instanceof Error && error.message === 'Application not found') {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    )
  }
} 