import React from 'react';

import { Text } from 'recharts';

const CustomAxisTick = ({ x, y, payload }) => {
  if (payload.value.length > 9) {
    return (
      <g transform={`translate(${x},${y})`}>
        <Text textAnchor="end" width={150} scaleToFit>
          {payload.value}
        </Text>
      </g>
    );
  }
  return (
    <g transform={`translate(${x},${y})`}>
      <Text textAnchor="end">{payload.value}</Text>
    </g>
  );
};

export default CustomAxisTick;
