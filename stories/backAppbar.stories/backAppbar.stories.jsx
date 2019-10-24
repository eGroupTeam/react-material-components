import React from 'react';

import { storiesOf } from '@storybook/react';
import { withRouter } from 'react-router'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

import StoryRouter from 'storybook-react-router';
import BackAppbar from '@e-group/material-module/BackAppbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

storiesOf('BackAppbar', module)
  .addDecorator(StoryRouter())
  .add(
    'default',
    () => {
      const useStyles = makeStyles(theme => ({
        icon: {
          transform: 'rotate(90deg)',
          transition: 'transform cubic-bezier(0.4,0.0,0.2,1) 400ms'
        },
        rotate: {
          transform: 'rotate(0)'
        }
      }))
      const Demo = withRouter(({ location, history }) => {
        const [entered, setEntered] = React.useState(false)
        const classes = useStyles()
        return (
          <BackAppbar
            location={location}
            history={history}
            fadeIn
            position="fixed"
            elevation={0}
            backIcon={<ArrowBackIcon className={clsx(classes.icon, {
              [classes.rotate]: entered
            })}/>}
            MuiFadeProps={{
              onEntered: () => {
                setEntered(true)
              }
            }}
          >
            <Typography variant="h6">Title</Typography>
            <Box flexGrow={1}></Box>
            <Button color="inherit">Login</Button>
          </BackAppbar>
        )
      })
      return <Demo />
    },
    {
      info: {
        propTables: [BackAppbar]
      }
    }
  );
