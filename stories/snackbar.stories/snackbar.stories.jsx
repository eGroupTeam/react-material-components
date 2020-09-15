import React from 'react';
import { storiesOf } from '@storybook/react';

import Snackbar from '@e-group/material-lab/Snackbar';
import SnackbarContent from '@e-group/material-lab/Snackbar/SnackbarContent';

storiesOf('Snackbar', module).add(
  'default',
  () => {
    const Demo = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <>
          <Snackbar
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            message="default"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            // autoHideDuration={2000}
          />
          <Snackbar
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            message="success"
            variant="success"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            autoHideDuration={2000}
          />
          <Snackbar
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            message="warning"
            variant="warning"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            autoHideDuration={2000}
          />
          <Snackbar
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            message="error"
            variant="error"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            autoHideDuration={2000}
          />
          <Snackbar
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            message="info"
            variant="info"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            autoHideDuration={2000}
          />
          <button onClick={() => setIsOpen(true)}>show</button>
          <SnackbarContent action={[]} message="default" />
          <SnackbarContent action={[]} message="success" variant="success" />
          <SnackbarContent action={[]} message="warning" variant="warning" />
          <SnackbarContent action={[]} message="error" variant="error" />
          <SnackbarContent action={[]} message="info" variant="info" />
        </>
      );
    };
    return <Demo />;
  },
  {
    info: {
      propTables: [Snackbar],
    },
  }
);
