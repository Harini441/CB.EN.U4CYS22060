
import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';
const TIMEOUT = 500; // 500ms timeout

// Service endpoints
const endpoints: { [key: string]: string } = {
  p: `${BASE_URL}/primes`,
  f: `${BASE_URL}/fibo`,
  e: `${BASE_URL}/even`,
  r: `${BASE_URL}/rand`
};

/**
 * Fetches numbers from the appropriate service based on the number type
 */
export async function fetchNumbers(type: string): Promise<number[]> {
  try {
    const response = await axios.get(endpoints[type], {
      timeout: TIMEOUT // Requests taking > 500ms will be aborted
    });
    
    // Validate and return the data
    if (response.data && Array.isArray(response.data.numbers)) {
      return response.data.numbers;
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching ${type} numbers:`, error);
    // For timeouts or other errors, return empty array
    return [];
  }
}
