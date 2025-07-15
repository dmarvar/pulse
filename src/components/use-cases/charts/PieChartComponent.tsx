"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface PieChartComponentProps {
  data: ChartData[];
  title: string;
  description: string;
  height?: number;
  colors?: string[];
  showLabel?: boolean;
  customColors?: Record<string, string>;
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

export function PieChartComponent({
  data,
  title,
  description,
  height = 220,
  colors = DEFAULT_COLORS,
  showLabel = true,
  customColors = {}
}: PieChartComponentProps) {
  return (
    <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-600/30 backdrop-blur-sm">
      <h2 className="font-semibold mb-2 text-blue-400">{title}</h2>
      <p className="text-sm text-slate-400 mb-4">{description}</p>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={showLabel}
          >
            {data.map((entry, idx) => (
              <Cell 
                key={entry.name} 
                fill={customColors[entry.name] || colors[idx % colors.length]} 
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 