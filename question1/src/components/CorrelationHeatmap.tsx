
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip as TippyTooltip } from '@/components/ui/tooltip';
import { generateCorrelationMatrix } from '@/services/api';
import { Loader2 } from 'lucide-react';

interface CorrelationHeatmapProps {
  minutes: number;
}

interface CellTooltipProps {
  ticker1: string;
  ticker2: string;
  correlation: number;
  avg1: number;
  avg2: number;
  stdDev1: number;
  stdDev2: number;
}

const CellTooltip: React.FC<CellTooltipProps> = ({
  ticker1,
  ticker2,
  correlation,
  avg1,
  avg2,
  stdDev1,
  stdDev2,
}) => (
  <div className="bg-white p-3 border rounded shadow-lg max-w-sm">
    <p className="font-medium mb-2">{ticker1} vs {ticker2}</p>
    <p className="text-sm">Correlation: {correlation.toFixed(4)}</p>
    <div className="mt-2">
      <p className="text-xs">{ticker1}: Avg ${avg1.toFixed(2)} (σ: ${stdDev1.toFixed(2)})</p>
      <p className="text-xs">{ticker2}: Avg ${avg2.toFixed(2)} (σ: ${stdDev2.toFixed(2)})</p>
    </div>
  </div>
);

const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({ minutes }) => {
  const [correlationData, setCorrelationData] = useState<{
    matrix: number[][];
    tickers: string[];
    averages: number[];
    stdDeviations: number[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await generateCorrelationMatrix(minutes);
        setCorrelationData(data);
      } catch (error) {
        console.error('Error generating correlation matrix:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [minutes]);
  
  // Generate color based on correlation value
  const getColorForCorrelation = (value: number): string => {
    // Blue (negative) to White (zero) to Red (positive) gradient
    if (value <= 0) {
      // Map -1 to 0 range to rgb(0, 0, 255) to rgb(255, 255, 255)
      const intensity = Math.floor(255 * (1 + value));
      return `rgb(${intensity}, ${intensity}, 255)`;
    } else {
      // Map 0 to 1 range to rgb(255, 255, 255) to rgb(255, 0, 0)
      const intensity = Math.floor(255 * (1 - value));
      return `rgb(255, ${intensity}, ${intensity})`;
    }
  };
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading Correlation Heatmap...</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p className="text-sm text-gray-500">
              Calculating correlations between stocks...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!correlationData) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Failed to generate correlation data.</p>
        </CardContent>
      </Card>
    );
  }
  
  const { matrix, tickers, averages, stdDeviations } = correlationData;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stock Price Correlation Heatmap</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="flex">
          {/* Empty corner cell */}
          <div className="w-16 h-16 shrink-0" />
          
          {/* Column headers */}
          {tickers.map((ticker, i) => (
            <div 
              key={`col-${i}`} 
              className="w-16 h-16 flex items-center justify-center rotate-45 shrink-0"
            >
              <span className="text-xs font-medium">{ticker}</span>
            </div>
          ))}
        </div>
        
        {/* Matrix rows */}
        {matrix.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex">
            {/* Row header */}
            <div className="w-16 h-16 flex items-center justify-center shrink-0">
              <span className="text-xs font-medium">{tickers[rowIndex]}</span>
            </div>
            
            {/* Cells */}
            {row.map((cellValue, colIndex) => (
              <div 
                key={`cell-${rowIndex}-${colIndex}`} 
                className="w-16 h-16 p-0.5 shrink-0"
              >
                <div
                  className="w-full h-full flex items-center justify-center text-xs transition-colors cursor-pointer"
                  style={{
                    backgroundColor: getColorForCorrelation(cellValue),
                    color: Math.abs(cellValue) > 0.5 ? 'white' : 'black'
                  }}
                  title={`${tickers[rowIndex]} vs ${tickers[colIndex]}: ${cellValue.toFixed(2)}`}
                >
                  <span>
                    {cellValue.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
        
        <div className="mt-4 flex justify-center">
          <div className="flex items-center">
            <div className="w-20 h-4 bg-gradient-to-r from-blue-600 via-white to-red-600" />
            <div className="flex justify-between w-20 text-xs mt-1">
              <span>-1</span>
              <span>0</span>
              <span>+1</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrelationHeatmap;
