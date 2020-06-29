import React from 'react';

import { storiesOf } from '@storybook/react';

import FaceBookIcon from '@material-ui/icons/Facebook'
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
          fontSize: 48
        }
      }))
      const Demo = () => {
        const classes = useStyles()
        return (
          <>
            <FaceBookIcon  style={{ color: "#4267b2"}}/>
            <GoogleIcon />
            <LineIcon />
            <Divider />
            <FaceBookIcon className={classes.large} style={{ color: "#4267b2"}}/>
            <GoogleIcon className={classes.large}/>
            <LineIcon className={classes.large}/>
          </>
        )
      }
      return <Demo />
    },
  )