import React, { FC } from 'react';

import {
  Cell,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar
} from 'recharts';
import CustomAxisTick from './CustomAxisTick';
import colors from './colors';

export type DataCell = {
  name: string;
  count: number;
};
export interface MultiBarChartProps {
  data: DataCell[];
}

const MultiBarChart: FC<MultiBarChartProps> = ({ data }) => {
  return (
    <BarChart
      margin={{
        left: 100
      }}
      layout="vertical"
      data={data}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis type="number" />
      <YAxis
        tick={props => <CustomAxisTick {...props} />}
        dataKey="name"
        type="category"
      />
      <Tooltip />
      <Bar dataKey="count">
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default MultiBarChart;
