import { useState, useEffect } from 'react';

const isBrowser = typeof window !== 'undefined';
/**
 * Get window innerWidth and innerHeight when it resize.
 */
export default function useResizeWindow() {
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);
  const [height, setHeight] = useState(isBrowser ? window.innerHeight : 0);

  useEffect(() => {
    const resizer = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', resizer);
    return () => {
      window.removeEventListener('resize', resizer);
    };
  }, []);

  return [width, height];
}
