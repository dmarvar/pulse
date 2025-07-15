import { prisma } from '@/lib/prisma'

export interface ActivityFilters {
  applicationId?: string
  type?: string
  status?: string
  limit?: number
  offset?: number
}

export interface CreateActivityData {
  applicationId: string
  title: string
  description?: string
  type: string
  status?: string
  createdBy?: string
}

export interface UpdateActivityData {
  title?: string
  description?: string
  type?: string
  status?: string
}

export class ActivitiesController {
  /**
   * Get activities with optional filtering
   */
  static async getActivities(filters: ActivityFilters = {}) {
    const {
      applicationId,
      type,
      status,
      limit = 50,
      offset = 0
    } = filters

    const where: {
      applicationId?: string;
      type?: string;
      status?: string;
    } = {}

    if (applicationId) {
      where.applicationId = applicationId
    }

    if (type) {
      where.type = type
    }

    if (status) {
      where.status = status
    }

    const activities = await prisma.activity.findMany({
      where,
      include: {
        application: {
          select: {
            id: true,
            name: true,
            businessUnit: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      skip: offset
    })

    const total = await prisma.activity.count({ where })

    return {
      activities,
      total,
      limit,
      offset
    }
  }

  /**
   * Create a new activity
   */
  static async createActivity(data: CreateActivityData) {
    const { 
      applicationId, 
      title, 
      description, 
      type, 
      status = 'ACTIVE',
      createdBy 
    } = data

    if (!applicationId || !title || !type) {
      throw new Error('Application ID, title, and type are required')
    }

    // Verify application exists
    const application = await prisma.application.findUnique({
      where: { id: applicationId }
    })

    if (!application) {
      throw new Error('Application not found')
    }

    const activity = await prisma.activity.create({
      data: {
        applicationId,
        title,
        description,
        type,
        status,
        createdBy
      },
      include: {
        application: {
          select: {
            id: true,
            name: true,
            businessUnit: true
          }
        }
      }
    })

    return activity
  }

  /**
   * Get a specific activity by ID
   */
  static async getActivityById(id: string) {
    const activity = await prisma.activity.findUnique({
      where: { id },
      include: {
        application: {
          select: {
            id: true,
            name: true,
            businessUnit: true
          }
        }
      }
    })

    if (!activity) {
      throw new Error('Activity not found')
    }

    return activity
  }

  /**
   * Update a specific activity
   */
  static async updateActivity(id: string, data: UpdateActivityData) {
    const { title, description, type, status } = data

    // Check if activity exists
    const existingActivity = await prisma.activity.findUnique({
      where: { id }
    })

    if (!existingActivity) {
      throw new Error('Activity not found')
    }

    const updatedActivity = await prisma.activity.update({
      where: { id },
      data: {
        title,
        description,
        type,
        status
      },
      include: {
        application: {
          select: {
            id: true,
            name: true,
            businessUnit: true
          }
        }
      }
    })

    return updatedActivity
  }

  /**
   * Delete a specific activity
   */
  static async deleteActivity(id: string) {
    // Check if activity exists
    const existingActivity = await prisma.activity.findUnique({
      where: { id }
    })

    if (!existingActivity) {
      throw new Error('Activity not found')
    }

    await prisma.activity.delete({
      where: { id }
    })

    return { message: 'Activity deleted successfully' }
  }
} 