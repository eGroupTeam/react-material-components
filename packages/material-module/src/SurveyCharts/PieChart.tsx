import React, { FC } from 'react';

import colors from './colors';

import { Cell, PieChart as RcPieChart, Pie, Tooltip } from 'recharts';

export type DataCell = {
  name: string;
  value: number;
};
export interface PieChartProps {
  data: DataCell[];
}

const PieChart: FC<PieChartProps> = ({ data }) => {
  return (
    <RcPieChart>
      <Pie
        dataKey="value"
        data={data}
        innerRadius={65}
        outerRadius={115}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </RcPieChart>
  );
};

export default PieChart;
