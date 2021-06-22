import React, { forwardRef, HTMLAttributes, MouseEventHandler } from 'react';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import useTheme from '@material-ui/core/styles/useTheme';
import IconButton, { IconButtonProps } from '../IconButton';

export interface TablePaginationActionsProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Props applied to the back arrow [`IconButton`](/api/icon-button/) element.
   */
  backIconButtonProps?: IconButtonProps;
  /**
   * The total number of rows.
   */
  count: number;
  /**
   * Props applied to the next arrow [`IconButton`](/api/icon-button/) element.
   */
  nextIconButtonProps?: IconButtonProps;
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChangePage: (
    event: MouseEventHandler<HTMLButtonElement>,
    page: number
  ) => void;
  /**
   * The zero-based index of the current page.
   */
  page: number;
  /**
   * The number of rows per page.
   */
  rowsPerPage: number;
}

const TablePaginationActions = forwardRef<
  HTMLDivElement,
  TablePaginationActionsProps
>((props, ref) => {
  const {
    backIconButtonProps,
    count,
    nextIconButtonProps,
    onChangePage,
    page,
    rowsPerPage,
    ...other
  } = props;

  const theme = useTheme();

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  return (
    <div ref={ref} {...other}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        color="inherit"
        {...backIconButtonProps}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={
          count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false
        }
        color="inherit"
        {...nextIconButtonProps}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </div>
  );
});

export default TablePaginationActions;
