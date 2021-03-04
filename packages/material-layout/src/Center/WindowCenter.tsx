import React, { FC, HTMLAttributes, useEffect, useState } from 'react';

export interface WindowCenterProps extends HTMLAttributes<HTMLDivElement> {
  classes: any;
  offsetTop?: number;
}

const WindowCenter: FC<WindowCenterProps> = ({
  classes,
  offsetTop = 0,
  style,
  ...other
}) => {
  const [height, setHeight] = useState<number>(window.innerHeight - offsetTop);

  useEffect(() => {
    const resizer = () => {
      setHeight(window.innerHeight - offsetTop);
    };
    window.addEventListener('resize', resizer);
    return () => {
      window.removeEventListener('resize', resizer);
    };
  }, [offsetTop]);

  useEffect(() => {
    setHeight(window.innerHeight - offsetTop);
  }, [offsetTop]);

  return (
    <div
      className={classes.root}
      style={{
        ...style,
        height,
      }}
      {...other}
    />
  );
};

export default WindowCenter;
