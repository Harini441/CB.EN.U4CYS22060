
const WINDOW_SIZE = 10;

/**
 * Updates a queue with new numbers, maintaining FIFO with no duplicates
 * and respecting the window size
 */
export function updateQueue(queue: number[], newNumbers: number[]): number[] {
  // Create a copy of the existing queue
  const updatedQueue = [...queue];
  
  // Add each new number if it's not already in the queue
  for (const num of newNumbers) {
    if (!updatedQueue.includes(num)) {
      updatedQueue.push(num);
    }
  }
  
  // If the queue exceeds the window size, remove oldest items
  while (updatedQueue.length > WINDOW_SIZE) {
    updatedQueue.shift();
  }
  
  return updatedQueue;
}

/**
 * Calculates the average of numbers in the queue
 */
export function calculateAverage(queue: number[]): number {
  if (queue.length === 0) return 0;
  
  const sum = queue.reduce((total, num) => total + num, 0);
  return sum / queue.length;
}
