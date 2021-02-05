import React, { FC, useState } from 'react';
import { Meta } from '@storybook/react';

import EditableTableRow from '@e-group/material/EditableTableRow';
import EditableTableCell from '@e-group/material/EditableTableCell';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';

export default {
  title: 'Components/EditableTableRow',
  component: EditableTableRow,
} as Meta;

export const Default: FC = () => {
  const [value, setValue] = useState('test');

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Actions</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <EditableTableRow>
          <EditableTableCell
            viewer={value}
            editor={
              <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            }
          />
          <EditableTableCell
            viewer={value}
            implementation="js"
            editor={
              <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            }
          />
        </EditableTableRow>
      </TableBody>
    </Table>
  );
};
