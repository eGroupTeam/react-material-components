import React, { FC } from 'react';

import { ResponsiveContainer, Cell, PieChart, Pie, Tooltip } from 'recharts';
import { makeStyles, Theme } from '@material-ui/core';
import colors from './colors';
import { Option } from './types';
import CustomizedLabelLine from './CustomizedLabelLine';

const CustomizedLabel = (props: any) => {
  const { optionName, optionCount, percent } = props;
  if (percent * 100 < 1) return null;
  return `${optionName}：${optionCount}`;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 24px)',
    minHeight: 300,
  },
}));

export interface OptionListPieChartProps {
  data: Option[];
}

const OptionListPieChart: FC<OptionListPieChartProps> = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="optionCount"
            nameKey="optionName"
            data={data}
            innerRadius={65}
            outerRadius={115}
            fill="#8884d8"
            isAnimationActive={false}
            label={CustomizedLabel}
            labelLine={CustomizedLabelLine}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.optionName}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OptionListPieChart;
