'use client';

import { useState, useRef, useEffect } from 'react';

interface ActionsMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
}

export function ActionsMenu({ onEdit, onDelete, disabled = false }: ActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
          disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-slate-600/50'
        }`}
        aria-label="Actions menu"
      >
        <svg
          className="w-4 h-4 text-slate-400"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <circle cx="8" cy="2" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="14" r="1.5" />
        </svg>
      </button>

      {isOpen && !disabled && (
        <div className="absolute right-0 top-8 z-50 w-32 rounded-md bg-slate-800 shadow-lg ring-1 ring-slate-600 ring-opacity-50">
          <div className="py-1">
            {onEdit && (
              <button
                onClick={() => {
                  onEdit();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-150"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-slate-300 hover:bg-red-600 hover:text-white transition-colors duration-150"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 