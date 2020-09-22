import React, { FC, MouseEventHandler, ReactNode } from 'react';

import { PopoverProps, IconButton, RootRef, Popover } from '@material-ui/core';

import TextLoading, { TextLoadingProps } from '@e-group/material/TextLoading';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';

export interface SearchBarBaseProps {
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

export type SearchBarProps = SearchBarBaseProps & TextLoadingProps;

const SearchBar: FC<SearchBarProps> = ({
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
      {renderOptions && (
        <>
          <RootRef rootRef={rootEl}>
            <IconButton onClick={handleDropDownOpen}>
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
            {renderOptions({ handleDropDownOpen, handleDropDownClose })}
          </Popover>
        </>
      )}
    </>
  );
};

export default SearchBar;
