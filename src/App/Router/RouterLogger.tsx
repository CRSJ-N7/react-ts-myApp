import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function useRouterLogger() {
  const location = useLocation();

  useEffect(() => {
    console.log('Route changed to:', location.pathname, location);
  }, [location]);
}

