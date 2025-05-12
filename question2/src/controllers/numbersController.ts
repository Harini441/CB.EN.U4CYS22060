
import { Request, Response } from 'express';
import { fetchNumbers } from '../services/numberService';
import { updateQueue, calculateAverage } from '../utils/queueUtils';

// Store queues for each number type
const queues: { [key: string]: number[] } = {
  p: [], // primes
  f: [], // fibonacci
  e: [], // even
  r: []  // random
};

export async function getNumbersById(req: Request, res: Response) {
  const { numberid } = req.params;
  
  // Validate numberid parameter
  if (!['p', 'f', 'e', 'r'].includes(numberid)) {
    return res.status(400).json({ error: 'Invalid numberid. Must be one of: p, f, e, r' });
  }

  try {
    // Get the current queue before updates
    const windowPrevState = [...queues[numberid]];

    // Fetch new numbers from the appropriate service
    const numbers = await fetchNumbers(numberid);

    // Update the queue with new numbers
    const windowCurrState = updateQueue(queues[numberid], numbers);
    
    // Calculate the average
    const avg = calculateAverage(windowCurrState);

    // Send the response
    res.json({
      windowPrevState,
      windowCurrState,
      numbers,
      avg: parseFloat(avg.toFixed(2))
    });
  } catch (error) {
    console.error(`Error processing request for ${numberid}:`, error);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
