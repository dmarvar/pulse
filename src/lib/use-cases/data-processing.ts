// Define the type for initiative objects based on actual JSON structure
export interface Initiative {
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

export interface ChartData {
  name: string;
  value: number;
}

export interface BusinessUnitData {
  BU: string;
  Count: number;
}

export interface ProcessedData {
  initiatives: Initiative[];
  readinessData: ChartData[];
  buData: BusinessUnitData[];
  avgScore: string;
  gradeData: ChartData[];
  levelData: ChartData[];
}

// Helper function to get first value from array or return string as-is
export const getFirstValue = (value: string[] | string | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] || "";
  }
  return value || "";
};

// Helper function to get numeric value from Unnamed: 11 (Total Score)
export const getTotalScore = (item: Initiative): number | null => {
  const scoreArray = item["Unnamed: 11"];
  if (Array.isArray(scoreArray) && scoreArray.length > 0) {
    const score = parseFloat(scoreArray[0]);
    return isNaN(score) ? null : score;
  }
  return null;
};

// Helper function to get color for grade
export const getGradeColor = (grade: string): string => {
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

// Process all data server-side
export function processInitiativesData(initiatives: Initiative[]): ProcessedData {
  // 1. Calculate distribution of 'Readiness' (Unnamed: 13)
  const readinessData: ChartData[] = (() => {
    const counts: Record<string, number> = {};
    for (const i of initiatives) {
      const readiness = getFirstValue(i["Unnamed: 13"]);
      if (readiness) counts[readiness] = (counts[readiness] || 0) + 1;
    }
    return Object.entries(counts).map(([k, v]) => ({ name: k, value: v }));
  })();

  // 2. Calculate how many initiatives per Business Unit (BU)
  const buData: BusinessUnitData[] = (() => {
    const counts: Record<string, number> = {};
    for (const i of initiatives) {
      if (i.BU) counts[i.BU] = (counts[i.BU] || 0) + 1;
    }
    return Object.entries(counts).map(([k, v]) => ({ BU: k, Count: v }));
  })();

  // 3. Average 'Total_Score' (Unnamed: 11) across all initiatives
  const avgScore: string = (() => {
    let sum = 0, n = 0;
    for (const i of initiatives) {
      const score = getTotalScore(i);
      if (score !== null) {
        sum += score;
        n++;
      }
    }
    return n ? (sum / n).toFixed(2) : "-";
  })();

  // 4. Distribution of 'Final Score' (Grade) (Unnamed: 12)
  const gradeData: ChartData[] = (() => {
    const counts: Record<string, number> = {};
    for (const i of initiatives) {
      const grade = getFirstValue(i["Unnamed: 12"]);
      if (grade) counts[grade] = (counts[grade] || 0) + 1;
    }
    return Object.entries(counts).map(([k, v]) => ({ name: k, value: v }));
  })();

  // 5. Show unique implementation levels and count
  const levelData: ChartData[] = (() => {
    const counts: Record<string, number> = {};
    for (const i of initiatives) {
      const level = getFirstValue(i["Agent Implementation Level"]);
      if (level) counts[level] = (counts[level] || 0) + 1;
    }
    return Object.entries(counts).map(([k, v]) => ({ name: k, value: v }));
  })();

  return {
    initiatives,
    readinessData,
    buData,
    avgScore,
    gradeData,
    levelData
  };
} 