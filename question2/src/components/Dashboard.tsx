
import React from 'react';
import NumberCard from './NumberCard';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Average Calculator Microservice</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NumberCard 
          title="Prime Numbers" 
          description="Sequence of prime numbers" 
          numberType="p" 
        />
        <NumberCard 
          title="Fibonacci Numbers" 
          description="Fibonacci sequence" 
          numberType="f" 
        />
        <NumberCard 
          title="Even Numbers" 
          description="Sequence of even numbers" 
          numberType="e" 
        />
        <NumberCard 
          title="Random Numbers" 
          description="Random number sequence" 
          numberType="r" 
        />
      </div>
      
      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">API Documentation</h2>
          <p className="mb-2">Endpoint: <code className="bg-gray-100 p-1 rounded">GET /api/numbers/:numberid</code></p>
          <p className="mb-4">Where <code className="bg-gray-100 p-1 rounded">:numberid</code> is one of: p (primes), f (fibonacci), e (even), r (random)</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">Response Format:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
{`{
  "windowPrevState": [/* previous window state */],
  "windowCurrState": [/* current window state */],
  "numbers": [/* newly fetched numbers */],
  "avg": 0.00
}`}
          </pre>
        </CardContent>
      </Card>
      
      <footer className="mt-8 text-center text-gray-500">
        <p>GitHub Repository: <a href="https://github.com/Harini441/CB.EN.U4CYS22060" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">CB.EN.U4CYS22060</a></p>
        <p>Amrita Vishwa Vidyapeetham, Coimbatore</p>
      </footer>
    </div>
  );
};

export default Dashboard;
