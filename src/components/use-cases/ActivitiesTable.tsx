'use client';

import { useState, useEffect, useCallback } from 'react';
import { ACTIVITY_TYPE_LABELS } from '@/lib/constants/activity-types';
import { ActionsMenu, ActivityForm } from './index';

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

interface ApplicationData {
  id: string;
  name: string;
  businessUnit: string;
  description?: string;
  ownerName?: string;
  ownerEmail?: string;
  integrationOwnerName?: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivitiesTableProps {
  applicationId?: string;
  title?: string;
  showFilters?: boolean;
  maxHeight?: string;
  refreshTrigger?: number;
}

export function ActivitiesTable({ 
  applicationId, 
  title = "Activities", 
  showFilters = true,
  maxHeight,
  refreshTrigger 
}: ActivitiesTableProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [applications, setApplications] = useState<Array<{id: string, name: string, businessUnit: string}>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    applicationId: applicationId || '',
    type: '',
    status: '',
    limit: 50,
  });

  // Modal states
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/manager/applications');
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      const data: ApplicationData[] = await response.json();
      setApplications(data.map((app) => ({
        id: app.id,
        name: app.name,
        businessUnit: app.businessUnit
      })));
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const fetchActivities = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (filters.applicationId) {
        params.set('applicationId', filters.applicationId);
      }
      if (filters.type) {
        params.set('type', filters.type);
      }
      if (filters.status) {
        params.set('status', filters.status);
      }
      params.set('limit', filters.limit.toString());
      
      const response = await fetch(`/api/manager/activities?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      
      const data = await response.json();
      setActivities(data.activities || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Load data on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Refresh when trigger changes
  useEffect(() => {
    if (refreshTrigger) {
      fetchActivities();
    }
  }, [refreshTrigger, fetchActivities]);

  const handleEditActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowUpdateModal(true);
  };

  const handleDeleteActivity = async (activity: Activity) => {
    if (!confirm(`Are you sure you want to delete the activity "${activity.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/manager/activities/${activity.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete activity');
      }

      // Refresh the activities list
      fetchActivities();
    } catch (error) {
      console.error('Error deleting activity:', error);
      alert('Failed to delete activity. Please try again.');
    }
  };

  const handleSuccess = () => {
    fetchActivities();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return 'bg-green-900/30 text-green-300 border-green-600/50';
      case 'COMPLETED':
        return 'bg-blue-900/30 text-blue-300 border-blue-600/50';
      case 'CANCELLED':
        return 'bg-red-900/30 text-red-300 border-red-600/50';
      default:
        return 'bg-slate-900/30 text-slate-300 border-slate-600/50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case 'MEETING':
        return 'bg-purple-900/30 text-purple-300';
      case 'CALL':
        return 'bg-blue-900/30 text-blue-300';
      case 'EMAIL':
        return 'bg-green-900/30 text-green-300';
      case 'NOTE':
        return 'bg-yellow-900/30 text-yellow-300';
      case 'STATUS_CHANGE':
        return 'bg-indigo-900/30 text-indigo-300';
      case 'WORK_DONE':
        return 'bg-emerald-900/30 text-emerald-300';
      default:
        return 'bg-slate-900/30 text-slate-300';
    }
  };

  // Get unique values for filter dropdowns
  const uniqueTypes = [...new Set(activities.map(a => a.type))].sort();
  const uniqueStatuses = [...new Set(activities.map(a => a.status))].sort();

  if (isLoading) {
    return (
      <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30">
        <div className="text-center py-8">
          <div className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white mt-2">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-blue-400 text-lg">{title}</h2>
          <div className="text-sm text-slate-400">
            {activities.length} {activities.length === 1 ? 'activity' : 'activities'}
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="mb-6 flex flex-wrap gap-4">
            {!applicationId && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Application</label>
                <select
                  value={filters.applicationId}
                  onChange={(e) => setFilters(prev => ({ ...prev, applicationId: e.target.value }))}
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Applications</option>
                  {applications.map(app => (
                    <option key={app.id} value={app.id}>
                      {app.name} ({app.businessUnit})
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>
                    {ACTIVITY_TYPE_LABELS[type as keyof typeof ACTIVITY_TYPE_LABELS] || type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Limit</label>
              <select
                value={filters.limit}
                onChange={(e) => setFilters(prev => ({ ...prev, limit: parseInt(e.target.value) }))}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchActivities}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-600/20 border border-red-600/50 rounded-md">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-2">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-slate-400">No activities found</p>
            <p className="text-slate-500 text-sm mt-1">
              {filters.applicationId ? 'No activities for this application' : 'Try adjusting the filters'}
            </p>
          </div>
        ) : (
          <div className={`overflow-x-auto ${maxHeight ? `max-h-[${maxHeight}] overflow-y-auto` : ''}`}>
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-slate-800/90 backdrop-blur-sm">
                <tr className="border-b border-slate-600">
                  <th className="px-3 py-3 text-left text-slate-300 font-medium">Type</th>
                  <th className="px-3 py-3 text-left text-slate-300 font-medium">Title</th>
                  <th className="px-3 py-3 text-left text-slate-300 font-medium">Description</th>
                  {!filters.applicationId && (
                    <th className="px-3 py-3 text-left text-slate-300 font-medium">Application</th>
                  )}
                  <th className="px-3 py-3 text-left text-slate-300 font-medium">Status</th>
                  <th className="px-3 py-3 text-left text-slate-300 font-medium">Feature Requests</th>
                  <th className="px-3 py-3 text-left text-slate-300 font-medium">Execution Date</th>
                  <th className="px-3 py-3 text-left text-slate-300 font-medium">Created</th>
                  <th className="px-3 py-3 text-left text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-3 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                        {ACTIVITY_TYPE_LABELS[activity.type as keyof typeof ACTIVITY_TYPE_LABELS] || activity.type}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="font-medium text-white">{activity.title}</div>
                      {activity.createdBy && (
                        <div className="text-xs text-slate-500 mt-1">by {activity.createdBy}</div>
                      )}
                    </td>
                    <td className="px-3 py-4 text-slate-400 max-w-xs">
                      <div className="truncate" title={activity.description}>
                        {activity.description || '-'}
                      </div>
                    </td>
                    {!filters.applicationId && (
                      <td className="px-3 py-4 text-slate-300">
                        <div>
                          <div className="font-medium">{activity.application.name}</div>
                          <div className="text-xs text-slate-500">{activity.application.businessUnit}</div>
                        </div>
                      </td>
                    )}
                    <td className="px-3 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-white">
                            {activity.featureRequests?.length || 0} linked
                          </span>
                        </div>
                        
                        {activity.featureRequests && activity.featureRequests.length > 0 && (
                          <div className="space-y-2">
                            {activity.featureRequests.slice(0, 2).map((link, index) => (
                              <div key={index} className="bg-slate-700/50 border border-slate-600/30 rounded-lg p-2">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium text-white truncate">
                                    {link.featureRequest.title}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${
                                      link.featureRequest.priority === 'LOW' ? 'bg-gray-200 text-gray-800 border-gray-300' :
                                      link.featureRequest.priority === 'MEDIUM' ? 'bg-yellow-200 text-yellow-800 border-yellow-300' :
                                      link.featureRequest.priority === 'HIGH' ? 'bg-orange-200 text-orange-800 border-orange-300' :
                                      'bg-red-200 text-red-800 border-red-300'
                                    }`}>
                                      {link.featureRequest.priority}
                                    </span>
                                    <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${
                                      link.featureRequest.status === 'PENDING' ? 'bg-gray-200 text-gray-800 border-gray-300' :
                                      link.featureRequest.status === 'IN_PROGRESS' ? 'bg-blue-200 text-blue-800 border-blue-300' :
                                      link.featureRequest.status === 'COMPLETED' ? 'bg-green-200 text-green-800 border-green-300' :
                                      'bg-red-200 text-red-800 border-red-300'
                                    }`}>
                                      {link.featureRequest.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {activity.featureRequests.length > 2 && (
                              <div className="text-xs text-slate-400 text-center py-1">
                                +{activity.featureRequests.length - 2} more feature requests
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-slate-400">
                      {activity.executionDate ? (
                        <div>{formatDate(activity.executionDate)}</div>
                      ) : (
                        <div className="text-slate-500 italic">Not set</div>
                      )}
                    </td>
                    <td className="px-3 py-4 text-slate-400">
                      <div>{formatDate(activity.createdAt)}</div>
                      {activity.createdAt !== activity.updatedAt && (
                        <div className="text-xs text-slate-500 mt-1">
                          Updated {formatDate(activity.updatedAt)}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-4">
                      <ActionsMenu
                        onEdit={() => handleEditActivity(activity)}
                        onDelete={() => handleDeleteActivity(activity)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Update Activity Modal */}
      {showUpdateModal && selectedActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-600/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Update Activity</h2>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <ActivityForm 
                mode="update"
                activity={selectedActivity}
                onClose={() => setShowUpdateModal(false)} 
                onSuccess={handleSuccess} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 