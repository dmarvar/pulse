"use client";

// pages/pulseos.tsx
import { useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
// Import your data as JSON
import initiativesData from "../../../../public/pulseos.json";

// Define the type for initiative objects based on actual JSON structure
interface Initiative {
  BU?: string;
  Applicacion?: string;
  "Name of Client (Solution)"?: string[];
  Owner?: string[];
  "Intergration Owner"?: string[];
  "Agent Implementation Level"?: string[];
  "Pulse OS INT Team client classification criteria"?: string[];
  "Unnamed: 6"?: string[];
  "Unnamed: 7"?: string[];
  "Unnamed: 8"?: string[];
  "Unnamed: 9"?: string[];
  "Unnamed: 10"?: string[];
  "Unnamed: 11"?: string[];
  "Unnamed: 12"?: string[];
  "Unnamed: 13"?: string[];
}

const initiatives = initiativesData as Initiative[];

// Color palette for charts - Dark theme with brand colors
const COLORS = [
  "#60a5fa", // Blue-400 - Primary brand blue
  "#34d399", // Emerald-400 - Success/positive
  "#fbbf24", // Amber-400 - Warning/attention
  "#f87171", // Red-400 - Critical/negative
  "#a78bfa", // Violet-400 - Secondary accent
  "#06b6d4", // Cyan-400 - Info/neutral
  "#fb7185", // Rose-400 - Alternative accent
  "#4ade80", // Green-400 - Growth/progress
];

// Grade-specific colors for consistency with priority levels
const GRADE_COLORS: Record<string, string> = {
  "Grade 1": "#34d399", // Emerald-400 - High priority (positive)
  "Grade 2": "#fbbf24", // Amber-400 - Medium priority (caution)
  "Grade 3": "#f87171", // Red-400 - Lower priority (needs attention)
};

// Helper function to get first value from array or return string as-is
const getFirstValue = (value: string[] | string | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] || "";
  }
  return value || "";
};

// Helper function to get numeric value from Unnamed: 11 (Total Score)
const getTotalScore = (item: Initiative): number | null => {
  const scoreArray = item["Unnamed: 11"];
  if (Array.isArray(scoreArray) && scoreArray.length > 0) {
    const score = parseFloat(scoreArray[0]);
    return isNaN(score) ? null : score;
  }
  return null;
};

// Helper function to get color for grade
const getGradeColor = (grade: string): string => {
  switch (grade) {
    case "Grade 1":
      return "text-green-400 bg-green-500/10 border border-green-500/20";
    case "Grade 2":
      return "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20";
    case "Grade 3":
      return "text-red-400 bg-red-500/10 border border-red-500/20";
    default:
      return "text-slate-300";
  }
};

export default function PulseOS() {
  // 1. Calculate distribution of 'Readiness' (Unnamed: 13)
  const readinessData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const i of initiatives) {
      const readiness = getFirstValue(i["Unnamed: 13"]);
      if (readiness) counts[readiness] = (counts[readiness] || 0) + 1;
    }
    return Object.entries(counts).map(([k, v]) => ({ name: k, value: v }));
  }, []);

  // 2. Calculate how many initiatives per Business Unit (BU)
  const buData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const i of initiatives) {
      if (i.BU) counts[i.BU] = (counts[i.BU] || 0) + 1;
    }
    return Object.entries(counts).map(([k, v]) => ({ BU: k, Count: v }));
  }, []);

  // 3. Average 'Total_Score' (Unnamed: 11) across all initiatives
  const avgScore = useMemo(() => {
    let sum = 0, n = 0;
    for (const i of initiatives) {
      const score = getTotalScore(i);
      if (score !== null) {
        sum += score;
        n++;
      }
    }
    return n ? (sum / n).toFixed(2) : "-";
  }, []);

  // 4. Distribution of 'Final Score' (Grade) (Unnamed: 12)
  const gradeData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const i of initiatives) {
      const grade = getFirstValue(i["Unnamed: 12"]);
      if (grade) counts[grade] = (counts[grade] || 0) + 1;
    }
    return Object.entries(counts).map(([k, v]) => ({ name: k, value: v }));
  }, []);

  // 5. Show unique implementation levels and count
  const levelData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const i of initiatives) {
      const level = getFirstValue(i["Agent Implementation Level"]);
      if (level) counts[level] = (counts[level] || 0) + 1;
    }
    return Object.entries(counts).map(([k, v]) => ({ name: k, value: v }));
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">PulseOS Implementation Dashboard</h1>

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
        <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30 backdrop-blur-sm">
          <h2 className="font-semibold mb-2 text-blue-400">Integration Readiness</h2>
          <p className="text-sm text-slate-400 mb-4">
            High readiness indicates projects that already have the necessary resources and infrastructure to integrate with PulseOS
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={readinessData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {readinessData.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Pie: Grades */}
        <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30 backdrop-blur-sm">
          <h2 className="font-semibold mb-2 text-blue-400">Priority Grades</h2>
          <p className="text-sm text-slate-400 mb-4">
            Grade 1 projects are highest priority initiatives that should be implemented first
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={gradeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {gradeData.map((entry, idx) => (
                  <Cell key={entry.name} fill={GRADE_COLORS[entry.name] || COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* More charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Pie: Initiatives per BU */}
        <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30 backdrop-blur-sm">
          <h2 className="font-semibold mb-2 text-blue-400">Distribution by Business Unit</h2>
          <p className="text-sm text-slate-400 mb-4">
            Shows how initiatives are distributed across different business units
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={buData.map(item => ({ name: item.BU, value: item.Count }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, value, percent }) => `${name}: ${value} (${percent ? (percent * 100).toFixed(0) : 0}%)`}
              >
                {buData.map((entry, idx) => (
                  <Cell key={entry.BU} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} initiatives`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Pie: Implementation Levels */}
        <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30 backdrop-blur-sm">
          <h2 className="font-semibold mb-2 text-blue-400">Implementation Levels</h2>
          <p className="text-sm text-slate-400 mb-4">
            Shows the current stage of implementation progress for each initiative
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={levelData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {levelData.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 mt-6 border border-slate-600/30 backdrop-blur-sm">
        <h2 className="font-semibold mb-2 text-blue-400">All Initiatives</h2>
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
              </tr>
            </thead>
            <tbody>
              {initiatives.map((row, i) => (
                <tr key={i} className="hover:bg-slate-700/50">
                  <td className="px-3 py-2 text-slate-300 whitespace-nowrap">{row.BU || "-"}</td>
                  <td className="px-3 py-2 text-slate-300 whitespace-nowrap">{row.Applicacion || "-"}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}