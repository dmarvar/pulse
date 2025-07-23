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
  executionDate?: string
}

export interface UpdateActivityData {
  title?: string
  description?: string
  type?: string
  status?: string
  executionDate?: string
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

    try {
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

      // Transform activities to handle null values gracefully
      const transformedActivities = activities.map(activity => ({
        ...activity,
        executionDate: activity.executionDate || null,
        createdBy: activity.createdBy || null
      }))

      const total = await prisma.activity.count({ where })

      return {
        activities: transformedActivities,
        total,
        limit,
        offset
      }
    } catch (error) {
      console.error('Error fetching activities:', error)
      throw new Error('Failed to fetch activities from database')
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
      createdBy,
      executionDate 
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

    // Prepare create data, handling executionDate properly
    const createData: {
      applicationId: string;
      title: string;
      description?: string;
      type: string;
      status: string;
      createdBy?: string;
      executionDate?: string;
    } = {
      applicationId,
      title,
      description,
      type,
      status,
      createdBy
    }

    // Handle executionDate: if provided and valid, use it; otherwise, set to current date
    if (executionDate && executionDate.trim() !== '') {
      try {
        const date = new Date(executionDate);
        if (!isNaN(date.getTime())) {
          createData.executionDate = date.toISOString();
        } else {
          // If invalid date provided, use current date
          createData.executionDate = new Date().toISOString();
        }
      } catch {
        console.warn('Invalid executionDate provided:', executionDate);
        // If invalid date provided, use current date
        createData.executionDate = new Date().toISOString();
      }
    } else {
      // If no executionDate provided, use current date
      createData.executionDate = new Date().toISOString();
    }

    const activity = await prisma.activity.create({
      data: createData,
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

    // Transform activity to handle null values gracefully
    return {
      ...activity,
      executionDate: activity.executionDate || null,
      createdBy: activity.createdBy || null
    }
  }

  /**
   * Get a specific activity by ID
   */
  static async getActivityById(id: string) {
    try {
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

      // Transform activity to handle null values gracefully
      return {
        ...activity,
        executionDate: activity.executionDate || null,
        createdBy: activity.createdBy || null
      }
    } catch (error) {
      console.error('Error fetching activity by ID:', error)
      throw new Error('Failed to fetch activity from database')
    }
  }

  /**
   * Update a specific activity
   */
  static async updateActivity(id: string, data: UpdateActivityData) {
    const { title, description, type, status, executionDate } = data

    // Check if activity exists
    const existingActivity = await prisma.activity.findUnique({
      where: { id }
    })

    if (!existingActivity) {
      throw new Error('Activity not found')
    }

    // Prepare update data, handling executionDate properly
    const updateData: {
      title?: string;
      description?: string;
      type?: string;
      status?: string;
      executionDate?: string | null;
    } = {
      title,
      description,
      type,
      status
    }

    // Only include executionDate if it's provided and valid
    if (executionDate && executionDate.trim() !== '') {
      try {
        const date = new Date(executionDate);
        if (!isNaN(date.getTime())) {
          updateData.executionDate = date.toISOString();
        }
      } catch {
        console.warn('Invalid executionDate provided:', executionDate);
        // Don't update executionDate if it's invalid
      }
    } else if (executionDate === null || executionDate === undefined) {
      // Allow setting to null if explicitly provided
      updateData.executionDate = null;
    }

    const updatedActivity = await prisma.activity.update({
      where: { id },
      data: updateData,
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

    // Transform activity to handle null values gracefully
    return {
      ...updatedActivity,
      executionDate: updatedActivity.executionDate || null,
      createdBy: updatedActivity.createdBy || null
    }
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