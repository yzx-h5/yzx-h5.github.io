import React, { createContext, useContext, useState, ReactNode } from 'react';
import './index.scss'
interface LoadingContextProps {
  children: ReactNode;
}

interface LoadingContextValue {
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within an LoadingProvider');
  }
  return context;
};

export const LoadingProvider: React.FC<LoadingContextProps> = ({ children }) => {
  const [LoadingData, setLoadingData] = useState<Boolean>(false);

  const startLoading = () => {
    setLoadingData(true);
  };

  const stopLoading = () => {
    setLoadingData(false);
  };

  return (
    <LoadingContext.Provider value={ { startLoading, stopLoading } }>
      { children }
      { LoadingData && (
        <div className='loading-body'>
          <div className="loader-1"></div>
        </div>
      ) }
    </LoadingContext.Provider>
  );
};
