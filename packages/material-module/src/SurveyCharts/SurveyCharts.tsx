import React, { forwardRef } from 'react';

import { Grid, GridProps } from '@material-ui/core';
import Section from './Section';
import { Question } from './types';

export interface SurveyChartsProps {
  data: Question[];
  totalResponses: number;
  GridItemProps?: GridProps;
}

const SurveyCharts = forwardRef<HTMLDivElement, SurveyChartsProps>(
  function SurveyCharts(props, ref) {
    const { data, totalResponses, GridItemProps } = props;

    return (
      <Grid container spacing={2} ref={ref}>
        {data.map((question) => (
          <Grid key={question.questionId} item xs={12} {...GridItemProps}>
            <Section question={question} totalResponses={totalResponses} />
          </Grid>
        ))}
      </Grid>
    );
  }
);

export default SurveyCharts;
