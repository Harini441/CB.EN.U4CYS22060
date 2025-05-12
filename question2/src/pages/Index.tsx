
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NumberDisplay from '@/components/NumberDisplay';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Calculator, Plus, Minus, Asterisk, Divide } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('demo');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const fetchNumbers = async (type: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/numbers/${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl md:text-3xl font-bold">Average Calculator Microservice</CardTitle>
          <CardDescription className="text-white/90">
            A Node.js/Express microservice for calculating averages from different number sources
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="demo" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="demo">Demo</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="demo" className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Plus className="h-5 w-5 text-green-600" />
                      Prime Numbers
                    </CardTitle>
                    <CardDescription>Get the latest prime numbers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-end gap-4">
                        <Button 
                          onClick={() => fetchNumbers('p')}
                          variant="outline"
                          className="border-green-500 text-green-700 hover:bg-green-50"
                          disabled={loading}
                        >
                          Fetch Primes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Minus className="h-5 w-5 text-blue-600" />
                      Fibonacci Numbers
                    </CardTitle>
                    <CardDescription>Get the latest Fibonacci sequence numbers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-end gap-4">
                        <Button 
                          onClick={() => fetchNumbers('f')}
                          variant="outline"
                          className="border-blue-500 text-blue-700 hover:bg-blue-50"
                          disabled={loading}
                        >
                          Fetch Fibonacci
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Asterisk className="h-5 w-5 text-purple-600" />
                      Even Numbers
                    </CardTitle>
                    <CardDescription>Get the latest even numbers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-end gap-4">
                        <Button 
                          onClick={() => fetchNumbers('e')}
                          variant="outline"
                          className="border-purple-500 text-purple-700 hover:bg-purple-50"
                          disabled={loading}
                        >
                          Fetch Even
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Divide className="h-5 w-5 text-amber-600" />
                      Random Numbers
                    </CardTitle>
                    <CardDescription>Get some random numbers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-end gap-4">
                        <Button 
                          onClick={() => fetchNumbers('r')}
                          variant="outline"
                          className="border-amber-500 text-amber-700 hover:bg-amber-50"
                          disabled={loading}
                        >
                          Fetch Random
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {loading && (
                <div className="text-center py-4">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                  <p className="mt-2 text-gray-600">Fetching data...</p>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  Error: {error}
                </div>
              )}
              
              {result && !loading && (
                <NumberDisplay result={result} />
              )}
              
              {!result && !loading && !error && (
                <div className="text-center py-8 text-gray-500">
                  Click one of the buttons above to fetch numbers
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><span className="font-medium">Name:</span> Shree Harini T</p>
                  <p><span className="font-medium">Email:</span> cb.en.u4cys22060@cb.students.amrita.edu</p>
                  <p><span className="font-medium">Roll No:</span> CB.EN.U4CYS22060</p>
                  <p><span className="font-medium">Mobile:</span> 7339308981</p>
                </div>
                <div>
                  <p><span className="font-medium">GitHub:</span> Harini441</p>
                  <p><span className="font-medium">College:</span> Amrita Vishwa Vidyapeetham, Coimbatore</p>
                  <p><span className="font-medium">Access Code:</span> SwuuKE</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6">API Endpoint</h3>
              <p className="font-mono bg-gray-100 p-3 rounded">GET /numbers/:numberid</p>
              <p>Where <code>numberid</code> is one of: p (primes), f (fibonacci), e (even), r (random)</p>
              
              <h3 className="text-xl font-semibold mt-6">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Maintains a FIFO queue with window size of 10</li>
                <li>No duplicates in the queue</li>
                <li>Fetches from multiple data sources</li>
                <li>Discards responses that take more than 500ms</li>
                <li>Fast response time</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="bg-gray-50 px-6 py-4 text-sm text-gray-600 rounded-b-lg">
          <p>© 2025 Shree Harini T - Average Calculator Microservice</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
