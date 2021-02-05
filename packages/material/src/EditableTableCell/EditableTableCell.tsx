import { TableCell } from '@material-ui/core';
import React, { FC, ReactNode, useContext } from 'react';
import EditableTableRowContext from '../EditableTableRow/EditableTableRowContext';

export interface EditableTableCellProps {
  viewer?: ReactNode;
  editor: ReactNode;
  /**
   * How to implementation hide.
   */
  implementation?: 'css' | 'js';
}

const EditableTableCell: FC<EditableTableCellProps> = (props) => {
  const { viewer, editor, implementation = 'css' } = props;
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
        {viewer}
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
        {viewer}
      </TableCell>
    </>
  );
};

export default EditableTableCell;
