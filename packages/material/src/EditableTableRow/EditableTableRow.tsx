import React, { Children, FC, useState } from 'react';
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
  onSave?: () => void;
  onCancel?: () => void;
}

const EditableTableRow: FC<EditableTableRowProp> = ({
  onSave,
  onCancel,
  children,
}) => {
  const [editing, setEditing] = useState(false);
  const totalCell = Children.toArray(children).length;

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    setEditing(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setEditing(false);
  };

  return (
    <TableRow>
      <EditableTableRowContext.Provider
        value={{
          editing,
          totalCell,
        }}
      >
        <TableCell style={{ width: 100 }}>
          {editing ? (
            <>
              <IconButton onClick={handleSave}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                onClick={() => {
                  setEditing(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </TableCell>
        {children}
      </EditableTableRowContext.Provider>
    </TableRow>
  );
};

export default EditableTableRow;
