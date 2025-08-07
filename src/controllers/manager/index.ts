// Export all manager controllers
export { ActivitiesController } from './activities.controller'
export { ApplicationsController } from './applications.controller'
export { FeatureRequestsController } from './feature-requests.controller'

// Export types for easier importing
export type {
  ActivityFilters,
  CreateActivityData,
  UpdateActivityData
} from './activities.controller'

export type {
  CreateApplicationData,
  UpdateApplicationData
} from './applications.controller'

export type {
  FeatureRequestFilters,
  CreateFeatureRequestData,
  UpdateFeatureRequestData,
  LinkFeatureRequestToActivityData
} from './feature-requests.controller' 