// Server-side component for PulseOS Use Cases Dashboard
import { processInitiativesData, type Initiative, getFirstValue, getTotalScore, getGradeColor } from "@/lib/use-cases/data-processing";
import { PieChartComponent, BusinessUnitPieChart } from "@/components/use-cases/charts";
import { ApplicationsController } from "@/controllers";

// Fetch initiatives data from the controller
const getInitiativesData = async () => {
  const initiatives = await ApplicationsController.getApplicationsForUseCases();
  return initiatives as Initiative[];
};

// Grade-specific colors for consistency with priority levels
const GRADE_COLORS: Record<string, string> = {
  "Grade 1": "#34d399", // Emerald-400 - High priority (positive)
  "Grade 2": "#fbbf24", // Amber-400 - Medium priority (caution)
  "Grade 3": "#f87171", // Red-400 - Lower priority (needs attention)
};

export default async function PulseOS() {
  // Fetch initiatives data from the controller
  const initiatives = await getInitiativesData();
  
  // Process data server-side
  const { readinessData, buData, avgScore, gradeData, levelData } = processInitiativesData(initiatives);

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