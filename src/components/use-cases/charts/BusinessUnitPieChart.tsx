"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface BusinessUnitData {
  BU: string;
  Count: number;
}

interface BusinessUnitPieChartProps {
  data: BusinessUnitData[];
  title: string;
  description: string;
  height?: number;
  colors?: string[];
}

const DEFAULT_COLORS = [
  "#60a5fa", // Blue-400 - Primary brand blue
  "#34d399", // Emerald-400 - Success/positive
  "#fbbf24", // Amber-400 - Warning/attention
  "#f87171", // Red-400 - Critical/negative
  "#a78bfa", // Violet-400 - Secondary accent
  "#06b6d4", // Cyan-400 - Info/neutral
  "#fb7185", // Rose-400 - Alternative accent
  "#4ade80", // Green-400 - Growth/progress
];

export function BusinessUnitPieChart({
  data,
  title,
  description,
  height = 250,
  colors = DEFAULT_COLORS
}: BusinessUnitPieChartProps) {
  // Convert data to chart format
  const chartData = data.map(item => ({ name: item.BU, value: item.Count }));

  return (
    <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30 backdrop-blur-sm">
      <h2 className="font-semibold mb-2 text-blue-400">{title}</h2>
      <p className="text-sm text-slate-400 mb-4">{description}</p>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, value, percent }) => `${name}: ${value} (${percent ? (percent * 100).toFixed(0) : 0}%)`}
          >
            {chartData.map((entry, idx) => (
              <Cell key={entry.name} fill={colors[idx % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} initiatives`, name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 