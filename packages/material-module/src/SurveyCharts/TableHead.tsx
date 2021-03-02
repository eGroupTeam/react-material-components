import React, { FC } from 'react';

import {
  TableHead as MuiTableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';

const TableHead: FC = () => {
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
