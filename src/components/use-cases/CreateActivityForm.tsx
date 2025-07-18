'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ACTIVITY_TYPES, ACTIVITY_TYPE_LABELS } from '@/lib/constants/activity-types';

type CreateActivityFormData = {
  title: string;
  description?: string;
  type: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
};

interface CreateActivityFormProps {
  applicationId: string;
  applicationName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateActivityForm({ applicationId, applicationName, onClose, onSuccess }: CreateActivityFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateActivityFormData>({
    defaultValues: {
      status: 'ACTIVE',
      type: ACTIVITY_TYPES.NOTE,
    },
  });

  const onSubmit = async (data: CreateActivityFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/manager/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          applicationId,
          createdBy: 'current-user', // You can get this from your auth system
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create activity');
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          <strong>Error:</strong> {submitError}
        </div>
      )}

      <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
        <p className="text-sm text-slate-300">
          Adding activity for: <span className="font-medium text-white">{applicationName}</span>
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
          {isSubmitting ? 'Creating...' : 'Create Activity'}
        </button>
      </div>
    </form>
  );
} 