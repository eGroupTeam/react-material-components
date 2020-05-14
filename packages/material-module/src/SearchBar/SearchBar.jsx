import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Popover from '@material-ui/core/Popover';
import RootRef from '@material-ui/core/RootRef';
import IconButton from '@material-ui/core/IconButton';
import TextLoading from '@e-group/material/TextLoading';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  hide: {
    display: 'none'
  }
});

const SearchBar = ({
  classes,
  container,
  onSearchClick,
  renderOptions,
  ...others
}) => {
  const [open, setOpen] = React.useState(false);
  const rootEl = React.useRef(null);
  const hasOptions = !!renderOptions;

  const handleDropDownOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleDropDownClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <React.Fragment>
      <IconButton type="submit" onClick={onSearchClick}>
        <SearchIcon />
      </IconButton>
      <TextLoading {...others} />
      <RootRef rootRef={rootEl}>
        <IconButton
          onClick={handleDropDownOpen}
          className={clsx({
            [classes.hide]: !hasOptions
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
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={handleDropDownClose}
      >
        {hasOptions &&
          renderOptions({ handleDropDownOpen, handleDropDownClose })}
      </Popover>
    </React.Fragment>
  );
};

SearchBar.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(SearchBar);
