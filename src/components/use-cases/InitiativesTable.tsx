'use client';

import { useState, useMemo } from 'react';
import { type Initiative, getFirstValue, getTotalScore, getGradeColor, getStateColor } from "@/lib/use-cases/data-processing";
import { ActionsMenu } from "./ActionsMenu";
import { CreateInitiativeForm } from "./CreateInitiativeForm";
import { ActivityForm } from "./ActivityForm";

interface InitiativesTableProps {
  initiatives: Initiative[];
  onRefreshData?: () => void;
}

// Add a new type for complete application data
interface CompleteApplication {
  id: string;
  name: string;
  businessUnit: string;
  description?: string;
  ownerName?: string;
  ownerEmail?: string;
  integrationOwnerName?: string;
  state: string;
  createdAt: string;
  updatedAt: string;
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
}

type SortField = 'BU' | 'Applicacion' | 'Owner' | 'Intergration Owner' | 'Agent Implementation Level' | 'Unnamed: 13' | 'Unnamed: 11' | 'Unnamed: 12' | 'state';
type SortDirection = 'asc' | 'desc';

interface FilterState {
  search: string;
  buFilter: string;
  ownerFilter: string;
  gradeFilter: string;
  readinessFilter: string;
  levelFilter: string;
  integrationOwnerFilter: string;
  stateFilter: string;
}

export function InitiativesTable({ initiatives: initialInitiatives, onRefreshData }: InitiativesTableProps) {
  const [initiatives, setInitiatives] = useState(initialInitiatives);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingInitiative, setEditingInitiative] = useState<Initiative | null>(null);
  const [completeApplication, setCompleteApplication] = useState<CompleteApplication | null>(null);
  const [activityFormData, setActivityFormData] = useState<{
    isOpen: boolean;
    applicationId: string;
    applicationName: string;
  }>({
    isOpen: false,
    applicationId: '',
    applicationName: '',
  });

  // Filter and sort state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    buFilter: '',
    ownerFilter: '',
    gradeFilter: '',
    readinessFilter: '',
    levelFilter: '',
    integrationOwnerFilter: '',
    stateFilter: '',
  });
  const [sortField, setSortField] = useState<SortField>('Applicacion');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Extract unique values for filter dropdowns
  const uniqueValues = useMemo(() => {
    const buSet = new Set<string>();
    const ownerSet = new Set<string>();
    const gradeSet = new Set<string>();
    const readinessSet = new Set<string>();
    const levelSet = new Set<string>();
    const integrationOwnerSet = new Set<string>();
    const stateSet = new Set<string>();

    initiatives.forEach(initiative => {
      if (initiative.BU) buSet.add(initiative.BU);
      if (initiative.Owner) {
        initiative.Owner.forEach(owner => ownerSet.add(owner));
      }
      const grade = getFirstValue(initiative["Unnamed: 12"]);
      if (grade) gradeSet.add(grade);
      const readiness = getFirstValue(initiative["Unnamed: 13"]);
      if (readiness) readinessSet.add(readiness);
      const level = getFirstValue(initiative["Agent Implementation Level"]);
      if (level) levelSet.add(level);
      const integrationOwner = getFirstValue(initiative["Intergration Owner"]);
      if (integrationOwner) integrationOwnerSet.add(integrationOwner);
      if (initiative.state) stateSet.add(initiative.state);
    });

    return {
      businessUnits: Array.from(buSet).sort(),
      owners: Array.from(ownerSet).sort(),
      grades: Array.from(gradeSet).sort(),
      readiness: Array.from(readinessSet).sort(),
      levels: Array.from(levelSet).sort(),
      integrationOwners: Array.from(integrationOwnerSet).sort(),
      states: Array.from(stateSet).sort(),
    };
  }, [initiatives]);

  // Filter and sort initiatives
  const filteredAndSortedInitiatives = useMemo(() => {
    const filtered = initiatives.filter(initiative => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = !filters.search || 
        (initiative.BU?.toLowerCase().includes(searchLower) ||
         initiative.Applicacion?.toLowerCase().includes(searchLower) ||
         initiative.Owner?.some(owner => owner.toLowerCase().includes(searchLower)) ||
         getFirstValue(initiative["Intergration Owner"])?.toLowerCase().includes(searchLower) ||
         getFirstValue(initiative["Agent Implementation Level"])?.toLowerCase().includes(searchLower) ||
         getFirstValue(initiative["Unnamed: 13"])?.toLowerCase().includes(searchLower) ||
         getFirstValue(initiative["Unnamed: 12"])?.toLowerCase().includes(searchLower) ||
         initiative.state?.toLowerCase().includes(searchLower));

      const matchesBU = !filters.buFilter || initiative.BU === filters.buFilter;
      const matchesOwner = !filters.ownerFilter || 
        (initiative.Owner && initiative.Owner.includes(filters.ownerFilter));
      const matchesGrade = !filters.gradeFilter || 
        getFirstValue(initiative["Unnamed: 12"]) === filters.gradeFilter;
      const matchesReadiness = !filters.readinessFilter || 
        getFirstValue(initiative["Unnamed: 13"]) === filters.readinessFilter;
      const matchesLevel = !filters.levelFilter || 
        getFirstValue(initiative["Agent Implementation Level"]) === filters.levelFilter;
      const matchesIntegrationOwner = !filters.integrationOwnerFilter || 
        getFirstValue(initiative["Intergration Owner"]) === filters.integrationOwnerFilter;
      const matchesState = !filters.stateFilter || 
        initiative.state === filters.stateFilter;

      return matchesSearch && matchesBU && matchesOwner && matchesGrade && 
             matchesReadiness && matchesLevel && matchesIntegrationOwner && matchesState;
    });

    // Sort initiatives
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortField === 'Unnamed: 11') {
        aValue = getTotalScore(a) || 0;
        bValue = getTotalScore(b) || 0;
      } else if (sortField === 'state') {
        aValue = a.state || '';
        bValue = b.state || '';
      } else {
        aValue = getFirstValue(a[sortField]) || '';
        bValue = getFirstValue(b[sortField]) || '';
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [initiatives, filters, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (filterKey: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      buFilter: '',
      ownerFilter: '',
      gradeFilter: '',
      readinessFilter: '',
      levelFilter: '',
      integrationOwnerFilter: '',
      stateFilter: '',
    });
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const handleEdit = async (initiative: Initiative) => {
    if (!initiative.id) {
      setError('Cannot edit: Application ID not found');
      return;
    }

    try {
      // Fetch the complete application data from the database
      const response = await fetch(`/api/manager/applications/${initiative.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch application data');
      }
      
      const applicationData: CompleteApplication = await response.json();
      setCompleteApplication(applicationData);
      setEditingInitiative(initiative);
    } catch (err) {
      console.error('Error fetching application data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch application data');
    }
  };

  const handleCloseEdit = () => {
    setEditingInitiative(null);
    setCompleteApplication(null);
  };

  const handleEditSuccess = () => {
    onRefreshData?.();
    setEditingInitiative(null);
  };

  const handleDelete = async (initiative: Initiative) => {
    if (!initiative.id) {
      setError('Cannot delete: Application ID not found');
      return;
    }

    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete "${initiative.Applicacion}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(initiative.id);
    setError(null);

    try {
      const response = await fetch(`/api/manager/applications/${initiative.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete application');
      }

      // Remove the deleted initiative from the local state
      setInitiatives(prev => prev.filter(item => item.id !== initiative.id));
      
      // Also call the parent refresh function to keep everything in sync
      onRefreshData?.();
      
      // Show success message (optional)
      console.log('Application deleted successfully');
    } catch (err) {
      console.error('Error deleting application:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete application');
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddActivity = (initiative: Initiative) => {
    if (!initiative.id) {
      setError('Cannot add activity: Application ID not found');
      return;
    }
    
    setActivityFormData({
      isOpen: true,
      applicationId: initiative.id,
      applicationName: initiative.Applicacion || 'Unknown Application',
    });
  };

  const handleActivitySuccess = () => {
    // Optionally refresh the data to show updated activity counts
    onRefreshData?.();
    setActivityFormData({
      isOpen: false,
      applicationId: '',
      applicationName: '',
    });
  };

  const handleCloseActivityForm = () => {
    setActivityFormData({
      isOpen: false,
      applicationId: '',
      applicationName: '',
    });
  };

  return (
    <>
      <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 mt-6 border border-slate-600/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-blue-400">All Initiatives</h2>
          <div className="text-sm text-slate-400">
            Showing {filteredAndSortedInitiatives.length} of {initiatives.length} initiatives
          </div>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-600/20 border border-red-600/50 rounded-md">
            <p className="text-red-400 text-sm">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="text-red-300 hover:text-red-100 text-xs mt-1 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Filters Section */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search initiatives..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <select
              value={filters.buFilter}
              onChange={(e) => handleFilterChange('buFilter', e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Business Units</option>
              {uniqueValues.businessUnits.map(bu => (
                <option key={bu} value={bu}>{bu}</option>
              ))}
            </select>

            <select
              value={filters.ownerFilter}
              onChange={(e) => handleFilterChange('ownerFilter', e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Owners</option>
              {uniqueValues.owners.map(owner => (
                <option key={owner} value={owner}>{owner}</option>
              ))}
            </select>

            <select
              value={filters.gradeFilter}
              onChange={(e) => handleFilterChange('gradeFilter', e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Grades</option>
              {uniqueValues.grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>

            <select
              value={filters.readinessFilter}
              onChange={(e) => handleFilterChange('readinessFilter', e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Readiness</option>
              {uniqueValues.readiness.map(readiness => (
                <option key={readiness} value={readiness}>{readiness}</option>
              ))}
            </select>

            <select
              value={filters.levelFilter}
              onChange={(e) => handleFilterChange('levelFilter', e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              {uniqueValues.levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <select
              value={filters.integrationOwnerFilter}
              onChange={(e) => handleFilterChange('integrationOwnerFilter', e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Integration Owners</option>
              {uniqueValues.integrationOwners.map(owner => (
                <option key={owner} value={owner}>{owner}</option>
              ))}
            </select>

            <select
              value={filters.stateFilter}
              onChange={(e) => handleFilterChange('stateFilter', e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All States</option>
              {uniqueValues.states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th 
                  className="px-3 py-2 border-b border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('BU')}
                >
                  <div className="flex items-center space-x-1">
                    <span>BU</span>
                    <span className="text-xs">{getSortIcon('BU')}</span>
                  </div>
                </th>
                <th 
                  className="px-3 py-2 border-b border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('Applicacion')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Application</span>
                    <span className="text-xs">{getSortIcon('Applicacion')}</span>
                  </div>
                </th>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">Use Cases</th>
                <th 
                  className="px-3 py-2 border-b border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('Owner')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Owner</span>
                    <span className="text-xs">{getSortIcon('Owner')}</span>
                  </div>
                </th>
                <th 
                  className="px-3 py-2 border-b border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('Intergration Owner')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Integration Owner</span>
                    <span className="text-xs">{getSortIcon('Intergration Owner')}</span>
                  </div>
                </th>
                <th 
                  className="px-3 py-2 border-b border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('state')}
                >
                  <div className="flex items-center space-x-1">
                    <span>State</span>
                    <span className="text-xs">{getSortIcon('state')}</span>
                  </div>
                </th>
                <th 
                  className="px-3 py-2 border-b border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('Agent Implementation Level')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Level</span>
                    <span className="text-xs">{getSortIcon('Agent Implementation Level')}</span>
                  </div>
                </th>
                <th 
                  className="px-3 py-2 border-b border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('Unnamed: 13')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Readiness</span>
                    <span className="text-xs">{getSortIcon('Unnamed: 13')}</span>
                  </div>
                </th>
                <th 
                  className="px-3 py-2 border-b border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('Unnamed: 11')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Total Score</span>
                    <span className="text-xs">{getSortIcon('Unnamed: 11')}</span>
                  </div>
                </th>
                <th 
                  className="px-3 py-2 border-b border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => handleSort('Unnamed: 12')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Grade</span>
                    <span className="text-xs">{getSortIcon('Unnamed: 12')}</span>
                  </div>
                </th>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedInitiatives.map((row, i) => (
                <tr 
                  key={row.id || i} 
                  className={`hover:bg-slate-700/50 ${deletingId === row.id ? 'opacity-50' : ''}`}
                >
                  <td className="px-3 py-2 text-slate-300 whitespace-nowrap">{row.BU || "-"}</td>
                  <td className="px-3 py-2 text-slate-300 whitespace-nowrap">
                    {row.Applicacion || "-"}
                    {deletingId === row.id && (
                      <span className="ml-2 text-xs text-amber-400">(Deleting...)</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-slate-300 max-w-xs">
                    {row["Name of Client (Solution)"] && row["Name of Client (Solution)"].length > 0 ? (
                      <div className="space-y-1">
                        {row["Name of Client (Solution)"].map((item, idx) => (
                          <div key={idx} className="text-sm">{item}</div>
                        ))}
                      </div>
                    ) : "-"}
                  </td>
                  <td className="px-3 py-2 text-slate-300 max-w-xs">
                    {row.Owner && row.Owner.length > 0 ? (
                      <div className="space-y-1">
                        {row.Owner.map((owner, idx) => (
                          <div key={idx} className="text-sm">{owner}</div>
                        ))}
                      </div>
                    ) : "-"}
                  </td>
                  <td className="px-3 py-2 text-slate-300 whitespace-nowrap">{getFirstValue(row["Intergration Owner"])}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${getStateColor(row.state || '')}`}>
                      {row.state || "-"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-300 whitespace-nowrap">{getFirstValue(row["Agent Implementation Level"])}</td>
                  <td className="px-3 py-2 text-slate-300 whitespace-nowrap">{getFirstValue(row["Unnamed: 13"])}</td>
                  <td className="px-3 py-2 text-slate-300 whitespace-nowrap">{getTotalScore(row) || "-"}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${getGradeColor(getFirstValue(row["Unnamed: 12"]))}`}>
                      {getFirstValue(row["Unnamed: 12"]) || "-"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <ActionsMenu
                      onAddActivity={() => handleAddActivity(row)}
                      onEdit={() => handleEdit(row)}
                      onDelete={() => handleDelete(row)}
                      disabled={deletingId === row.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingInitiative && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-600/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Initiative</h2>
                <button
                  onClick={handleCloseEdit}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <CreateInitiativeForm 
                onClose={handleCloseEdit} 
                onSuccess={handleEditSuccess}
                initiative={editingInitiative}
                completeApplication={completeApplication || undefined}
              />
            </div>
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {activityFormData.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-600/30 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Add Activity</h2>
                <button
                  onClick={handleCloseActivityForm}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <ActivityForm 
                mode="create"
                applicationId={activityFormData.applicationId}
                applicationName={activityFormData.applicationName}
                onClose={handleCloseActivityForm} 
                onSuccess={handleActivitySuccess}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 