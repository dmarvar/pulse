'use client';

import { useState, useEffect } from 'react';

interface FeatureRequest {
  id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  category?: string;
}

interface FeatureRequestSelectorProps {
  activityId?: string; // Optional for create mode
  selectedFeatureRequests: string[];
  onSelectionChange: (featureRequestIds: string[]) => void;
  className?: string;
  disabled?: boolean;
}

export function FeatureRequestSelector({ 
  activityId, 
  selectedFeatureRequests, 
  onSelectionChange,
  className = '',
  disabled = false
}: FeatureRequestSelectorProps) {
  const [featureRequests, setFeatureRequests] = useState<FeatureRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchFeatureRequests();
  }, []);

  const fetchFeatureRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/manager/feature-requests');
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
  };

  const handleToggleFeatureRequest = async (featureRequestId: string) => {
    const isSelected = selectedFeatureRequests.includes(featureRequestId);
    
    if (!activityId) {
      // For create mode, just update the selection without API call
      if (isSelected) {
        onSelectionChange(selectedFeatureRequests.filter(id => id !== featureRequestId));
      } else {
        onSelectionChange([...selectedFeatureRequests, featureRequestId]);
      }
      return;
    }
    
    try {
      if (isSelected) {
        // Unlink feature request
        const response = await fetch('/api/manager/feature-requests/link', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            activityId,
            featureRequestId
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to unlink feature request');
        }

        onSelectionChange(selectedFeatureRequests.filter(id => id !== featureRequestId));
      } else {
        // Link feature request
        const response = await fetch('/api/manager/feature-requests/link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            activityId,
            featureRequestId
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to link feature request');
        }

        onSelectionChange([...selectedFeatureRequests, featureRequestId]);
      }
    } catch (err) {
      console.error('Error toggling feature request:', err);
      setError(err instanceof Error ? err.message : 'Failed to update feature request link');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW': return 'bg-gray-200 text-gray-800 border-gray-300';
      case 'MEDIUM': return 'bg-yellow-200 text-yellow-800 border-yellow-300';
      case 'HIGH': return 'bg-orange-200 text-orange-800 border-orange-300';
      case 'CRITICAL': return 'bg-red-200 text-red-800 border-red-300';
      default: return 'bg-gray-200 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-gray-200 text-gray-800 border-gray-300';
      case 'IN_PROGRESS': return 'bg-blue-200 text-blue-800 border-blue-300';
      case 'COMPLETED': return 'bg-green-200 text-green-800 border-green-300';
      case 'REJECTED': return 'bg-red-200 text-red-800 border-red-300';
      default: return 'bg-gray-200 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full bg-slate-700 border-2 border-slate-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 flex items-center justify-between transition-all duration-200 ${
          disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-slate-600 hover:border-slate-400'
        } ${isOpen ? 'border-blue-400 bg-slate-600' : ''}`}
      >
        <div className="flex items-center space-x-2">
          <span className="font-medium">
            {selectedFeatureRequests.length > 0 
              ? `${selectedFeatureRequests.length} feature request${selectedFeatureRequests.length !== 1 ? 's' : ''} selected`
              : 'Select feature requests'
            }
          </span>
          {selectedFeatureRequests.length > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {selectedFeatureRequests.length}
            </span>
          )}
        </div>
        <svg 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800 border-2 border-slate-600 rounded-lg shadow-2xl max-h-96 overflow-y-auto">
          {error && (
            <div className="p-4 border-b border-slate-600 bg-red-900/20">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="p-6 text-center">
              <div className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-300 mt-3 text-sm">Loading feature requests...</p>
            </div>
          ) : featureRequests.length === 0 ? (
            <div className="p-6 text-center text-slate-400">
              <svg className="w-8 h-8 mx-auto mb-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">No feature requests available</p>
            </div>
          ) : (
            <div className="p-3">
              <div className="mb-3 px-2">
                <h4 className="text-sm font-medium text-slate-200 mb-1">Available Feature Requests</h4>
                <p className="text-xs text-slate-400">Click to select/deselect</p>
              </div>
              
              {featureRequests.map((featureRequest) => {
                const isSelected = selectedFeatureRequests.includes(featureRequest.id);
                
                return (
                  <div
                    key={featureRequest.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 mb-2 border-2 ${
                      isSelected 
                        ? 'bg-blue-600/20 border-blue-500/50 shadow-lg' 
                        : 'hover:bg-slate-700/50 border-slate-600/30 hover:border-slate-500/50'
                    }`}
                    onClick={() => handleToggleFeatureRequest(featureRequest.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'bg-blue-600 border-blue-600' 
                            : 'bg-slate-700 border-slate-500'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {featureRequest.title}
                          </h4>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(featureRequest.priority)}`}>
                            {featureRequest.priority}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(featureRequest.status)}`}>
                            {featureRequest.status}
                          </span>
                        </div>
                        
                        {featureRequest.description && (
                          <p className="text-xs text-slate-300 line-clamp-2 mb-2">
                            {featureRequest.description}
                          </p>
                        )}
                        
                        {featureRequest.category && (
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-slate-400">Category:</span>
                            <span className="text-xs text-slate-300 font-medium">{featureRequest.category}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && !disabled && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 