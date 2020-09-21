import React, { forwardRef } from 'react';

import Grid from '@material-ui/core/Grid';
import Section from './Section';
import { Question } from './types';

export interface SurveyChartsProps {
  data: Question[];
  totalResponses: number;
}

const SurveyCharts = forwardRef<HTMLDivElement, SurveyChartsProps>(
  function SurveyCharts(props, ref) {
    const { data, totalResponses } = props;

    return (
      <Grid container spacing={2} ref={ref}>
        {data.map((question) => (
          <Grid key={question.questionId} item xs={12}>
            <Section question={question} totalResponses={totalResponses} />
          </Grid>
        ))}
      </Grid>
    );
  }
);

export default SurveyCharts;
