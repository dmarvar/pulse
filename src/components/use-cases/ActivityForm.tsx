'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { ACTIVITY_TYPES, ACTIVITY_TYPE_LABELS } from '@/lib/constants/activity-types';
import { FeatureRequestSelector } from './FeatureRequestSelector';

type ActivityFormData = {
  title: string;
  description?: string;
  type: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  executionDate?: string;
};

interface Activity {
  id: string;
  title: string;
  description?: string;
  type: string;
  status: string;
  executionDate?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  application: {
    id: string;
    name: string;
    businessUnit: string;
  };
  featureRequests?: Array<{
    featureRequest: {
      id: string;
      title: string;
      priority: string;
      status: string;
    };
  }>;
}

interface ActivityFormProps {
  mode: 'create' | 'update';
  applicationId?: string;
  applicationName?: string;
  activity?: Activity;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ActivityForm({ mode, applicationId, applicationName, activity, onClose, onSuccess }: ActivityFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [selectedFeatureRequests, setSelectedFeatureRequests] = useState<string[]>([]);

  // Get current user info from session (only for create mode)
  useEffect(() => {
    if (mode === 'create') {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch('/api/auth/session');
          const data = await response.json();
          if (data.authenticated && data.user?.name) {
            setUserName(data.user.name);
          }
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      };

      fetchUserInfo();
    }
  }, [mode]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ActivityFormData>({
    defaultValues: {
      title: activity?.title || '',
      description: activity?.description || '',
      status: (activity?.status as 'ACTIVE' | 'COMPLETED' | 'CANCELLED') || 'ACTIVE',
      type: activity?.type || ACTIVITY_TYPES.NOTE,
      executionDate: activity?.executionDate ? new Date(activity.executionDate).toISOString().split('T')[0] : '',
    },
  });

  // Reset form when activity changes (for update mode)
  useEffect(() => {
    if (mode === 'update' && activity) {
      reset({
        title: activity.title,
        description: activity.description || '',
        status: activity.status as 'ACTIVE' | 'COMPLETED' | 'CANCELLED',
        type: activity.type,
        executionDate: activity.executionDate ? new Date(activity.executionDate).toISOString().split('T')[0] : '',
      });
      
      // Set selected feature requests for update mode
      if (activity.featureRequests) {
        setSelectedFeatureRequests(activity.featureRequests.map(fr => fr.featureRequest.id));
      }
    }
  }, [activity, reset, mode]);

  const onSubmit = async (data: ActivityFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const url = mode === 'create' 
        ? '/api/manager/activities'
        : `/api/manager/activities/${activity!.id}`;
      
      const method = mode === 'create' ? 'POST' : 'PUT';
      
      const requestBody = mode === 'create' 
        ? {
            ...data,
            applicationId,
            createdBy: userName || 'Unknown User',
            executionDate: data.executionDate ? new Date(data.executionDate).toISOString() : undefined,
          }
        : data;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${mode} activity`);
      }

      // For create mode, link selected feature requests after activity creation
      if (mode === 'create' && selectedFeatureRequests.length > 0) {
        const createdActivity = await response.json();
        
        // Link all selected feature requests to the new activity
        for (const featureRequestId of selectedFeatureRequests) {
          try {
            await fetch('/api/manager/feature-requests/link', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                activityId: createdActivity.id,
                featureRequestId
              }),
            });
          } catch (linkError) {
            console.error('Failed to link feature request:', linkError);
            // Don't fail the entire operation if linking fails
          }
        }
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom activity types (excluding system ones)
  const customActivityTypes = [
    ACTIVITY_TYPES.MEETING,
    ACTIVITY_TYPES.CALL, 
    ACTIVITY_TYPES.STATUS_CHANGE,
    ACTIVITY_TYPES.WORK_DONE,
    ACTIVITY_TYPES.NOTE,
    ACTIVITY_TYPES.EMAIL,
  ];

  const displayName = mode === 'create' ? applicationName : activity?.application.name;
  const submitText = mode === 'create' ? 'Create Activity' : 'Update Activity';
  const submittingText = mode === 'create' ? 'Creating...' : 'Updating...';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          <strong>Error:</strong> {submitError}
        </div>
      )}

      <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
        <p className="text-sm text-slate-300">
          {mode === 'create' ? 'Adding' : 'Updating'} activity for: <span className="font-medium text-white">{displayName}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Activity Type *
          </label>
          <select
            {...register('type', { required: 'Activity type is required' })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            {customActivityTypes.map(type => (
              <option key={type} value={type}>
                {ACTIVITY_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-400">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Title *
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter activity title"
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter activity description"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Execution Date
          </label>
          <input
            {...register('executionDate')}
            type="date"
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:contrast-100"
            disabled={isSubmitting}
          />
          <p className="mt-1 text-xs text-slate-400">
            Leave empty to use current date
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Status
          </label>
          <select
            {...register('status')}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Feature Requests
          </label>
          <FeatureRequestSelector
            activityId={mode === 'update' ? activity?.id : undefined}
            selectedFeatureRequests={selectedFeatureRequests}
            onSelectionChange={setSelectedFeatureRequests}
            className="mb-2"
            disabled={isSubmitting}
          />
          <p className="text-xs text-slate-400">
            {mode === 'create' 
              ? 'Select feature requests to link after activity creation'
              : 'Select feature requests to link to this activity'
            }
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-slate-600">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 text-slate-300 hover:text-white transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {isSubmitting ? submittingText : submitText}
        </button>
      </div>
    </form>
  );
} 