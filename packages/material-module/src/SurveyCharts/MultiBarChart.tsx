import React, { FC } from 'react';

import {
  ResponsiveContainer,
  Cell,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar
} from 'recharts';
import colors from './colors';
import { makeStyles, Theme } from '@material-ui/core';
import { Option } from './SurveyCharts';

export interface MultiBarChartProps {
  data: Option[];
}

const CustomAxisTick = (props: any) => {
  const { x, y, payload } = props;
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 24px)',
    minHeight: 300
  }
}));

const MultiBarChart: FC<MultiBarChartProps> = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ top: 56 }}>
      <ResponsiveContainer>
        <BarChart
          margin={{
            left: 100
          }}
          layout="vertical"
          data={data}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis tick={CustomAxisTick} dataKey="optionName" type="category" />
          <Tooltip />
          <Bar dataKey="optionCount" name="填答次數">
            {data.map((entry, index) => (
              <Cell
                key={entry.optionName}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MultiBarChart;
