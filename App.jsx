import React, { useState, useEffect } from 'react';
import LoadingScreen from './src/views/loading/LoadingScreen';
import RootNavigator from './src/routes/RootNavigator';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return <RootNavigator />;
  
}

export default App;