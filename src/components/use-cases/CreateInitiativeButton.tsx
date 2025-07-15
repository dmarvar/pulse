'use client';

import { useState } from 'react';
import { CreateInitiativeForm } from './CreateInitiativeForm';

interface CreateInitiativeButtonProps {
  onRefreshData?: () => void;
}

export function CreateInitiativeButton({ onRefreshData }: CreateInitiativeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    // Call the refresh function passed from parent
    onRefreshData?.();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        + Create New Initiative
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-600/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Initiative</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <CreateInitiativeForm onClose={() => setIsOpen(false)} onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 