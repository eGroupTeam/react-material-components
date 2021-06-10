import React, { ElementType, forwardRef, ReactNode, MouseEvent } from 'react';
import clsx from 'clsx';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import useId from '@material-ui/core/utils/unstable_useId';

import {
  createStyles,
  IconButtonProps,
  SelectProps,
  Theme,
} from '@material-ui/core';
import InputBase from '../InputBase';
import MenuItem from '../MenuItem';
import Select from '../Select';
import TableCell from '../TableCell';
import Toolbar from '../Toolbar';
import Typography from '../Typography';
import TablePaginationActions from './TablePaginationActions';

export const styles = (theme: Theme) =>
  createStyles({
    /* Styles applied to the root element. */
    root: {
      color: theme.palette.text.primary,
      fontSize: theme.typography.pxToRem(14),
      overflow: 'auto',
      // Increase the specificity to override TableCell.
      '&:last-child': {
        padding: 0,
      },
    },
    /* Styles applied to the Toolbar component. */
    toolbar: {
      minHeight: 52,
      paddingRight: 2,
    },
    /* Styles applied to the spacer element. */
    spacer: {
      flex: '1 1 100%',
    },
    /* Styles applied to the caption Typography components if `variant="caption"`. */
    caption: {
      flexShrink: 0,
    },
    // TODO v5: `.selectRoot` should be merged with `.input`
    /* Styles applied to the Select component root element. */
    selectRoot: {
      marginRight: 32,
      marginLeft: 8,
    },
    /* Styles applied to the Select component `select` class. */
    select: {
      paddingLeft: 8,
      paddingRight: 24,
      textAlign: 'right',
      textAlignLast: 'right', // Align <select> on Chrome.
    },
    // TODO v5: remove
    /* Styles applied to the Select component `icon` class. */
    selectIcon: {},
    /* Styles applied to the `InputBase` component. */
    input: {
      color: 'inherit',
      fontSize: 'inherit',
      flexShrink: 0,
    },
    /* Styles applied to the MenuItem component. */
    menuItem: {},
    /* Styles applied to the internal `TablePaginationActions` component. */
    actions: {
      flexShrink: 0,
      marginLeft: 20,
    },
  });

export type RowsPerPageOption = number | { label: string; value: string };

export interface TablePaginationProps {
  /**
   * The component used for displaying the actions.
   * Either a string to use a HTML element or a component.
   */
  ActionsComponent?: ElementType;
  /**
   * Props applied to the back arrow [`IconButton`](/api/icon-button/) component.
   */
  backIconButtonProps?: IconButtonProps;
  /**
   * Text label for the back arrow icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  backIconButtonText?: string;
  /**
   * @ignore
   */
  className?: string;
  /**
   * @ignore
   */
  colSpan?: number;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: ElementType;
  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: number;
  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  labelDisplayedRows?: ({ from, to, count, page }) => string;
  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  labelRowsPerPage?: ReactNode;
  /**
   * Props applied to the next arrow [`IconButton`](/api/icon-button/) element.
   */
  nextIconButtonProps?: IconButtonProps;
  /**
   * Text label for the next arrow icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  nextIconButtonText?: string;
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChangePage: (event: MouseEvent<HTMLButtonElement>, page: number) => void;
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {object} event The event source of the callback.
   */
  onChangeRowsPerPage?: SelectProps['onChange'];
  /**
   * The zero-based index of the current page.
   */
  page: number;
  /**
   * The number of rows per page.
   */
  rowsPerPage: number;
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   */
  rowsPerPageOptions?: RowsPerPageOption[];
  /**
   * Props applied to the rows per page [`Select`](/api/select/) element.
   */
  SelectProps?: SelectProps;
}

const defaultLabelDisplayedRows = ({ from, to, count }) =>
  `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`;
const defaultRowsPerPageOptions = [10, 25, 50, 100];

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */
const TablePagination = forwardRef<
  HTMLTableHeaderCellElement,
  TablePaginationProps & WithStyles<typeof styles>
>(function TablePagination(props, ref) {
  const {
    ActionsComponent = TablePaginationActions,
    backIconButtonProps,
    backIconButtonText = 'Previous page',
    classes,
    className,
    colSpan: colSpanProp,
    component: Component = TableCell,
    count,
    labelDisplayedRows = defaultLabelDisplayedRows,
    labelRowsPerPage = 'Rows per page:',
    nextIconButtonProps,
    nextIconButtonText = 'Next page',
    onChangePage,
    onChangeRowsPerPage,
    page,
    rowsPerPage,
    rowsPerPageOptions = defaultRowsPerPageOptions,
    SelectProps = {},
    ...other
  } = props;
  let colSpan;

  if (Component === TableCell || Component === 'td') {
    colSpan = colSpanProp || 1000; // col-span over everything
  }

  const selectId = useId();
  const labelId = useId();
  const MenuItemComponent = SelectProps.native ? 'option' : MenuItem;

  return (
    <TableCell
      className={clsx(classes.root, className)}
      colSpan={colSpan}
      ref={ref}
      {...other}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.spacer} />
        {rowsPerPageOptions.length > 1 && (
          <Typography
            color="inherit"
            variant="body2"
            className={classes.caption}
            id={labelId}
          >
            {labelRowsPerPage}
          </Typography>
        )}
        {rowsPerPageOptions.length > 1 && (
          <Select
            classes={{
              select: classes.select,
              icon: classes.selectIcon,
            }}
            input={
              <InputBase className={clsx(classes.input, classes.selectRoot)} />
            }
            value={rowsPerPage}
            onChange={onChangeRowsPerPage}
            id={selectId}
            labelId={labelId}
            {...SelectProps}
          >
            {rowsPerPageOptions.map((rowsPerPageOption) => (
              <MenuItemComponent
                className={classes.menuItem}
                key={
                  typeof rowsPerPageOption === 'number'
                    ? rowsPerPageOption
                    : rowsPerPageOption.value
                }
                value={
                  typeof rowsPerPageOption === 'number'
                    ? rowsPerPageOption
                    : rowsPerPageOption.value
                }
              >
                {typeof rowsPerPageOption === 'number'
                  ? rowsPerPageOption
                  : rowsPerPageOption.label}
              </MenuItemComponent>
            ))}
          </Select>
        )}
        <Typography color="inherit" variant="body2" className={classes.caption}>
          {labelDisplayedRows({
            from: count === 0 ? 0 : page * rowsPerPage + 1,
            to:
              count !== -1
                ? Math.min(count, (page + 1) * rowsPerPage)
                : (page + 1) * rowsPerPage,
            count: count === -1 ? -1 : count,
            page,
          })}
        </Typography>
        <ActionsComponent
          className={classes.actions}
          backIconButtonProps={{
            title: backIconButtonText,
            'aria-label': backIconButtonText,
            ...backIconButtonProps,
          }}
          count={count}
          nextIconButtonProps={{
            title: nextIconButtonText,
            'aria-label': nextIconButtonText,
            ...nextIconButtonProps,
          }}
          onChangePage={onChangePage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Toolbar>
    </TableCell>
  );
});

export default withStyles(styles, { name: 'EgTablePagination' })(
  TablePagination
);
