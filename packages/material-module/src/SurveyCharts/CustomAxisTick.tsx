import React, { FC } from 'react';

export interface CustomAxisTickProps {
  x: number;
  y: number;
  payload: any;
}

const CustomAxisTick: FC<CustomAxisTickProps> = ({ x, y, payload }) => {
  const texts: string[] = payload.value.match(/.{1,8}/g);
  return (
    <g transform={`translate(${x},${y - (9 + 9 * texts.length)})`}>
      <text
        x="0"
        y="0"
        className="recharts-text"
        text-anchor="end"
        dominant-baseline="middle"
      >
        {texts.map((text, index) => (
          <tspan x="0" dy="18px">
            {text}
          </tspan>
        ))}
      </text>
    </g>
  );
};

export default CustomAxisTick;
