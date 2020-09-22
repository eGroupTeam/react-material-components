import React, { FC, MouseEventHandler, ReactNode } from 'react';

import {
  createStyles,
  WithStyles,
  withStyles,
  PopoverProps,
  IconButton,
  RootRef,
  Popover,
} from '@material-ui/core';
import clsx from 'clsx';

import TextLoading from '@e-group/material/TextLoading';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';

const styles = createStyles({
  hide: {
    display: 'none',
  },
});

export interface SearchBarProps extends WithStyles<typeof styles> {
  /**
   * Popover container.
   */
  container: PopoverProps['container'];
  /**
   * A function called when search button is clicked.
   */
  onSearchClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * To customized search options.
   */
  renderOptions?: ({ handleDropDownOpen, handleDropDownClose }) => ReactNode;
}

const SearchBar: FC<SearchBarProps> = ({
  classes,
  container,
  onSearchClick,
  renderOptions,
  ...others
}) => {
  const [open, setOpen] = React.useState(false);
  const rootEl = React.useRef(null);

  const handleDropDownOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleDropDownClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <IconButton type="submit" onClick={onSearchClick}>
        <SearchIcon />
      </IconButton>
      <TextLoading {...others} />
      <RootRef rootRef={rootEl}>
        <IconButton
          onClick={handleDropDownOpen}
          className={clsx({
            [classes.hide]: !renderOptions,
          })}
        >
          <FilterListIcon />
        </IconButton>
      </RootRef>
      <Popover
        open={open}
        container={container}
        anchorEl={rootEl.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleDropDownClose}
      >
        {renderOptions &&
          renderOptions({ handleDropDownOpen, handleDropDownClose })}
      </Popover>
    </>
  );
};

export default withStyles(styles)(SearchBar);
