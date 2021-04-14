import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Alert, { AlertProps } from '@e-group/material/Alert';
import AlertTitle from '@e-group/material/AlertTitle';

import Button from '@e-group/material/Button';
import Grid from '@e-group/material/Grid';
import IconButton from '@e-group/material/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

export default {
  title: 'Components/Alert',
  component: Alert,
} as Meta;

export const Default: Story<AlertProps> = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={5}>
          <Alert
            severity="info"
            icon={<InfoOutlinedIcon fontSize="small" color="inherit" />}
            action={
              <IconButton aria-label="close" color="inherit" size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Hello Welcome!</AlertTitle>
            Info message
          </Alert>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Alert
            severity="error"
            icon={<InfoOutlinedIcon fontSize="small" color="inherit" />}
            action={
              <IconButton aria-label="close" color="inherit" size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>oh crap!</AlertTitle>
            Error message
          </Alert>
        </Grid>
        <Grid item xs={5}>
          <Alert
            severity="success"
            action={
              <IconButton aria-label="close" color="inherit" size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Well done!</AlertTitle>
            Success message
          </Alert>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Alert
            severity="warning"
            action={
              <IconButton aria-label="close" color="inherit" size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Warning!</AlertTitle>
            Warning message
          </Alert>
        </Grid>
        <Grid item xs={5}>
          <Alert
            severity="info"
            icon={false}
            action={
              <Button color="inherit" size="small">
                Retry
              </Button>
            }
          >
            Cant send photo. Retry in 5 seconds.
          </Alert>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Alert
            severity="error"
            icon={false}
            action={
              <Button color="inherit" size="small">
                Dismiss
              </Button>
            }
          >
            Your photo has been archived.
          </Alert>
        </Grid>
        <Grid item xs={5}>
          <Alert
            severity="success"
            icon={false}
            action={
              <Button color="inherit" size="small">
                Add a new label
              </Button>
            }
          >
            This item already has the...
          </Alert>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Alert
            severity="warning"
            icon={false}
            action={
              <Button color="inherit" size="small">
                Undo
              </Button>
            }
          >
            Your photo has been archived.
          </Alert>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export const Dialog: Story<AlertProps> = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={5}>
          <Alert
            severity="info"
            icon={<CheckIcon fontSize="inherit" />}
            shape="dialog"
            action={
              <IconButton aria-label="close" color="inherit" size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Hello Welcome!</AlertTitle>
            Info message
          </Alert>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Alert
            severity="error"
            shape="dialog"
            icon={<CheckIcon fontSize="inherit" />}
            action={
              <IconButton aria-label="close" color="inherit" size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>oh crap!</AlertTitle>
            Error message
          </Alert>
        </Grid>
        <Grid item xs={5}>
          <Alert
            severity="success"
            shape="dialog"
            action={
              <IconButton aria-label="close" color="inherit" size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Well done!</AlertTitle>
            Success message
          </Alert>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Alert
            severity="warning"
            shape="dialog"
            action={
              <IconButton aria-label="close" color="inherit" size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Warning!</AlertTitle>
            Warning message
          </Alert>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
