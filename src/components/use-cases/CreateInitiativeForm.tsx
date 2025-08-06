'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { type Initiative, getFirstValue } from "@/lib/use-cases/data-processing";

type CreateInitiativeFormData = {
  // Application fields
  name: string;
  businessUnit: string;
  description?: string;
  ownerName?: string;
  ownerEmail?: string;
  integrationOwnerName?: string;
  state: 'OnBoarding' | 'Integration' | 'Production' | 'Cancelled';
  
  // ApplicationScore fields
  implementationLevel: 'Basic' | 'Intermediate' | 'Advanced';
  classification?: string;
  apiAvailability?: string;
  teamInvolvement?: string;
  readinessStatus: 'Very ready' | 'Medium readiness' | 'Low readiness';
  technicalScore?: number;
  businessScore?: number;
  resourceScore?: number;
  grade: 'Grade 1' | 'Grade 2' | 'Grade 3';
  
  // Use Cases
  useCases: string[];
};

interface CreateInitiativeFormProps {
  onClose: () => void;
  onSuccess?: () => void;
  initiative?: Initiative; // Optional: if provided, form will be in edit mode
  completeApplication?: {
    id: string;
    name: string;
    businessUnit: string;
    description?: string;
    ownerName?: string;
    ownerEmail?: string;
    integrationOwnerName?: string;
    state: string;
    useCases: Array<{ id: string; name: string; description?: string }>;
    score?: {
      id: string;
      implementationLevel: string;
      classification?: string;
      apiAvailability?: string;
      teamInvolvement?: string;
      readinessStatus: string;
      technicalScore?: number;
      businessScore?: number;
      resourceScore?: number;
      totalScore?: number;
      grade: string;
    };
  }; // Optional: complete application data for edit mode
}

// Helper function to convert Initiative back to form data
const initiativeToFormData = (initiative: Initiative): Partial<CreateInitiativeFormData> => {
  return {
    name: initiative.Applicacion || '',
    businessUnit: initiative.BU || '',
    description: undefined, // Not available in Initiative format
    ownerName: getFirstValue(initiative.Owner),
    ownerEmail: undefined, // Not available in Initiative format
    integrationOwnerName: getFirstValue(initiative["Intergration Owner"]),
    state: (initiative.state as 'OnBoarding' | 'Integration' | 'Production' | 'Cancelled') || 'OnBoarding',
    implementationLevel: (getFirstValue(initiative["Agent Implementation Level"]) as 'Basic' | 'Intermediate' | 'Advanced') || 'Basic',
    classification: getFirstValue(initiative["Pulse OS INT Team client classification criteria"]),
    apiAvailability: getFirstValue(initiative["Unnamed: 6"]),
    teamInvolvement: getFirstValue(initiative["Unnamed: 7"]),
    readinessStatus: (getFirstValue(initiative["Unnamed: 13"]) as 'Very ready' | 'Medium readiness' | 'Low readiness') || 'Medium readiness',
    grade: (getFirstValue(initiative["Unnamed: 12"]) as 'Grade 1' | 'Grade 2' | 'Grade 3') || 'Grade 2',
    useCases: initiative["Name of Client (Solution)"] || [''],
  };
};

// Helper function to convert complete application data to form data
const completeApplicationToFormData = (application: NonNullable<CreateInitiativeFormProps['completeApplication']>): Partial<CreateInitiativeFormData> => {
  return {
    name: application.name || '',
    businessUnit: application.businessUnit || '',
    description: application.description || '',
    ownerName: application.ownerName || '',
    ownerEmail: application.ownerEmail || '',
    integrationOwnerName: application.integrationOwnerName || '',
    state: (application.state as 'OnBoarding' | 'Integration' | 'Production' | 'Cancelled') || 'OnBoarding',
    implementationLevel: (application.score?.implementationLevel as 'Basic' | 'Intermediate' | 'Advanced') || 'Basic',
    classification: application.score?.classification || '',
    apiAvailability: application.score?.apiAvailability || '',
    teamInvolvement: application.score?.teamInvolvement || '',
    readinessStatus: (application.score?.readinessStatus as 'Very ready' | 'Medium readiness' | 'Low readiness') || 'Medium readiness',
    technicalScore: application.score?.technicalScore || undefined,
    businessScore: application.score?.businessScore || undefined,
    resourceScore: application.score?.resourceScore || undefined,
    grade: (application.score?.grade as 'Grade 1' | 'Grade 2' | 'Grade 3') || 'Grade 2',
    useCases: application.useCases.map(uc => uc.name) || [''],
  };
};

export function CreateInitiativeForm({ onClose, onSuccess, initiative, completeApplication }: CreateInitiativeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isEditMode = !!(initiative || completeApplication);

  const defaultValues = isEditMode 
    ? (completeApplication ? completeApplicationToFormData(completeApplication) : (initiative ? initiativeToFormData(initiative) : {}))
    : {
        state: 'OnBoarding' as const,
        implementationLevel: 'Basic' as const,
        readinessStatus: 'Medium readiness' as const,
        grade: 'Grade 2' as const,
        useCases: [''],
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<CreateInitiativeFormData>({
    defaultValues,
  });

  // Reset form when initiative or completeApplication changes (for edit mode)
  useEffect(() => {
    if (isEditMode) {
      const formData = completeApplication 
        ? completeApplicationToFormData(completeApplication)
        : (initiative ? initiativeToFormData(initiative) : {});
      reset(formData);
    }
  }, [initiative, completeApplication, isEditMode, reset]);

  const useCases = watch('useCases');

  const onSubmit = async (data: CreateInitiativeFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Transform form data to match API expectations
      const apiData = {
        // Basic application fields
        name: data.name,
        businessUnit: data.businessUnit,
        description: data.description,
        ownerName: data.ownerName,
        ownerEmail: data.ownerEmail,
        integrationOwnerName: data.integrationOwnerName,
        state: data.state,
        
        // Transform use cases from string[] to proper format
        useCases: data.useCases
          .filter(useCase => useCase.trim() !== '') // Remove empty strings
          .map(useCase => ({
            name: useCase.trim(),
            description: undefined
          })),
        
        // Score object
        score: {
          implementationLevel: data.implementationLevel,
          classification: data.classification,
          apiAvailability: data.apiAvailability,
          teamInvolvement: data.teamInvolvement,
          readinessStatus: data.readinessStatus,
          technicalScore: data.technicalScore,
          businessScore: data.businessScore,
          resourceScore: data.resourceScore,
          // Calculate total score if individual scores are provided
          totalScore: (data.technicalScore && data.businessScore && data.resourceScore) 
            ? data.technicalScore + data.businessScore + data.resourceScore 
            : undefined,
          grade: data.grade
        }
      };

      // Choose endpoint and method based on mode
      const url = isEditMode 
        ? `/api/manager/applications/${completeApplication?.id || initiative?.id}`
        : '/api/manager/applications';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isEditMode ? 'update' : 'create'} initiative`);
      }

      const result = await response.json();
      console.log(`Initiative ${isEditMode ? 'updated' : 'created'} successfully:`, result);
      
      // Call success callback if provided
      onSuccess?.();
      
      // Close the form
      onClose();
      
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} initiative:`, error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addUseCase = () => {
    setValue('useCases', [...useCases, '']);
  };

  const removeUseCase = (index: number) => {
    const newUseCases = useCases.filter((_: string, i: number) => i !== index);
    setValue('useCases', newUseCases);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Alert */}
      {submitError && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          <strong>Error:</strong> {submitError}
        </div>
      )}

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-blue-400">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Application Name *
            </label>
            <input
              {...register('name', { required: 'Application name is required' })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter application name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Business Unit *
            </label>
            <input
              {...register('businessUnit', { required: 'Business unit is required' })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter business unit"
              disabled={isSubmitting}
            />
            {errors.businessUnit && (
              <p className="mt-1 text-sm text-red-400">{errors.businessUnit.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter application description"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Owner Name
            </label>
            <input
              {...register('ownerName')}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter owner name"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Owner Email
            </label>
            <input
              {...register('ownerEmail', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter owner email"
              disabled={isSubmitting}
            />
            {errors.ownerEmail && (
              <p className="mt-1 text-sm text-red-400">{errors.ownerEmail.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Integration Owner
            </label>
            <input
              {...register('integrationOwnerName')}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter integration owner"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            State *
          </label>
          <select
            {...register('state', { required: 'State is required' })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          >
            <option value="OnBoarding">OnBoarding</option>
            <option value="Integration">Integration</option>
            <option value="Production">Production</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-400">{errors.state.message}</p>
          )}
        </div>
      </div>

      {/* Use Cases */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-blue-400">Use Cases</h3>
          <button
            type="button"
            onClick={addUseCase}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium disabled:opacity-50"
            disabled={isSubmitting}
          >
            + Add Use Case
          </button>
        </div>
        
        {useCases.map((_: string, index: number) => (
          <div key={index} className="flex gap-2">
            <input
              {...register(`useCases.${index}` as const)}
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter use case name"
              disabled={isSubmitting}
            />
            {useCases.length > 1 && (
              <button
                type="button"
                onClick={() => removeUseCase(index)}
                className="px-3 py-2 text-red-400 hover:text-red-300 disabled:opacity-50"
                disabled={isSubmitting}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Implementation & Scoring */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-blue-400">Implementation & Scoring</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Implementation Level *
            </label>
            <select
              {...register('implementationLevel', { required: 'Implementation level is required' })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            >
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Readiness Status *
            </label>
            <select
              {...register('readinessStatus', { required: 'Readiness status is required' })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            >
              <option value="Very ready">Very ready</option>
              <option value="Medium readiness">Medium readiness</option>
              <option value="Low readiness">Low readiness</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Grade *
            </label>
            <select
              {...register('grade', { required: 'Grade is required' })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            >
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Classification
            </label>
            <input
              {...register('classification')}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter classification"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              API Availability
            </label>
            <input
              {...register('apiAvailability')}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter API availability"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Team Involvement
            </label>
            <input
              {...register('teamInvolvement')}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter team involvement"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Technical Score
            </label>
            <p className="text-xs text-slate-400 mb-2">1 = Very good, 2 = Good, 3 = Poor</p>
            <input
              {...register('technicalScore', {
                valueAsNumber: true,
                min: { value: 1, message: 'Score must be between 1 and 3' },
                max: { value: 3, message: 'Score must be between 1 and 3' },
              })}
              type="number"
              step="1"
              min="1"
              max="3"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1"
              disabled={isSubmitting}
            />
            {errors.technicalScore && (
              <p className="mt-1 text-sm text-red-400">{errors.technicalScore.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Business Score
            </label>
            <p className="text-xs text-slate-400 mb-2">1 = Very good, 2 = Good, 3 = Poor</p>
            <input
              {...register('businessScore', {
                valueAsNumber: true,
                min: { value: 1, message: 'Score must be between 1 and 3' },
                max: { value: 3, message: 'Score must be between 1 and 3' },
              })}
              type="number"
              step="1"
              min="1"
              max="3"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1"
              disabled={isSubmitting}
            />
            {errors.businessScore && (
              <p className="mt-1 text-sm text-red-400">{errors.businessScore.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Resource Score
            </label>
            <p className="text-xs text-slate-400 mb-2">1 = Very good, 2 = Good, 3 = Poor</p>
            <input
              {...register('resourceScore', {
                valueAsNumber: true,
                min: { value: 1, message: 'Score must be between 1 and 3' },
                max: { value: 3, message: 'Score must be between 1 and 3' },
              })}
              type="number"
              step="1"
              min="1"
              max="3"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1"
              disabled={isSubmitting}
            />
            {errors.resourceScore && (
              <p className="mt-1 text-sm text-red-400">{errors.resourceScore.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
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
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {isSubmitting 
            ? (isEditMode ? 'Updating...' : 'Creating...')
            : (isEditMode ? 'Update Initiative' : 'Create Initiative')
          }
        </button>
      </div>
    </form>
  );
} 