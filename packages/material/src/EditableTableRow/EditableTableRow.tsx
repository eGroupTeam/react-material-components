import React, { MouseEvent, Children, FC, useState } from 'react';
import {
  IconButton,
  TableCell,
  TableRow,
  TableRowProps,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditableTableRowContext from './EditableTableRowContext';

export interface EditableTableRowProp extends TableRowProps {
  onSave?: (e: MouseEvent) => void;
  onCancel?: (e: MouseEvent) => void;
  onDelete?: (e: MouseEvent) => void;
}

const EditableTableRow: FC<EditableTableRowProp> = ({
  onSave,
  onCancel,
  onDelete,
  children,
}) => {
  const [editing, setEditing] = useState(false);
  const totalCell = Children.toArray(children).length;

  const handleSave = (e: MouseEvent) => {
    if (onSave) {
      onSave(e);
    }
    setEditing(false);
  };

  const handleCancel = (e: MouseEvent) => {
    if (onCancel) {
      onCancel(e);
    }
    setEditing(false);
  };

  const handleDelete = (e: MouseEvent) => {
    if (onDelete) {
      onDelete(e);
    }
  };

  return (
    <TableRow>
      <EditableTableRowContext.Provider
        value={{
          editing,
          totalCell,
        }}
      >
        <TableCell style={{ width: 100 }} padding="none">
          {editing ? (
            <div style={{ display: 'flex' }}>
              <IconButton onClick={handleSave}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            </div>
          ) : (
            <div style={{ display: 'flex' }}>
              <IconButton
                onClick={() => {
                  setEditing(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </TableCell>
        {children}
      </EditableTableRowContext.Provider>
    </TableRow>
  );
};

export default EditableTableRow;
