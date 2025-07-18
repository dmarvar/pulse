'use client';

import { useState, useEffect } from 'react';
import { ACTIVITY_TYPE_LABELS } from '@/lib/constants/activity-types';

interface Activity {
  id: string;
  title: string;
  description?: string;
  type: string;
  status: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  application: {
    id: string;
    name: string;
    businessUnit: string;
  };
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    limit: 50,
  });

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (applicationId) {
        params.set('applicationId', applicationId);
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
  };

  useEffect(() => {
    fetchActivities();
  }, [applicationId, filters, refreshTrigger]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED': return 'bg-green-600/20 text-green-400 border-green-600/50';
      case 'CANCELLED': return 'bg-red-600/20 text-red-400 border-red-600/50';
      case 'ACTIVE': return 'bg-blue-600/20 text-blue-400 border-blue-600/50';
      default: return 'bg-slate-600/20 text-slate-400 border-slate-600/50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case 'MEETING': return 'bg-purple-600/20 text-purple-400';
      case 'CALL': return 'bg-green-600/20 text-green-400';
      case 'EMAIL': return 'bg-blue-600/20 text-blue-400';
      case 'WORK_DONE': return 'bg-orange-600/20 text-orange-400';
      case 'STATUS_CHANGE': return 'bg-yellow-600/20 text-yellow-400';
      case 'NOTE': return 'bg-slate-600/20 text-slate-400';
      default: return 'bg-gray-600/20 text-gray-400';
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
            {applicationId ? 'No activities for this application' : 'Try adjusting the filters or create a new activity'}
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
                {!applicationId && (
                  <th className="px-3 py-3 text-left text-slate-300 font-medium">Application</th>
                )}
                <th className="px-3 py-3 text-left text-slate-300 font-medium">Status</th>
                <th className="px-3 py-3 text-left text-slate-300 font-medium">Created</th>
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
                  {!applicationId && (
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
                  <td className="px-3 py-4 text-slate-400">
                    <div>{formatDate(activity.createdAt)}</div>
                    {activity.createdAt !== activity.updatedAt && (
                      <div className="text-xs text-slate-500 mt-1">
                        Updated {formatDate(activity.updatedAt)}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 