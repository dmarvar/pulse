import { prisma } from '@/lib/prisma'

export interface CreateApplicationData {
  name: string
  businessUnit: string
  description?: string
  ownerName?: string
  ownerEmail?: string
  integrationOwnerName?: string
  useCases?: Array<{
    name: string
    description?: string
  }>
  score?: {
    implementationLevel?: string
    classification?: string
    apiAvailability?: string
    teamInvolvement?: string
    readinessStatus?: string
    technicalScore?: number
    businessScore?: number
    resourceScore?: number
    totalScore?: number
    grade?: string
  }
}

export interface UpdateApplicationData {
  name?: string
  businessUnit?: string
  description?: string
  ownerName?: string
  ownerEmail?: string
  integrationOwnerName?: string
  useCases?: Array<{
    name: string
    description?: string
  }>
  score?: {
    implementationLevel?: string
    classification?: string
    apiAvailability?: string
    teamInvolvement?: string
    readinessStatus?: string
    technicalScore?: number
    businessScore?: number
    resourceScore?: number
    totalScore?: number
    grade?: string
  }
}

export class ApplicationsController {
  /**
   * Get all applications with related data
   */
  static async getApplications() {
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

    return applications
  }

  /**
   * Get applications data formatted for use-cases dashboard
   */
  static async getApplicationsForUseCases() {
    const applications = await prisma.application.findMany({
      include: {
        useCases: true,
        score: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform to Initiative format expected by the use-cases page
    return applications.map(app => ({
      BU: app.businessUnit,
      Applicacion: app.name,
      "Name of Client (Solution)": app.useCases.map(uc => uc.name),
      Owner: app.ownerName ? [app.ownerName] : [],
      "Intergration Owner": app.integrationOwnerName ? [app.integrationOwnerName] : [],
      "Agent Implementation Level": app.score?.implementationLevel ? [app.score.implementationLevel] : [],
      "Pulse OS INT Team client classification criteria": app.score?.classification ? [app.score.classification] : [],
      "Unnamed: 6": app.score?.apiAvailability ? [app.score.apiAvailability] : [],
      "Unnamed: 7": app.score?.teamInvolvement ? [app.score.teamInvolvement] : [],
      "Unnamed: 8": [],
      "Unnamed: 9": [],
      "Unnamed: 10": [],
      "Unnamed: 11": app.score?.totalScore ? [app.score.totalScore.toString()] : [],
      "Unnamed: 12": app.score?.grade ? [app.score.grade] : [],
      "Unnamed: 13": app.score?.readinessStatus ? [app.score.readinessStatus] : [],
    }))
  }

  /**
   * Create a new application
   */
  static async createApplication(data: CreateApplicationData) {
    const { 
      name, 
      businessUnit, 
      description, 
      ownerName,
      ownerEmail,
      integrationOwnerName,
      useCases = [], 
      score 
    } = data

    if (!name || !businessUnit) {
      throw new Error('Name and business unit are required')
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
          create: useCases.map((useCase) => ({
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

    return completeApplication
  }

  /**
   * Get a specific application by ID
   */
  static async getApplicationById(id: string) {
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
      throw new Error('Application not found')
    }

    return application
  }

  /**
   * Update a specific application
   */
  static async updateApplication(id: string, data: UpdateApplicationData) {
    const { 
      name, 
      businessUnit, 
      description, 
      ownerName,
      ownerEmail,
      integrationOwnerName,
      useCases, 
      score 
    } = data

    // Check if application exists
    const existingApplication = await prisma.application.findUnique({
      where: { id }
    })

    if (!existingApplication) {
      throw new Error('Application not found')
    }

    // Update basic application data
    const updatedApplication = await prisma.application.update({
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
          data: useCases.map((useCase) => ({
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
        type: 'UPDATED'
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

    return completeApplication
  }

  /**
   * Delete a specific application
   */
  static async deleteApplication(id: string) {
    // Check if application exists
    const existingApplication = await prisma.application.findUnique({
      where: { id }
    })

    if (!existingApplication) {
      throw new Error('Application not found')
    }

    // Delete application (cascade will handle related records)
    await prisma.application.delete({
      where: { id }
    })

    return { message: 'Application deleted successfully' }
  }
} 