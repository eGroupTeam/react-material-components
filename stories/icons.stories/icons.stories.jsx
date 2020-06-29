import React from 'react';

import { storiesOf } from '@storybook/react';
import clsx from 'clsx'

import GoogleIcon from '@e-group/material-icons/GoogleIcon';
import LineIcon from '@e-group/material-icons/LineIcon';
import { makeStyles, Divider } from '@material-ui/core';

storiesOf('Icons', module)
  .add(
    'default',
    () => {
      const useStyles = makeStyles(theme => ({
        icon: {
          margin: theme.spacing(0.5)
        },
        large: {
          width: 48,
          height: 48
        }
      }))
      const Demo = () => {
        const classes = useStyles()
        return (
          <>
            <GoogleIcon className={classes.icon}/>
            <LineIcon className={classes.icon}/>
            <Divider />
            <GoogleIcon className={clsx(classes.icon, classes.large)}/>
            <LineIcon className={clsx(classes.icon, classes.large)}/>
          </>
        )
      }
      return <Demo />
    },
  )