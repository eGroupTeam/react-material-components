import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DataList from '@e-group/material-lab/DataList';
import SearchBar from '../SearchBar';

const SearchDataList = ({ onSubmit, title, SearchBarProps, ...other }) => {
  const formEl = React.useRef();
  return (
    <React.Fragment>
      <Box pl={1.5} pr={1.5} pt={1} pb={1}>
        <form onSubmit={onSubmit} ref={formEl}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h6">{title}</Typography>
            </Grid>
            <div style={{ flexGrow: 1 }} />
            <Grid item>
              <SearchBar container={formEl.current} {...SearchBarProps} />
            </Grid>
          </Grid>
        </form>
      </Box>
      <DataList {...other} />
    </React.Fragment>
  );
};

SearchDataList.propTypes = {
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  SearchBarProps: PropTypes.object
};

export default SearchDataList;
