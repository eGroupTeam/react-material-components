import { useState, useEffect } from 'react';

/**
 * Get window innerWidth and innerHeight when it resize.
 */
export default function useResizeWindow() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

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
