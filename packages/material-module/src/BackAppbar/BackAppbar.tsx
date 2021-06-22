import React, { forwardRef, useEffect, useState, ReactNode } from 'react';

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
  push: (backPath: string) => void;
  go: (pointer: number) => void;
  pointerTrigger: any;
  fadeIn?: boolean;
  backPath?: string;
  backIcon?: ReactNode;
  children?: ReactNode;
  MuiFadeProps?: FadeProps;
  MuiToolbarProps?: ToolbarProps;
  MuiIconButtonProps?: IconButtonProps;
}

const BackAppbar = forwardRef<unknown, BackAppbarProps>((
  props,
  ref
) => {
  const {
    pointerTrigger,
    fadeIn = true,
    backIcon = <ArrowBackIcon />,
    children,
    MuiFadeProps,
    MuiToolbarProps,
    MuiIconButtonProps,
    backPath,
    push,
    go,
    ...other
  } = props;
  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    setPointer((val) => val + 1);
  }, [pointerTrigger]);

  return (
    <Fade in={fadeIn} {...MuiFadeProps} ref={ref}>
      <AppBar {...other}>
        <Toolbar {...MuiToolbarProps}>
          <Box mr={2}>
            <IconButton
              onClick={() => {
                if (backPath) {
                  push(backPath);
                } else {
                  go(-pointer);
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
