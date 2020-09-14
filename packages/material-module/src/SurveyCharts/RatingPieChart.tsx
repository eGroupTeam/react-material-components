import React, { FC } from 'react';

import { ResponsiveContainer, Cell, PieChart, Pie, Tooltip } from 'recharts';
import { makeStyles, Theme } from '@material-ui/core';
import colors from './colors';
import { ResponseContent } from './SurveyCharts';
import CustomizedLabelLine from './CustomizedLabelLine';

const CustomizedLabel = (props: any) => {
  const { responseContent, responseContentCount, percent } = props;
  if (percent * 100 < 1) return null;
  return `${responseContent}分：${responseContentCount}`;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 24px)',
    minHeight: 300,
  },
}));

export interface RatingPieChartProps {
  data: ResponseContent[];
}

const RatingPieChart: FC<RatingPieChartProps> = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="responseContentCount"
            nameKey="responseContent"
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
                key={entry.responseContent}
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

export default RatingPieChart;
