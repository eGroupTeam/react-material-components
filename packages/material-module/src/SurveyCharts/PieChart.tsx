import React, { FC } from 'react';

import colors from './colors';

import {
  ResponsiveContainer,
  Cell,
  PieChart as RcPieChart,
  Pie,
  Tooltip,
  Curve
} from 'recharts';
import { makeStyles, Theme } from '@material-ui/core';
import { Option } from './SurveyCharts';
export interface PieChartProps {
  data: Option[];
}

const CustomizedLabel = (props: any) => {
  const { optionName, optionCount, percent } = props;
  if (percent * 100 < 1) return null;
  return `${optionName}：${optionCount}`;
};

const CustomizedLabelLine = (props: any) => {
  const { percent } = props;
  if (percent * 100 < 1) return false;
  return <Curve {...props} type="linear" className="recharts-pie-label-line" />;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 24px)',
    minHeight: 300
  }
}));

const PieChart: FC<PieChartProps> = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ResponsiveContainer>
        <RcPieChart>
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
        </RcPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
