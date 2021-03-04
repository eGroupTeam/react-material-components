import { useState, useEffect } from 'react';

/**
 * Get window innerWidth and innerHeight when it resize.
 */
export default function useResizeWindow() {
  const [width, setWidth] = useState(window ? window.innerWidth : 0);
  const [height, setHeight] = useState(window ? window.innerHeight : 0);

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
