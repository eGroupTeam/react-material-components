import React, { FC } from 'react';

import { ResponsiveContainer } from 'recharts';
import PieChart from './PieChart';
import MultiBarChart from './MultiBarChart';
import { Theme, makeStyles } from '@material-ui/core';
import { Question } from './SurveyCharts';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 24px)',
    minHeight: 300
  }
}));

export interface ChartsProps {
  question: Question;
}

const Charts: FC<ChartsProps> = ({ question }) => {
  const classes = useStyles();

  switch (question.questionType) {
    case 'rating':
    case 'choiceone':
    case 'select': {
      if (question.optionList) {
        const data = question.optionList
          .map(option => ({
            name: option.optionName,
            value: option.optionCount
          }))
          .filter(el => el.value !== 0);
        return (
          <div className={classes.root}>
            <ResponsiveContainer>
              <PieChart data={data} />
            </ResponsiveContainer>
          </div>
        );
      }
      return null;
    }
    case 'choicemulti': {
      if (question.optionList) {
        const data = question.optionList.map(el => ({
          name: el.optionName,
          count: el.optionCount
        }));
        return (
          <div className={classes.root} style={{ top: 56 }}>
            <ResponsiveContainer>
              <MultiBarChart data={data} />
            </ResponsiveContainer>
          </div>
        );
      }
      return null;
    }
    default:
      return null;
  }
};

export default Charts;
