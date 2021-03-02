import React, { FC } from 'react';

import { Table as MuiTable, makeStyles } from '@material-ui/core';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { Question } from './types';

const useStyles = makeStyles({
  root: {
    overflowX: 'auto',
  },
  table: {
    whiteSpace: 'nowrap',
  },
});

export interface TableProps {
  question: Question;
  totalResponses: number;
}

const Table: FC<TableProps> = ({ question, totalResponses }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MuiTable className={classes.table}>
        <TableHead />
        <TableBody question={question} totalResponses={totalResponses} />
      </MuiTable>
    </div>
  );
};

export default Table;
