import React, { Children, FC, useState } from 'react';
import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const styles = () => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  detailCell: { paddingBottom: 0, paddingTop: 0 },
});

export interface DataTableCollapseRowProps {
  /**
   * Set detail cell colSpan.
   */
  colSpan: number;
}

const DataTableCollapseRow: FC<
  DataTableCollapseRowProps & WithStyles<typeof styles>
> = ({ classes, children, colSpan }) => {
  const [open, setOpen] = useState(false);
  const [cells, detail] = Children.toArray(children);

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {cells}
      </TableRow>
      <TableRow>
        <TableCell className={classes.detailCell} colSpan={colSpan + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {detail}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default withStyles(styles)(DataTableCollapseRow);
