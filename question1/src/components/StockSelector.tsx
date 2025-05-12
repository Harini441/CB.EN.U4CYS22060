
import React, { useEffect, useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { StockTicker, getAllStocks } from '@/services/api';
import { Loader2 } from 'lucide-react';

interface StockSelectorProps {
  selectedTicker: string;
  onChange: (ticker: string) => void;
}

const StockSelector: React.FC<StockSelectorProps> = ({ selectedTicker, onChange }) => {
  const [stocks, setStocks] = useState<StockTicker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const stocksData = await getAllStocks();
        setStocks(stocksData);
        
        // If no stock is selected yet, select the first one
        if (!selectedTicker && stocksData.length > 0) {
          onChange(stocksData[0].ticker);
        }
        
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStocks();
  }, [selectedTicker, onChange]);
  
  if (loading) {
    return (
      <div className="flex items-center text-sm text-gray-500">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading stocks...
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-xs">
      <Select value={selectedTicker} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a stock" />
        </SelectTrigger>
        <SelectContent>
          {stocks.map((stock) => (
            <SelectItem key={stock.ticker} value={stock.ticker}>
              {stock.name} ({stock.ticker})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StockSelector;
