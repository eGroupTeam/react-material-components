import React from 'react';

/**
 * Get window innerWidth and innerHeight when it resize.
 */
export default function useResizeWindow() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {
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
