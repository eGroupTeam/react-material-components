import React from 'react';

const CustomAxisTick = ({ x, y, payload }) => {
  const texts = payload.value.match(/.{1,8}/g);
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
