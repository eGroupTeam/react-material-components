import React, { FC } from 'react';

import Grid from '@material-ui/core/Grid';
import Section from './Section';
import { Question } from './types';

export interface SurveyChartsProps {
  data: Question[];
  totalResponses: number;
}

const SurveyCharts: FC<SurveyChartsProps> = ({ data, totalResponses }) => {
  return (
    <Grid container spacing={2}>
      {data.map((question) => (
        <Grid key={question.questionId} item xs={12}>
          <Section question={question} totalResponses={totalResponses} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SurveyCharts;
