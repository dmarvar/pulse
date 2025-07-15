import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/applications - List all applications
export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        useCases: true,
        score: true,
        activities: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 5 // Latest 5 activities
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

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
    const { 
      name, 
      businessUnit, 
      description, 
      ownerName,
      ownerEmail,
      integrationOwnerName,
      useCases = [], 
      score 
    } = body

    if (!name || !businessUnit) {
      return NextResponse.json(
        { error: 'Name and business unit are required' },
        { status: 400 }
      )
    }

    // Create application with related data
    const application = await prisma.application.create({
      data: {
        name,
        businessUnit,
        description,
        ownerName,
        ownerEmail,
        integrationOwnerName,
        useCases: {
          create: useCases.map((useCase: any) => ({
            name: useCase.name,
            description: useCase.description
          }))
        },
        activities: {
          create: {
            title: 'Application Created',
            description: `Application "${name}" was created`,
            type: 'CREATED'
          }
        }
      },
      include: {
        useCases: true,
        score: true,
        activities: true
      }
    })





    // Handle score if provided
    if (score) {
      await prisma.applicationScore.create({
        data: {
          applicationId: application.id,
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

    // Fetch the complete application with all relations
    const completeApplication = await prisma.application.findUnique({
      where: { id: application.id },
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

    return NextResponse.json(completeApplication, { status: 201 })
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    )
  }
} 