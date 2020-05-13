import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DataList from '../DataList';
import SearchBar from '../SearchBar';

const styles = theme => ({
  toolsbar: {
    display: 'flex',
    alignItems: 'center'
  }
});

const useStyles = makeStyles(styles);

const SearchDataList = props => {
  const { onSubmit, title, toolsbar, SearchBarProps, ...other } = props;
  const classes = useStyles(props);
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
              <div className={classes.toolsbar}>
                <SearchBar container={formEl.current} {...SearchBarProps} />
                {toolsbar}
              </div>
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
  toolsbar: PropTypes.node,
  SearchBarProps: PropTypes.object
};

export default SearchDataList;
