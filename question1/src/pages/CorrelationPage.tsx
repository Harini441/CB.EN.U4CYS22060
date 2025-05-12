
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import TimeRangeSelector from '@/components/TimeRangeSelector';
import CorrelationHeatmap from '@/components/CorrelationHeatmap';

const CorrelationPage: React.FC = () => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(15);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-end">
          <TimeRangeSelector selectedMinutes={selectedMinutes} onChange={setSelectedMinutes} />
        </div>
        
        <CorrelationHeatmap minutes={selectedMinutes} />
      </div>
    </Layout>
  );
};

export default CorrelationPage;
