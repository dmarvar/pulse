"use client";
import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidChartProps {
  chart: string;
}

export const MermaidChart: React.FC<MermaidChartProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderChart = async () => {
      mermaid.initialize({ startOnLoad: true, theme: "base" });
      if (containerRef.current) {
        try {
          // Parse the chart to check for syntax errors
          mermaid.parse(chart);
          
          // Use the modern async API
          const { svg } = await mermaid.render(
            "mermaid-svg-" + Math.random(),
            chart
          );
          
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (e) {
          if (containerRef.current) {
            containerRef.current.innerHTML =
              "<div class='text-red-500'>Invalid Mermaid diagram</div>";
          }
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow max-w-full overflow-auto">
      <div ref={containerRef} />
    </div>
  );
};