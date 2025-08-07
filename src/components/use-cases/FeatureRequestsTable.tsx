'use client';

import { useState, useEffect, useCallback } from 'react';
import { ActionsMenu } from './ActionsMenu';

interface FeatureRequest {
  id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  category?: string;
  requestedBy?: string;
  createdAt: string;
  updatedAt: string;
  activities: Array<{
    activity: {
      id: string;
      title: string;
      application: {
        id: string;
        name: string;
        businessUnit: string;
      };
    };
  }>;
}

interface FeatureRequestsTableProps {
  title?: string;
  showFilters?: boolean;
  maxHeight?: string;
  onRefreshData?: () => void;
}

const PRIORITY_COLORS: Record<string, string> = {
  'LOW': 'bg-gray-200 text-gray-800 border-gray-300',
  'MEDIUM': 'bg-yellow-200 text-yellow-800 border-yellow-300',
  'HIGH': 'bg-orange-200 text-orange-800 border-orange-300',
  'CRITICAL': 'bg-red-200 text-red-800 border-red-300'
};

const STATUS_COLORS: Record<string, string> = {
  'PENDING': 'bg-gray-200 text-gray-800 border-gray-300',
  'IN_PROGRESS': 'bg-blue-200 text-blue-800 border-blue-300',
  'COMPLETED': 'bg-green-200 text-green-800 border-green-300',
  'REJECTED': 'bg-red-200 text-red-800 border-red-300'
};

export function FeatureRequestsTable({ 
  title = "Feature Requests", 
  showFilters = true,
  maxHeight = "600px",
  onRefreshData 
}: FeatureRequestsTableProps) {
  const [featureRequests, setFeatureRequests] = useState<FeatureRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    category: ''
  });

  const fetchFeatureRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.status) params.append('status', filters.status);
      if (filters.category) params.append('category', filters.category);
      
      const response = await fetch(`/api/manager/feature-requests?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch feature requests');
      }
      
      const data = await response.json();
      setFeatureRequests(data.featureRequests || []);
    } catch (err) {
      console.error('Error fetching feature requests:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFeatureRequests();
  }, [fetchFeatureRequests]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/manager/feature-requests/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete feature request');
      }
      
      // Refresh the data
      fetchFeatureRequests();
      onRefreshData?.();
    } catch (err) {
      console.error('Error deleting feature request:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete feature request');
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
        <button
          onClick={fetchFeatureRequests}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-600/30 backdrop-blur-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Priorities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                placeholder="Filter by category..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 mt-4">Loading feature requests...</p>
          </div>
        ) : (
          <div className="overflow-x-auto" style={{ maxHeight }}>
            <table className="w-full text-left">
              <thead className="bg-slate-700/50 text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Priority</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Requested By</th>
                  <th className="px-4 py-3 font-medium">Linked Activities</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {featureRequests.map((featureRequest) => (
                  <tr key={featureRequest.id} className="border-b border-slate-600/30 hover:bg-slate-700/30">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-white">{featureRequest.title}</div>
                        {featureRequest.description && (
                          <div className="text-sm text-slate-400 mt-1">
                            {featureRequest.description.length > 100 
                              ? `${featureRequest.description.substring(0, 100)}...`
                              : featureRequest.description
                            }
                          </div>
                        )}
                      </div>
                    </td>
                                         <td className="px-4 py-3">
                       <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${PRIORITY_COLORS[featureRequest.priority] || 'bg-gray-200 text-gray-800 border-gray-300'}`}>
                         {featureRequest.priority}
                       </span>
                     </td>
                     <td className="px-4 py-3">
                       <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${STATUS_COLORS[featureRequest.status] || 'bg-gray-200 text-gray-800 border-gray-300'}`}>
                         {featureRequest.status}
                       </span>
                     </td>
                    <td className="px-4 py-3">
                      {featureRequest.category || '-'}
                    </td>
                    <td className="px-4 py-3">
                      {featureRequest.requestedBy || '-'}
                    </td>
                                         <td className="px-4 py-3">
                       <div className="mb-2">
                         <span className="text-sm font-medium text-white">
                           {featureRequest.activities.length} activity{featureRequest.activities.length !== 1 ? 'ies' : 'y'}
                         </span>
                       </div>
                       {featureRequest.activities.length > 0 && (
                         <div className="space-y-1">
                           {featureRequest.activities.slice(0, 2).map((link, index) => (
                             <div key={index} className="bg-slate-700/50 border border-slate-600/30 rounded-lg p-2">
                               <div className="text-xs text-slate-300 font-medium mb-1">
                                 {link.activity.application.name}
                               </div>
                               <div className="text-xs text-slate-400">
                                 {link.activity.title}
                               </div>
                             </div>
                           ))}
                           {featureRequest.activities.length > 2 && (
                             <div className="text-xs text-slate-400 text-center py-1">
                               +{featureRequest.activities.length - 2} more activities
                             </div>
                           )}
                         </div>
                       )}
                     </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(featureRequest.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <ActionsMenu
                        items={[
                          {
                            label: 'Edit',
                            onClick: () => {
                              // TODO: Implement edit functionality
                              console.log('Edit feature request:', featureRequest.id);
                            }
                          },
                          {
                            label: 'View Details',
                            onClick: () => {
                              // TODO: Implement view details functionality
                              console.log('View feature request:', featureRequest.id);
                            }
                          },
                          {
                            label: 'Delete',
                            onClick: () => handleDelete(featureRequest.id),
                            className: 'text-red-600 hover:text-red-700'
                          }
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {featureRequests.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                No feature requests found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 