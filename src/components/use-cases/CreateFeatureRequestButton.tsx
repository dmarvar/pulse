'use client';

import { useState } from 'react';
import { CreateFeatureRequestForm } from './CreateFeatureRequestForm';

interface CreateFeatureRequestButtonProps {
  onRefreshData?: () => void;
}

export function CreateFeatureRequestButton({ onRefreshData }: CreateFeatureRequestButtonProps) {
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = () => {
    setShowForm(false);
    onRefreshData?.();
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>New Feature Request</span>
      </button>

      {showForm && (
        <CreateFeatureRequestForm
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}
    </>
  );
} 