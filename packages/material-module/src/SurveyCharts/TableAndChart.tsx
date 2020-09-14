import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { Question } from './types';
import Charts from './Charts';
import Table from './Table';

export interface TableAndChartProps {
  question: Question;
  totalResponses: number;
}

const TableAndChart: FC<TableAndChartProps> = ({
  question,
  totalResponses,
}) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Table question={question} totalResponses={totalResponses} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Charts question={question} />
      </Grid>
    </>
  );
};

export default TableAndChart;
