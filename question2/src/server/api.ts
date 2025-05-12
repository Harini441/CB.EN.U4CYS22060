
import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const router = express.Router();

// FIFO queues for each number type with no duplicates
const queues: Record<string, number[]> = {
  p: [], // primes
  f: [], // fibonacci
  e: [], // even
  r: []  // random
};

const WINDOW_SIZE = 10;
const BASE_URL = 'http://20.244.56.144/evaluation-service';
const ENDPOINTS: Record<string, string> = {
  p: `${BASE_URL}/primes`,
  f: `${BASE_URL}/fibo`,
  e: `${BASE_URL}/even`,
  r: `${BASE_URL}/rand`
};

// Helper function to update queue
const updateQueue = (queue: number[], newNumbers: number[]): {
  prevState: number[],
  currState: number[],
  addedNumbers: number[]
} => {
  const prevState = [...queue];
  const addedNumbers: number[] = [];

  newNumbers.forEach(num => {
    // Only add if not already in queue
    if (!queue.includes(num)) {
      addedNumbers.push(num);
      queue.push(num);
    }
  });

  // Trim to window size
  while (queue.length > WINDOW_SIZE) {
    queue.shift();
  }

  return {
    prevState,
    currState: [...queue],
    addedNumbers
  };
};

// Calculate average
const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return parseFloat((sum / numbers.length).toFixed(2));
};

// GET /numbers/:numberid endpoint
router.get('/numbers/:numberid', async (req: Request, res: Response) => {
  const { numberid } = req.params;
  
  // Validate numberid
  if (!['p', 'f', 'e', 'r'].includes(numberid)) {
    return res.status(400).json({ error: 'Invalid numberid. Use p, f, e, or r.' });
  }

  try {
    // Fetch data with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 500);
    
    const response = await axios.get(ENDPOINTS[numberid], {
      signal: controller.signal,
      timeout: 500
    });
    
    clearTimeout(timeoutId);
    
    // Process data
    const numbers = response.data.numbers || [];
    const queueUpdate = updateQueue(queues[numberid], numbers);

    // Send response
    res.json({
      windowPrevState: queueUpdate.prevState,
      windowCurrState: queueUpdate.currState,
      numbers: queueUpdate.addedNumbers,
      avg: calculateAverage(queueUpdate.currState)
    });
  } catch (error) {
    console.error(`Error fetching ${numberid} numbers:`, error);
    
    // If we have data in the queue, return it even if the fetch failed
    if (queues[numberid].length > 0) {
      res.json({
        windowPrevState: [...queues[numberid]],
        windowCurrState: [...queues[numberid]],
        numbers: [],
        avg: calculateAverage(queues[numberid])
      });
    } else {
      res.json({
        windowPrevState: [],
        windowCurrState: [],
        numbers: [],
        avg: 0
      });
    }
  }
});

export default router;
