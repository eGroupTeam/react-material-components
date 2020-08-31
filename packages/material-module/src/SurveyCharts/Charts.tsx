import React, { FC } from 'react';

import sortOptionCount from './sortOptionCount';

import PieChart from './PieChart';
import MultiBarChart from './MultiBarChart';
import { Typography } from '@material-ui/core';
import { Question } from './SurveyCharts';
export interface ChartsProps {
  question: Question;
}

const Charts: FC<ChartsProps> = ({ question }) => {
  switch (question.questionType) {
    case 'rating':
    case 'choiceone':
    case 'select': {
      if (question.optionList) {
        const data = question.optionList.filter(el => el.optionCount !== 0);
        return <PieChart data={data} />;
      }
      return (
        <Typography variant="body1" align="center">
          No Data
        </Typography>
      );
    }
    case 'choicemulti': {
      if (question.optionList) {
        const data = question.optionList.sort(sortOptionCount);
        return <MultiBarChart data={data} />;
      }
      return (
        <Typography variant="body1" align="center">
          No Data
        </Typography>
      );
    }
    default:
      return (
        <Typography variant="body1" align="center">
          No Data
        </Typography>
      );
  }
};

export default Charts;
