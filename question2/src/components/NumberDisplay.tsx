
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface NumberDisplayProps {
  result: {
    windowPrevState: number[];
    windowCurrState: number[];
    numbers: number[];
    avg: number;
  };
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium text-gray-700 mb-2">Previous Window State</h4>
            <div className="flex flex-wrap gap-2">
              {result.windowPrevState.length > 0 ? (
                result.windowPrevState.map((num, i) => (
                  <span key={`prev-${i}`} className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {num}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Empty</span>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium text-gray-700 mb-2">Current Window State</h4>
            <div className="flex flex-wrap gap-2">
              {result.windowCurrState.length > 0 ? (
                result.windowCurrState.map((num, i) => (
                  <span key={`curr-${i}`} className="px-2 py-1 bg-blue-100 rounded text-sm">
                    {num}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Empty</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h4 className="font-medium text-gray-700 mb-2">Newly Fetched Numbers</h4>
          <div className="flex flex-wrap gap-2">
            {result.numbers.length > 0 ? (
              result.numbers.map((num, i) => (
                <span key={`new-${i}`} className="px-2 py-1 bg-green-100 rounded text-sm">
                  {num}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No new numbers fetched</span>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100 text-center">
        <span className="text-gray-700">Average:</span>
        <span className="ml-2 text-2xl font-bold text-blue-700">{result.avg.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default NumberDisplay;
