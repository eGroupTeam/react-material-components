import React, { forwardRef, ReactNode, useContext } from 'react';
import {
  createStyles,
  TableCell,
  TableCellProps,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import EditableTableRowContext from '../EditableTableRow/EditableTableRowContext';

export interface EditableTableCellProps extends TableCellProps {
  viewer?: ReactNode;
  editor: ReactNode;
  /**
   * How to implementation hide.
   */
  implementation?: 'css' | 'js';
}

const styles = () =>
  createStyles({
    editor: {
      padding: '10px 16px',
    },
    hide: {
      display: 'none',
    },
  });

const EditableTableCell = forwardRef<
  unknown,
  EditableTableCellProps & WithStyles<typeof styles>
>((props, ref) => {
  const {
    className,
    classes,
    viewer,
    editor,
    implementation = 'css',
    style,
    ...other
  } = props;
  const { editing, totalCell } = useContext(EditableTableRowContext);

  const width = `calc((100% - 100px) / ${totalCell})`;

  if (implementation === 'js') {
    return (
      <TableCell
        ref={ref}
        className={clsx(className, editing && classes.editor)}
        style={{
          width,
          ...style,
        }}
        {...other}
      >
        {editing ? editor : viewer}
      </TableCell>
    );
  }

  return (
    <TableCell
      ref={ref}
      className={clsx(className, editing && classes.editor)}
      style={{
        width,
        ...style,
      }}
      {...other}
    >
      <div className={clsx(!editing && classes.hide)}>{editor}</div>
      <div className={clsx(editing && classes.hide)}>{viewer}</div>
    </TableCell>
  );
});

export default withStyles(styles)(EditableTableCell);
