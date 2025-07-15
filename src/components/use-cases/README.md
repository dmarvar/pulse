# Use Cases Components

This directory contains client-side components for the PulseOS Use Cases Dashboard that was converted from a purely client-side component to a server-side rendered component with client-side interactivity.

## Structure

```
src/components/use-cases/
├── charts/
│   ├── PieChartComponent.tsx        # Reusable pie chart component
│   ├── BusinessUnitPieChart.tsx     # Specialized BU distribution chart
│   └── index.ts                     # Chart components exports
├── index.ts                         # Main exports
└── README.md                        # This file
```

## Components

### PieChartComponent

A reusable client-side pie chart component that renders data using Recharts.

**Props:**
- `data: ChartData[]` - Array of data points with name and value
- `title: string` - Chart title
- `description: string` - Chart description
- `height?: number` - Chart height (default: 220)
- `colors?: string[]` - Array of colors for chart segments
- `showLabel?: boolean` - Whether to show labels on segments (default: true)
- `customColors?: Record<string, string>` - Custom colors for specific data points

**Usage:**
```typescript
<PieChartComponent
  data={chartData}
  title="My Chart"
  description="Chart description"
  customColors={{ "Grade 1": "#34d399" }}
/>
```

### BusinessUnitPieChart

A specialized pie chart component for displaying business unit distribution with custom labels and tooltips.

**Props:**
- `data: BusinessUnitData[]` - Array of business unit data with BU and Count
- `title: string` - Chart title
- `description: string` - Chart description
- `height?: number` - Chart height (default: 250)
- `colors?: string[]` - Array of colors for chart segments

**Usage:**
```typescript
<BusinessUnitPieChart
  data={businessUnitData}
  title="Distribution by Business Unit"
  description="Shows how initiatives are distributed across different business units"
/>
```

## Architecture

The original component was converted from client-side to server-side rendering:

1. **Server-side processing**: Data processing is done on the server using utilities from `@/lib/use-cases/data-processing`
2. **Client-side interactivity**: Only the interactive chart components are rendered client-side
3. **Better performance**: Initial page load is faster as data is processed server-side
4. **Better SEO**: Server-side rendering improves SEO capabilities

## Data Processing

The data processing logic has been moved to `@/lib/use-cases/data-processing.ts` which provides:

- Type definitions for Initiative and data structures
- Helper functions for data manipulation
- Server-side data processing function `processInitiativesData()`

## Import Examples

```typescript
// Import individual components
import { PieChartComponent } from '@/components/use-cases/charts/PieChartComponent';

// Import multiple components from index
import { PieChartComponent, BusinessUnitPieChart } from '@/components/use-cases/charts';

// Import all components
import * as UseCaseCharts from '@/components/use-cases/charts';
```

## Benefits

1. **Server-side rendering**: Faster initial page load and better SEO
2. **Selective client-side rendering**: Only interactive components are client-side
3. **Reusable components**: Chart components can be reused in other parts of the app
4. **Clean separation**: Clear separation between data processing and UI rendering
5. **Type safety**: Full TypeScript support with proper type definitions 