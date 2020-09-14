import React, { FC } from 'react';

import {
  TableHead as MuiTableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { Question } from './types';

export interface TableHeadProps {
  question: Question;
}

const TableHead: FC<TableHeadProps> = ({ question }) => {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell>答案選項</TableCell>
        <TableCell align="right">填答次數</TableCell>
        <TableCell align="right">百分比</TableCell>
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
