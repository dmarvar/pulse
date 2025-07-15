'use client';

import { useState } from 'react';
import { type Initiative, getFirstValue, getTotalScore, getGradeColor } from "@/lib/use-cases/data-processing";
import { ActionsMenu } from "./ActionsMenu";
import { CreateInitiativeForm } from "./CreateInitiativeForm";

interface InitiativesTableProps {
  initiatives: Initiative[];
  onRefreshData?: () => void;
}

export function InitiativesTable({ initiatives: initialInitiatives, onRefreshData }: InitiativesTableProps) {
  const [initiatives, setInitiatives] = useState(initialInitiatives);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingInitiative, setEditingInitiative] = useState<Initiative | null>(null);

  const handleEdit = (initiative: Initiative) => {
    setEditingInitiative(initiative);
  };

  const handleCloseEdit = () => {
    setEditingInitiative(null);
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

  return (
    <>
      <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 mt-6 border border-slate-600/30 backdrop-blur-sm">
        <h2 className="font-semibold mb-2 text-blue-400">All Initiatives</h2>
        
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
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">BU</th>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">Application</th>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">Use Cases</th>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">Owner</th>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">Integration Owner</th>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">Level</th>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">Readiness</th>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">Total Score</th>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">Grade</th>
                <th className="px-3 py-2 border-b border-slate-600 text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initiatives.map((row, i) => (
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
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 