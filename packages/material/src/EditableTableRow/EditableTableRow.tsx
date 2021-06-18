import React, { MouseEvent, Children, forwardRef } from 'react';
import useControlled from '@e-group/hooks/useControlled';
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
  onEdit?: (e: MouseEvent) => void;
  onSave?: (e: MouseEvent) => void;
  onSaveCancel?: (e: MouseEvent) => void;
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
   * Controll editing.
   */
  editing?: boolean;
  /**
   * default editing
   */
  defaultEditing?: boolean;
  /**
   * Controll deleting
   */
  deleting?: boolean;
  /**
   * default deleting
   */
  defaultDeleting?: boolean;
}

const EditableTableRow = forwardRef<HTMLTableRowElement, EditableTableRowProp>(
  (props, ref) => {
    const {
      onEdit,
      onSave,
      onSaveCancel,
      onDelete,
      onDeleteConfirm,
      onDeleteConfirmCancel,
      children,
      localization = {
        deleteMessage: 'Are you sure you want to delete this row?',
      },
      editing: editingProp,
      defaultEditing = false,
      deleting: deletingProp,
      defaultDeleting = false,
      ...other
    } = props;
    const [editing, setEditing] = useControlled({
      controlled: editingProp,
      default: Boolean(defaultEditing),
    });
    const [deleting, setDeleting] = useControlled({
      controlled: deletingProp,
      default: Boolean(defaultDeleting),
    });
    const totalCell = Children.toArray(children).length;

    const handleEdit = (e: MouseEvent) => {
      if (onEdit) {
        onEdit(e);
      }
      setEditing(true);
    };

    const handleSave = (e: MouseEvent) => {
      if (onSave) {
        onSave(e);
      }
      setEditing(false);
    };

    const handleSaveCancel = (e: MouseEvent) => {
      if (onSaveCancel) {
        onSaveCancel(e);
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
      setDeleting(false);
    };

    const handleDeleteConfirmCancel = (e: MouseEvent) => {
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
            <IconButton onClick={handleSaveCancel}>
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
            <IconButton onClick={handleDeleteConfirmCancel}>
              <CloseIcon />
            </IconButton>
          </div>
        );
      }

      return (
        <div style={{ display: 'flex' }}>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      );
    };

    return (
      <TableRow ref={ref} {...other}>
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
  }
);

export default EditableTableRow;
