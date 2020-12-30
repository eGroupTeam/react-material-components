import React, { forwardRef, useEffect, useState, ReactNode } from 'react';

import { History, Location } from 'history';
import {
  Box,
  Fade,
  FadeProps,
  ToolbarProps,
  IconButtonProps,
  AppBarProps,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export interface BackAppbarProps extends AppBarProps {
  history: History;
  location: Location;
  fadeIn?: boolean;
  backPath?: string;
  backIcon?: ReactNode;
  children?: ReactNode;
  MuiFadeProps?: FadeProps;
  MuiToolbarProps?: ToolbarProps;
  MuiIconButtonProps?: IconButtonProps;
}

const BackAppbar = forwardRef<unknown, BackAppbarProps>(function BackAppbar(
  props,
  ref
) {
  const {
    history,
    location,
    fadeIn = true,
    backIcon = <ArrowBackIcon />,
    children,
    MuiFadeProps,
    MuiToolbarProps,
    MuiIconButtonProps,
    backPath,
    ...other
  } = props;
  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    setPointer((val) => val + 1);
  }, [location]);

  return (
    <Fade in={fadeIn} {...MuiFadeProps} ref={ref}>
      <AppBar {...other}>
        <Toolbar {...MuiToolbarProps}>
          <Box mr={2}>
            <IconButton
              onClick={() => {
                if (backPath) {
                  history.push(backPath);
                } else {
                  history.go(-pointer);
                }
              }}
              color="inherit"
              edge="start"
              {...MuiIconButtonProps}
            >
              {backIcon}
            </IconButton>
          </Box>
          {children}
        </Toolbar>
      </AppBar>
    </Fade>
  );
});

export default BackAppbar;
