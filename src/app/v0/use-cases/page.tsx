'use client';

import { useEffect, useState, useCallback } from 'react';
import { processInitiativesData, type Initiative } from "@/lib/use-cases/data-processing";
import { PieChartComponent, BusinessUnitPieChart } from "@/components/use-cases/charts";
import { CreateInitiativeButton, InitiativesTable } from "@/components/use-cases";

// Grade-specific colors for consistency with priority levels
const GRADE_COLORS: Record<string, string> = {
  "Grade 1": "#34d399", // Emerald-400 - High priority (positive)
  "Grade 2": "#fbbf24", // Amber-400 - Medium priority (caution)
  "Grade 3": "#f87171", // Red-400 - Lower priority (needs attention)
};

export default function PulseOS() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initiatives data
  const fetchInitiatives = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/manager/applications?format=use-cases');
      if (!response.ok) {
        throw new Error('Failed to fetch initiatives');
      }
      
      const data = await response.json();
      setInitiatives(data);
    } catch (err) {
      console.error('Error fetching initiatives:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load data on component mount
  useEffect(() => {
    fetchInitiatives();
  }, [fetchInitiatives]);

  // Process data
  const processedData = initiatives.length > 0 
    ? processInitiativesData(initiatives)
    : { readinessData: [], buData: [], avgScore: 0, gradeData: [], levelData: [] };

  const { readinessData, buData, avgScore, gradeData, levelData } = processedData;

  if (error) {
    return (
      <main className="min-h-screen bg-slate-900 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Error Loading Dashboard</h1>
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchInitiatives}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">PulseOS Implementation Dashboard</h1>
        <CreateInitiativeButton onRefreshData={fetchInitiatives} />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white mt-4">Loading initiatives...</p>
        </div>
      ) : (
        <>
          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30 backdrop-blur-sm">
              <div className="text-lg font-semibold mb-2 text-blue-400">Total Initiatives</div>
              <div className="text-3xl font-bold text-white">{initiatives.length}</div>
            </div>
            <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30 backdrop-blur-sm">
              <div className="text-lg font-semibold mb-2 text-blue-400">Avg Total Score</div>
              <div className="text-3xl font-bold text-white">{avgScore}</div>
            </div>
            <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30 backdrop-blur-sm">
              <div className="text-lg font-semibold mb-2 text-blue-400"># of Business Units</div>
              <div className="text-3xl font-bold text-white">{buData.length}</div>
            </div>
            <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30 backdrop-blur-sm">
              <div className="text-lg font-semibold mb-2 text-blue-400"># of Grades</div>
              <div className="text-3xl font-bold text-white">{gradeData.length}</div>
            </div>
          </div>

          {/* CHARTS ROW */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Pie: Readiness */}
            <PieChartComponent
              data={readinessData}
              title="Integration Readiness"
              description="High readiness indicates projects that already have the necessary resources and infrastructure to integrate with PulseOS"
            />
            {/* Pie: Grades */}
            <PieChartComponent
              data={gradeData}
              title="Priority Grades"
              description="Grade 1 projects are highest priority initiatives that should be implemented first"
              customColors={GRADE_COLORS}
            />
          </div>

          {/* More charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Pie: Initiatives per BU */}
            <BusinessUnitPieChart
              data={buData}
              title="Distribution by Business Unit"
              description="Shows how initiatives are distributed across different business units"
            />
            {/* Pie: Implementation Levels */}
            <PieChartComponent
              data={levelData}
              title="Implementation Levels"
              description="Shows the current stage of implementation progress for each initiative"
            />
          </div>

          {/* DATA TABLE */}
          <InitiativesTable initiatives={initiatives} onRefreshData={fetchInitiatives} />
        </>
      )}
    </main>
  );
}