import React, { FC, FormEventHandler, ReactNode, useRef } from 'react';

import {
  createStyles,
  Grid,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import DataList, { VariantListProps, VariantTableProps } from '../DataList';
import SearchBar, { SearchBarProps } from '../SearchBar';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 1.5),
    },
    toolsbar: {
      display: 'flex',
      alignItems: 'center',
    },
  });

export interface SearchDataListBaseProps extends WithStyles<typeof styles> {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  title?: string;
  toolsbar?: ReactNode;
  SearchBarProps?: SearchBarProps;
}

export interface SearchDataVariantListProps
  extends SearchDataListBaseProps,
    Omit<VariantListProps, 'classes' | 'onSubmit'> {
  /**
   * The variant to use.
   */
  variant: 'list';
}
export interface SearchDataVariantTableProps
  extends SearchDataListBaseProps,
    Omit<VariantTableProps, 'classes' | 'onSubmit'> {
  /**
   * The variant to use.
   */
  variant?: 'table';
}

export type SearchDataListProps =
  | SearchDataVariantListProps
  | SearchDataVariantTableProps;

const SearchDataList: FC<SearchDataListProps> = (props) => {
  const {
    classes,
    onSubmit,
    title,
    toolsbar,
    SearchBarProps,
    ...other
  } = props;
  const formEl = useRef(null);

  return (
    <>
      <div className={classes.root}>
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
      </div>
      <DataList {...other} />
    </>
  );
};

export default withStyles(styles)(SearchDataList);
