
import { toast } from '@/components/ui/use-toast';

// Types for our API responses
export interface StockTicker {
  ticker: string;
  name: string;
}

export interface StockPrice {
  price: number;
  time: string;
}

export interface StockPriceHistory {
  ticker: string;
  prices: StockPrice[];
  averagePrice: number;
}

// Constants
const API_URL = 'http://20.244.56.144/evaluation-service';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MDU1NjEyLCJpYXQiOjE3NDcwNTUzMTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImVjNDZmOGZkLWY3YmItNGQ0Yy05NTMwLWEzZjM0NDI3M2NlNiIsInN1YiI6ImNiLmVuLnU0Y3lzMjIwNjBAY2Iuc3R1ZGVudHMuYW1yaXRhLmVkdSJ9LCJlbWFpbCI6ImNiLmVuLnU0Y3lzMjIwNjBAY2Iuc3R1ZGVudHMuYW1yaXRhLmVkdSIsIm5hbWUiOiJzaHJlZSBoYXJpbmkgdCIsInJvbGxObyI6ImNiLmVuLnU0Y3lzMjIwNjAiLCJhY2Nlc3NDb2RlIjoiU3d1dUtFIiwiY2xpZW50SUQiOiJlYzQ2ZjhmZC1mN2JiLTRkNGMtOTUzMC1hM2YzNDQyNzNjZTYiLCJjbGllbnRTZWNyZXQiOiJ4TU1zVmZUWVprU01idEJZIn0.Rk4s0cro5nHg0Sph5xBY8K5-j9Gt9JzgR_S92Xu0DH4';

// Helper function for API calls
const fetchWithAuth = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Authorization': AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    toast({
      title: "Error",
      description: "Failed to fetch data from API",
      variant: "destructive",
    });
    throw error;
  }
};

// API functions
export const getAllStocks = async (): Promise<StockTicker[]> => {
  return await fetchWithAuth('/stocks');
};

export const getStockPriceHistory = async (ticker: string, minutes: number): Promise<StockPriceHistory> => {
  const data = await fetchWithAuth(`/stocks/${ticker}?minutes=${minutes}`);
  
  // Calculate average price
  const averagePrice = data.prices.reduce((sum: number, item: StockPrice) => sum + item.price, 0) / data.prices.length;
  
  return {
    ...data,
    averagePrice,
  };
};

// Calculate Pearson correlation coefficient
export const calculateCorrelation = (x: number[], y: number[]): number => {
  if (x.length !== y.length) {
    throw new Error('Arrays must have the same length');
  }
  
  const n = x.length;
  
  // Calculate means
  const meanX = x.reduce((sum, val) => sum + val, 0) / n;
  const meanY = y.reduce((sum, val) => sum + val, 0) / n;
  
  // Calculate numerator and denominators
  let numerator = 0;
  let denominatorX = 0;
  let denominatorY = 0;
  
  for (let i = 0; i < n; i++) {
    const xDiff = x[i] - meanX;
    const yDiff = y[i] - meanY;
    
    numerator += xDiff * yDiff;
    denominatorX += xDiff * xDiff;
    denominatorY += yDiff * yDiff;
  }
  
  const denominator = Math.sqrt(denominatorX) * Math.sqrt(denominatorY);
  
  return denominator === 0 ? 0 : numerator / denominator;
};

// Calculate standard deviation
export const calculateStandardDeviation = (values: number[]): number => {
  const n = values.length;
  const mean = values.reduce((sum, val) => sum + val, 0) / n;
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / n;
  return Math.sqrt(variance);
};

// Function to generate correlation data between multiple stocks
export const generateCorrelationMatrix = async (minutes: number): Promise<{
  matrix: number[][],
  tickers: string[],
  averages: number[],
  stdDeviations: number[]
}> => {
  // Get all stock tickers
  const stocks = await getAllStocks();
  const tickers = stocks.map(stock => stock.ticker);
  
  // Fetch price history for all stocks
  const priceHistories = await Promise.all(
    tickers.map(ticker => getStockPriceHistory(ticker, minutes))
  );
  
  // Extract price arrays and calculate statistics
  const priceArrays = priceHistories.map(history => history.prices.map(p => p.price));
  const averages = priceArrays.map(prices => prices.reduce((sum, price) => sum + price, 0) / prices.length);
  const stdDeviations = priceArrays.map(prices => calculateStandardDeviation(prices));
  
  // Calculate correlation matrix
  const matrix = priceArrays.map(pricesX => 
    priceArrays.map(pricesY => calculateCorrelation(pricesX, pricesY))
  );
  
  return { matrix, tickers, averages, stdDeviations };
};
