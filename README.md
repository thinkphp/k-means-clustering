# K-Means Clustering Interactive Demo for Next.js

This Next.js component provides an interactive visualization of the K-means clustering algorithm. Users can add data points by clicking on a canvas, adjust the number of clusters, and watch the algorithm work in real-time to group similar points together.

## Prerequisites

- Next.js 14 or higher
- Node.js 18.17 or later
- Tailwind CSS
- shadcn/ui components

## Installation

1. If you haven't already, create a new Next.js project with Tailwind CSS:
```bash
npx create-next-app@latest kmeans-clustering-demo --typescript --tailwind --eslint
cd kmeans-clustering-demo
```

2. Install and configure shadcn/ui:
```bash
npx shadcn@latest init
```

3. Install required shadcn/ui components:
```bash
npx shadcn-ui@latest add slider button card
```

## Project Structure

Add the component to your Next.js project:

```plaintext
app/
├── components/
│   └── kmeans-clustering.tsx
├── page.tsx
└── layout.tsx
```

## Component Implementation

1. Create a new file at `app/components/kmeans-clustering.tsx` and paste the component code.

2. Import and use the component in your page:

```tsx
// app/page.tsx
import KMeansClusteringDemo from '@/components/kmeans-clustering';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <KMeansClusteringDemo />
    </main>
  );
}
```

## Component Features

- Interactive point placement via clicking
- Adjustable number of clusters (2-5) using a slider
- Real-time visualization of clustering process
- Start/Stop control of the algorithm
- Ability to reset centroids and clear points
- Color-coded clusters and centroids
- Responsive design with a maximum width of 4xl

## Algorithm Implementation

The component implements the K-means clustering algorithm with the following steps:

1. **Initialization**: Random centroids are placed on the canvas
2. **Assignment**: Each point is assigned to the nearest centroid
3. **Update**: Centroids are moved to the average position of their assigned points
4. **Iteration**: Steps 2-3 repeat until convergence or interruption

## Key Functions

- `initializeCentroids()`: Creates random initial centroid positions
- `distance(p1, p2)`: Calculates Euclidean distance between two points
- `assignPointsToClusters()`: Assigns each point to its nearest centroid
- `updateCentroids()`: Recalculates centroid positions based on cluster assignments
- `runIteration()`: Executes one iteration of the clustering algorithm
- `handleCanvasClick()`: Adds new points when the canvas is clicked

## Styling

The component uses Tailwind CSS classes for styling and includes:

- A 600x400 pixel canvas
- Distinct colors for different clusters:
  - Red: rgb(239 68 68)
  - Green: rgb(34 197 94)
  - Blue: rgb(59 130 246)
  - Purple: rgb(168 85 247)
  - Yellow: rgb(234 179 8)
- Responsive button colors for different actions
- Clear visual distinction between points (smaller circles) and centroids (larger circles with white fill)

## User Interaction

Users can:

1. Click anywhere on the canvas to add data points
2. Use the slider to select between 2-5 clusters
3. Start/Stop the clustering algorithm
4. Reset centroid positions
5. Clear all points from the canvas

## Performance Optimization

- Uses React's useEffect for cleanup of intervals
- Efficient point and centroid rendering using absolute positioning
- Optimized calculations for distance and centroid updates
- Implements client-side rendering with 'use client' directive

## TypeScript Support

The component includes full TypeScript support. Here are the key interfaces:

```typescript
interface Point {
  x: number;
  y: number;
  clusterId?: number;
}

interface Centroid {
  x: number;
  y: number;
}
```

## Development Notes

- The component is marked with 'use client' as it uses browser APIs and state
- Uses React's useState and useEffect hooks for state management
- Implements real-time visualization using setInterval
- Utilizes shadcn/ui components for consistent UI elements

## License

This component is available under the MIT License.
