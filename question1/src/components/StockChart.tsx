
import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine,
  ResponsiveContainer 
} from 'recharts';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getStockPriceHistory, StockPriceHistory } from '@/services/api';

interface StockChartProps {
  ticker: string;
  minutes: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="text-sm font-medium">{`Time: ${label}`}</p>
        <p className="text-sm text-primary">{`Price: $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  
  return null;
};

const StockChart: React.FC<StockChartProps> = ({ ticker, minutes }) => {
  const [data, setData] = useState<StockPriceHistory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const priceHistory = await getStockPriceHistory(ticker, minutes);
        setData(priceHistory);
      } catch (error) {
        console.error('Error fetching price history:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (ticker) {
      fetchData();
    }
  }, [ticker, minutes]);
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading Price Chart...</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
    );
  }
  
  if (!data || !data.prices.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No Data Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No price data available for {ticker}.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Format the data for the chart
  const chartData = data.prices.map(item => ({
    time: format(new Date(item.time), 'HH:mm:ss'),
    price: item.price
  }));
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Price Chart: {ticker}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          Average Price: ${data.averagePrice.toFixed(2)}
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                label={{ 
                  value: 'Time',
                  position: 'insideBottomRight',
                  offset: -10
                }}
              />
              <YAxis 
                label={{ 
                  value: 'Price ($)',
                  angle: -90,
                  position: 'insideLeft'
                }}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine 
                y={data.averagePrice} 
                stroke="#ff9800" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'Avg',
                  position: 'right',
                  fill: '#ff9800',
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#1976d2"
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
