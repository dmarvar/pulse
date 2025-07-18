export const ACTIVITY_TYPES = {
  // System activities (existing)
  CREATED: 'CREATED',
  UPDATED: 'UPDATED', 
  SCORED: 'SCORED',
  REVIEWED: 'REVIEWED',
  IMPORTED: 'IMPORTED',
  
  // Custom user activities (new)
  MEETING: 'MEETING',
  CALL: 'CALL',
  STATUS_CHANGE: 'STATUS_CHANGE',
  WORK_DONE: 'WORK_DONE',
  NOTE: 'NOTE',
  EMAIL: 'EMAIL',
} as const;

export const ACTIVITY_TYPE_LABELS = {
  [ACTIVITY_TYPES.CREATED]: 'Created',
  [ACTIVITY_TYPES.UPDATED]: 'Updated',
  [ACTIVITY_TYPES.SCORED]: 'Scored', 
  [ACTIVITY_TYPES.REVIEWED]: 'Reviewed',
  [ACTIVITY_TYPES.IMPORTED]: 'Imported',
  [ACTIVITY_TYPES.MEETING]: 'Meeting',
  [ACTIVITY_TYPES.CALL]: 'Call',
  [ACTIVITY_TYPES.STATUS_CHANGE]: 'Status Change',
  [ACTIVITY_TYPES.WORK_DONE]: 'Work Done',
  [ACTIVITY_TYPES.NOTE]: 'Note',
  [ACTIVITY_TYPES.EMAIL]: 'Email',
} as const;

export type ActivityType = typeof ACTIVITY_TYPES[keyof typeof ACTIVITY_TYPES]; 