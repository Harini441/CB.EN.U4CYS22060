
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import StockSelector from '@/components/StockSelector';
import TimeRangeSelector from '@/components/TimeRangeSelector';
import StockChart from '@/components/StockChart';

const StockPage: React.FC = () => {
  const [selectedTicker, setSelectedTicker] = useState<string>('');
  const [selectedMinutes, setSelectedMinutes] = useState<number>(15);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <StockSelector selectedTicker={selectedTicker} onChange={setSelectedTicker} />
          <TimeRangeSelector selectedMinutes={selectedMinutes} onChange={setSelectedMinutes} />
        </div>
        
        {selectedTicker && (
          <StockChart ticker={selectedTicker} minutes={selectedMinutes} />
        )}
      </div>
    </Layout>
  );
};

export default StockPage;
