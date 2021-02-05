import { TableCell } from '@material-ui/core';
import React, { FC, ReactNode, useContext } from 'react';
import EditableTableRowContext from '../EditableTableRow/EditableTableRowContext';

export interface EditableTableCellProps {
  value?: string | number;
  editor: ReactNode;
}

const EditableTableCell: FC<EditableTableCellProps> = ({ value, editor }) => {
  const { editing, totalCell } = useContext(EditableTableRowContext);

  if (editing) {
    return (
      <TableCell
        style={{
          width: `calc((100% - 100px) / ${totalCell})`,
          padding: '10px 16px',
        }}
      >
        {editor}
      </TableCell>
    );
  }
  return (
    <TableCell style={{ width: `calc((100% - 100px) / ${totalCell})` }}>
      {value}
    </TableCell>
  );
};

export default EditableTableCell;
