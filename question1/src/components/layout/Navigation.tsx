
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChartLine, Grid2X2 } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl">
            Stock Analytics
          </div>
          
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'bg-white bg-opacity-20' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <ChartLine className="mr-2 h-5 w-5" />
              Stock Charts
            </Link>
            
            <Link 
              to="/correlation" 
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/correlation' 
                  ? 'bg-white bg-opacity-20' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Grid2X2 className="mr-2 h-5 w-5" />
              Correlation Heatmap
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
