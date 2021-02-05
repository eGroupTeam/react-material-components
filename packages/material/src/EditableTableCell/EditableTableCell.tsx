import { TableCell } from '@material-ui/core';
import React, { FC, ReactNode, useContext } from 'react';
import EditableTableRowContext from '../EditableTableRow/EditableTableRowContext';

export interface EditableTableCellProps {
  value?: string | number;
  editor: ReactNode;
  /**
   * How to implementation hide.
   */
  implementation?: 'css' | 'js';
}

const EditableTableCell: FC<EditableTableCellProps> = (props) => {
  const { value, editor, implementation = 'css' } = props;
  const { editing, totalCell } = useContext(EditableTableRowContext);

  if (implementation === 'js') {
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
  }

  return (
    <>
      <TableCell
        style={{
          width: `calc((100% - 100px) / ${totalCell})`,
          padding: '10px 16px',
          display: editing ? 'table-cell' : 'none',
        }}
      >
        {editor}
      </TableCell>
      <TableCell
        style={{
          width: `calc((100% - 100px) / ${totalCell})`,
          display: editing ? 'none' : 'table-cell',
        }}
      >
        {value}
      </TableCell>
    </>
  );
};

export default EditableTableCell;
