import { prisma } from '@/lib/prisma'

export interface FeatureRequestFilters {
  priority?: string
  status?: string
  category?: string
  limit?: number
  offset?: number
}

export interface CreateFeatureRequestData {
  title: string
  description?: string
  priority?: string
  status?: string
  category?: string
  requestedBy?: string
}

export interface UpdateFeatureRequestData {
  title?: string
  description?: string
  priority?: string
  status?: string
  category?: string
  requestedBy?: string
}

export interface LinkFeatureRequestToActivityData {
  activityId: string
  featureRequestId: string
}

export class FeatureRequestsController {
  /**
   * Get feature requests with optional filtering
   */
  static async getFeatureRequests(filters: FeatureRequestFilters = {}) {
    const {
      priority,
      status,
      category,
      limit = 50,
      offset = 0
    } = filters

    const where: {
      priority?: string;
      status?: string;
      category?: string;
    } = {}

    if (priority) {
      where.priority = priority
    }

    if (status) {
      where.status = status
    }

    if (category) {
      where.category = category
    }

    try {
      const featureRequests = await prisma.featureRequest.findMany({
        where,
        include: {
          activities: {
            include: {
              activity: {
                include: {
                  application: {
                    select: {
                      id: true,
                      name: true,
                      businessUnit: true
                    }
                  }
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit,
        skip: offset
      })

      const total = await prisma.featureRequest.count({ where })

      return {
        featureRequests,
        total,
        limit,
        offset
      }
    } catch (error) {
      console.error('Error fetching feature requests:', error)
      throw new Error('Failed to fetch feature requests from database')
    }
  }

  /**
   * Create a new feature request
   */
  static async createFeatureRequest(data: CreateFeatureRequestData) {
    const { 
      title, 
      description, 
      priority = 'MEDIUM',
      status = 'PENDING',
      category,
      requestedBy
    } = data

    if (!title) {
      throw new Error('Title is required')
    }

    const featureRequest = await prisma.featureRequest.create({
      data: {
        title,
        description,
        priority,
        status,
        category,
        requestedBy
      },
      include: {
        activities: {
          include: {
            activity: {
              include: {
                application: {
                  select: {
                    id: true,
                    name: true,
                    businessUnit: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return featureRequest
  }

  /**
   * Get a specific feature request by ID
   */
  static async getFeatureRequestById(id: string) {
    try {
      const featureRequest = await prisma.featureRequest.findUnique({
        where: { id },
        include: {
          activities: {
            include: {
              activity: {
                include: {
                  application: {
                    select: {
                      id: true,
                      name: true,
                      businessUnit: true
                    }
                  }
                }
              }
            }
          }
        }
      })

      if (!featureRequest) {
        throw new Error('Feature request not found')
      }

      return featureRequest
    } catch (error) {
      console.error('Error fetching feature request by ID:', error)
      throw new Error('Failed to fetch feature request from database')
    }
  }

  /**
   * Update a specific feature request
   */
  static async updateFeatureRequest(id: string, data: UpdateFeatureRequestData) {
    const { title, description, priority, status, category, requestedBy } = data

    // Check if feature request exists
    const existingFeatureRequest = await prisma.featureRequest.findUnique({
      where: { id }
    })

    if (!existingFeatureRequest) {
      throw new Error('Feature request not found')
    }

    const updatedFeatureRequest = await prisma.featureRequest.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        status,
        category,
        requestedBy
      },
      include: {
        activities: {
          include: {
            activity: {
              include: {
                application: {
                  select: {
                    id: true,
                    name: true,
                    businessUnit: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return updatedFeatureRequest
  }

  /**
   * Delete a specific feature request
   */
  static async deleteFeatureRequest(id: string) {
    // Check if feature request exists
    const existingFeatureRequest = await prisma.featureRequest.findUnique({
      where: { id }
    })

    if (!existingFeatureRequest) {
      throw new Error('Feature request not found')
    }

    await prisma.featureRequest.delete({
      where: { id }
    })

    return { message: 'Feature request deleted successfully' }
  }

  /**
   * Link a feature request to an activity
   */
  static async linkFeatureRequestToActivity(data: LinkFeatureRequestToActivityData) {
    const { activityId, featureRequestId } = data

    // Verify activity exists
    const activity = await prisma.activity.findUnique({
      where: { id: activityId }
    })

    if (!activity) {
      throw new Error('Activity not found')
    }

    // Verify feature request exists
    const featureRequest = await prisma.featureRequest.findUnique({
      where: { id: featureRequestId }
    })

    if (!featureRequest) {
      throw new Error('Feature request not found')
    }

    // Check if link already exists
    const existingLink = await prisma.activityFeatureRequest.findUnique({
      where: {
        activityId_featureRequestId: {
          activityId,
          featureRequestId
        }
      }
    })

    if (existingLink) {
      throw new Error('Feature request is already linked to this activity')
    }

    const link = await prisma.activityFeatureRequest.create({
      data: {
        activityId,
        featureRequestId
      },
      include: {
        activity: {
          include: {
            application: {
              select: {
                id: true,
                name: true,
                businessUnit: true
              }
            }
          }
        },
        featureRequest: true
      }
    })

    return link
  }

  /**
   * Unlink a feature request from an activity
   */
  static async unlinkFeatureRequestFromActivity(data: LinkFeatureRequestToActivityData) {
    const { activityId, featureRequestId } = data

    const link = await prisma.activityFeatureRequest.findUnique({
      where: {
        activityId_featureRequestId: {
          activityId,
          featureRequestId
        }
      }
    })

    if (!link) {
      throw new Error('Link not found')
    }

    await prisma.activityFeatureRequest.delete({
      where: {
        activityId_featureRequestId: {
          activityId,
          featureRequestId
        }
      }
    })

    return { message: 'Feature request unlinked from activity successfully' }
  }

  /**
   * Get feature requests for a specific activity
   */
  static async getFeatureRequestsForActivity(activityId: string) {
    try {
      const links = await prisma.activityFeatureRequest.findMany({
        where: { activityId },
        include: {
          featureRequest: true
        }
      })

      return links.map(link => link.featureRequest)
    } catch (error) {
      console.error('Error fetching feature requests for activity:', error)
      throw new Error('Failed to fetch feature requests for activity')
    }
  }

  /**
   * Get activities for a specific feature request
   */
  static async getActivitiesForFeatureRequest(featureRequestId: string) {
    try {
      const links = await prisma.activityFeatureRequest.findMany({
        where: { featureRequestId },
        include: {
          activity: {
            include: {
              application: {
                select: {
                  id: true,
                  name: true,
                  businessUnit: true
                }
              }
            }
          }
        }
      })

      return links.map(link => link.activity)
    } catch (error) {
      console.error('Error fetching activities for feature request:', error)
      throw new Error('Failed to fetch activities for feature request')
    }
  }
} 