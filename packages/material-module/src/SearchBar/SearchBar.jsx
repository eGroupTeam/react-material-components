import React from 'react';
import PropTypes from 'prop-types';

import Popover from '@material-ui/core/Popover';
import RootRef from '@material-ui/core/RootRef';
import IconButton from '@material-ui/core/IconButton';
import TextLoading from '@e-group/material/TextLoading';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({ container, onSearchClick, renderOptions, ...others }) => {
  const [open, setOpen] = React.useState(false);
  const rootEl = React.useRef(null);

  const handleDropDownOpen = () => {
    setOpen(true);
  };

  const handleDropDownClose = () => {
    setOpen(false);
  };

  const renderFilter = () => {
    if (renderOptions) {
      return (
        <React.Fragment>
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
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            onClose={handleDropDownClose}
          >
            {renderOptions({ handleDropDownOpen, handleDropDownClose })}
          </Popover>
        </React.Fragment>
      );
    }
    return undefined;
  };

  return (
    <React.Fragment>
      <IconButton type="submit" onClick={onSearchClick}>
        <SearchIcon />
      </IconButton>
      <TextLoading {...others} />
      {renderFilter()}
    </React.Fragment>
  );
};

SearchBar.propTypes = {
  /**
   * Popover container.
   */
  container: PropTypes.instanceOf(Element),
  /**
   * A function called when search button is clicked.
   */
  onSearchClick: PropTypes.func,
  /**
   * To customized search options.
   */
  renderOptions: PropTypes.func
};

export default SearchBar;
