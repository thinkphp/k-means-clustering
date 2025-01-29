'use client';
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const KMeansClustering = () => {
  const [points, setPoints] = useState([]);
  const [centroids, setCentroids] = useState([]);
  const [numClusters, setNumClusters] = useState(3);
  const [isRunning, setIsRunning] = useState(false);

  // Initialize random centroids
  const initializeCentroids = () => {
    const newCentroids = Array(numClusters).fill(0).map(() => ({
      x: Math.random() * 600,
      y: Math.random() * 400,
    }));
    setCentroids(newCentroids);
  };

  // Calculate distance between two points
  const distance = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  // Assign points to nearest centroid
  const assignPointsToClusters = () => {
    return points.map(point => {
      const distances = centroids.map((centroid, idx) => ({
        distance: distance(point, centroid),
        clusterId: idx,
      }));
      const nearest = distances.reduce((min, curr) => 
        curr.distance < min.distance ? curr : min
      );
      return { ...point, clusterId: nearest.clusterId };
    });
  };

  // Update centroid positions
  const updateCentroids = (clusteredPoints) => {
    return centroids.map((_, idx) => {
      const clusterPoints = clusteredPoints.filter(p => p.clusterId === idx);
      if (clusterPoints.length === 0) return centroids[idx];
      
      const avgX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
      const avgY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
      return { x: avgX, y: avgY };
    });
  };

  // Run one iteration of k-means
  const runIteration = () => {
    if (!isRunning) return;
    
    const clusteredPoints = assignPointsToClusters();
    const newCentroids = updateCentroids(clusteredPoints);
    setPoints(clusteredPoints);
    setCentroids(newCentroids);
  };

  // Handle canvas click to add points
  const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints([...points, { x, y }]);
  };

  // Effect for running the algorithm
  useEffect(() => {
    const interval = setInterval(runIteration, 500);
    return () => clearInterval(interval);
  }, [isRunning, points, centroids]);

  // Colors for different clusters
  const clusterColors = [
    'rgb(239 68 68)', // red
    'rgb(34 197 94)', // green
    'rgb(59 130 246)', // blue
    'rgb(168 85 247)', // purple
    'rgb(234 179 8)',  // yellow
  ];

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Interactive K-Means Clustering</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setIsRunning(!isRunning)}
              className={isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
            >
              {isRunning ? 'Stop' : 'Start'} Algorithm
            </Button>
            <Button 
              onClick={initializeCentroids}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Reset Centroids
            </Button>
            <Button 
              onClick={() => setPoints([])}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Clear Points
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">Clusters:</span>
            <div className="w-48">
              <Slider
                value={[numClusters]}
                onValueChange={(value) => setNumClusters(value[0])}
                min={2}
                max={5}
                step={1}
              />
            </div>
            <span className="text-sm">{numClusters}</span>
          </div>

          <div 
            className="border rounded-lg"
            style={{ 
              width: '600px', 
              height: '400px', 
              position: 'relative',
              cursor: 'crosshair'
            }}
            onClick={handleCanvasClick}
          >
            {/* Draw points */}
            {points.map((point, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: point.x - 4,
                  top: point.y - 4,
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: point.clusterId !== undefined ? 
                    clusterColors[point.clusterId % clusterColors.length] : 
                    'rgb(156 163 175)',
                }}
              />
            ))}
            
            {/* Draw centroids */}
            {centroids.map((centroid, idx) => (
              <div
                key={`centroid-${idx}`}
                style={{
                  position: 'absolute',
                  left: centroid.x - 8,
                  top: centroid.y - 8,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: `3px solid ${clusterColors[idx % clusterColors.length]}`,
                  backgroundColor: 'white',
                }}
              />
            ))}
          </div>

          <div className="text-sm text-gray-600">
            Click anywhere on the canvas to add points. Use the slider to adjust the number of clusters.
            Press Start to begin the clustering algorithm.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KMeansClustering;
