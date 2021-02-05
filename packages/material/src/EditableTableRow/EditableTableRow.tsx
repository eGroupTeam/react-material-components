import React, { MouseEvent, Children, FC, useState } from 'react';
import {
  IconButton,
  TableCell,
  TableRow,
  TableRowProps,
  Typography,
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
  onDeleteConfirm?: (e: MouseEvent) => void;
  onDeleteConfirmCancel?: (e: MouseEvent) => void;
  /**
   * Use your own text to localize EditableTableRow.
   */
  localization?: {
    deleteMessage: string;
  };
  /**
   * default editing
   */
  editing?: boolean;
  /**
   * default deleting
   */
  deleting?: boolean;
}

const EditableTableRow: FC<EditableTableRowProp> = ({
  onSave,
  onCancel,
  onDelete,
  onDeleteConfirm,
  onDeleteConfirmCancel,
  children,
  localization = {
    deleteMessage: 'Are you sure you want to delete this row?',
  },
  editing: editingProp = false,
  deleting: deletingProp = false,
}) => {
  const [editing, setEditing] = useState(editingProp);
  const [deleting, setDeleting] = useState(deletingProp);
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
    setDeleting(true);
  };

  const handleDeleteConfirm = (e: MouseEvent) => {
    if (onDeleteConfirm) {
      onDeleteConfirm(e);
    }
  };

  const handleDeleteCancel = (e: MouseEvent) => {
    if (onDeleteConfirmCancel) {
      onDeleteConfirmCancel(e);
    }
    setDeleting(false);
  };

  const renderActions = () => {
    if (editing) {
      return (
        <div style={{ display: 'flex' }}>
          <IconButton onClick={handleSave}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </div>
      );
    }

    if (deleting) {
      return (
        <div style={{ display: 'flex' }}>
          <IconButton onClick={handleDeleteConfirm}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleDeleteCancel}>
            <CloseIcon />
          </IconButton>
        </div>
      );
    }

    return (
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
    );
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
          {renderActions()}
        </TableCell>
        {deleting ? (
          <TableCell colSpan={totalCell}>
            <Typography color="secondary">
              <strong>{localization.deleteMessage}</strong>
            </Typography>
          </TableCell>
        ) : (
          children
        )}
      </EditableTableRowContext.Provider>
    </TableRow>
  );
};

export default EditableTableRow;
