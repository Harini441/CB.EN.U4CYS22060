
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';

interface NumberCardProps {
  title: string;
  description: string;
  numberType: string;
}

interface NumberData {
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
}

const NumberCard: React.FC<NumberCardProps> = ({ title, description, numberType }) => {
  const [data, setData] = useState<NumberData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/numbers/${numberType}`);
      const result = await response.json();
      setData(result);
      toast({
        title: `${title} Updated`,
        description: `Successfully fetched new data.`,
        duration: 2000,
      });
    } catch (error) {
      console.error(`Error fetching ${title}:`, error);
      toast({
        title: "Error",
        description: `Failed to fetch ${title} data.`,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNumberTypeLabel = (type: string) => {
    switch (type) {
      case 'p': return 'Primes';
      case 'f': return 'Fibonacci';
      case 'e': return 'Even';
      case 'r': return 'Random';
      default: return type;
    }
  };

  return (
    <Card className="shadow-md transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setExpanded(!expanded)}
            className="h-8 w-8"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">
            Average: {data?.avg || 0}
          </div>
          <Button 
            onClick={fetchData} 
            disabled={isLoading} 
            variant="outline" 
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {expanded && (
          <>
            <div className="mt-4">
              <h4 className="font-medium mb-1">Current Window ({data?.windowCurrState.length || 0}/10):</h4>
              <div className="bg-gray-100 p-2 rounded flex flex-wrap gap-1">
                {data?.windowCurrState.map((num, index) => (
                  <span key={`curr-${index}`} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {num}
                  </span>
                )) || 'No data'}
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-1">New Numbers Added:</h4>
              <div className="bg-gray-100 p-2 rounded flex flex-wrap gap-1">
                {data?.numbers && data.numbers.length > 0 ? 
                  data.numbers.map((num, index) => (
                    <span key={`new-${index}`} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {num}
                    </span>
                  )) : 
                  <span className="text-gray-500">No new numbers</span>
                }
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-1">Previous Window State:</h4>
              <div className="bg-gray-100 p-2 rounded flex flex-wrap gap-1">
                {data?.windowPrevState && data.windowPrevState.length > 0 ? 
                  data.windowPrevState.map((num, index) => (
                    <span key={`prev-${index}`} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">
                      {num}
                    </span>
                  )) : 
                  <span className="text-gray-500">No previous data</span>
                }
              </div>
            </div>
          </>
        )}

        <div className="mt-4 text-right">
          <code className="text-xs text-gray-500">GET /api/numbers/{numberType} ({getNumberTypeLabel(numberType)})</code>
        </div>
      </CardContent>
    </Card>
  );
};

export default NumberCard;
