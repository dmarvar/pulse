'use client';

import { useState, useRef, useEffect } from 'react';

interface ActionItem {
  label: string;
  onClick: () => void | Promise<void>;
  className?: string;
}

interface ActionsMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onAddActivity?: () => void;
  items?: ActionItem[];
  disabled?: boolean;
}

export function ActionsMenu({ onEdit, onDelete, onAddActivity, items, disabled = false }: ActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<'bottom' | 'top'>('bottom');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate menu position to prevent overflow
  const calculateMenuPosition = () => {
    if (!buttonRef.current) return 'bottom';
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const menuHeight = 120; // Approximate height of the menu
    
    // Check if menu would overflow below
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    
    // If there's not enough space below but enough space above, position above
    if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
      return 'top';
    }
    
    // Also check if we're near the bottom of a scrollable container
    const scrollContainer = buttonRef.current.closest('.overflow-y-auto, .overflow-auto');
    if (scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const containerBottom = containerRect.bottom;
      const buttonBottom = buttonRect.bottom;
      
      // If button is near the bottom of its scrollable container, position above
      if (buttonBottom > containerBottom - menuHeight) {
        return 'top';
      }
    }
    
    return 'bottom';
  };

  // Close menu when clicking outside and handle window resize
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleResize() {
      if (isOpen) {
        setMenuPosition(calculateMenuPosition());
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const handleToggleMenu = () => {
    if (disabled) return;
    
    if (!isOpen) {
      // Calculate position before opening
      setMenuPosition(calculateMenuPosition());
    }
    
    setIsOpen(!isOpen);
  };

  // Generate menu items based on props
  const getMenuItems = (): ActionItem[] => {
    if (items) {
      return items;
    }

    const menuItems: ActionItem[] = [];
    
    if (onAddActivity) {
      menuItems.push({
        label: 'Add Activity',
        onClick: onAddActivity
      });
    }
    
    if (onEdit) {
      menuItems.push({
        label: 'Edit',
        onClick: onEdit
      });
    }
    
    if (onDelete) {
      menuItems.push({
        label: 'Delete',
        onClick: onDelete,
        className: 'text-red-600 hover:text-red-700'
      });
    }
    
    return menuItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={handleToggleMenu}
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

      {isOpen && !disabled && menuItems.length > 0 && (
        <div 
          className={`absolute right-0 z-50 w-40 rounded-md bg-slate-800 shadow-lg ring-1 ring-slate-600 ring-opacity-50 ${
            menuPosition === 'top' ? 'bottom-8' : 'top-8'
          }`}
        >
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-150 ${
                  item.className || ''
                }`}
              >
                {item.label === 'Add Activity' && (
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )}
                {item.label === 'Edit' && (
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )}
                {item.label === 'Delete' && (
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 