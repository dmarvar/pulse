"use client";
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidChartProps {
  chart: string;
}

let mermaidInitialized = false;

export const MermaidChart: React.FC<MermaidChartProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!mermaidInitialized) {
        mermaid.initialize({ 
          startOnLoad: false, 
          theme: "dark",
          securityLevel: 'loose',
          fontFamily: 'Arial, sans-serif',
          fontSize: 16,
          themeVariables: {
            primaryColor: '#1e293b',
            primaryTextColor: '#f1f5f9',
            primaryBorderColor: '#475569',
            lineColor: '#64748b',
            secondaryColor: '#334155',
            tertiaryColor: '#0f172a',
            background: '#0f172a',
            mainBkg: '#1e293b',
            secondBkg: '#334155',
            tertiaryBkg: '#475569',
            darkTextColor: '#f1f5f9',
            textColor: '#f1f5f9',
            loopTextColor: '#f1f5f9',
            activationBorderColor: '#64748b',
            activationBkgColor: '#334155',
            sequenceNumberColor: '#f1f5f9'
          },
          sequence: {
            actorMargin: 50,
            width: 150,
            height: 65,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35,
            mirrorActors: true,
            bottomMarginAdj: 1,
            useMaxWidth: true,
            rightAngles: false,
            showSequenceNumbers: false,
            actorFontSize: 14,
            actorFontFamily: 'Arial, sans-serif',
            actorFontWeight: 'bold',
            noteFontSize: 12,
            noteFontFamily: 'Arial, sans-serif',
            noteFontWeight: 'normal',
            noteAlign: 'center',
            messageFontSize: 12,
            messageFontFamily: 'Arial, sans-serif',
            messageFontWeight: 'normal'
          }
        });
        mermaidInitialized = true;
      }
      
      if (containerRef.current) {
        try {
          // Clear previous content
          containerRef.current.innerHTML = '';
          
          // Parse the chart to check for syntax errors
          await mermaid.parse(chart);
          
          // Use the modern async API
          const { svg } = await mermaid.render(
            "mermaid-svg-" + Date.now(),
            chart
          );
          
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
          setError(null);
        } catch (err) {
          console.error('Mermaid rendering error:', err);
          setError(err instanceof Error ? err.message : 'Unknown error');
          if (containerRef.current) {
            containerRef.current.innerHTML =
              `<div class='text-red-500 p-4'>Mermaid Error: ${err instanceof Error ? err.message : 'Unknown error'}</div>`;
          }
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="bg-slate-800 p-4 rounded-2xl shadow max-w-full overflow-auto border border-slate-600">
      <div ref={containerRef} />
      {error && (
        <div className="mt-2 p-2 bg-red-900/50 border border-red-500 rounded text-red-300 text-sm">
          Error: {error}
        </div>
      )}
    </div>
  );
};