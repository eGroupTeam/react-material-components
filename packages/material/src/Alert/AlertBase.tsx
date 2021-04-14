import { Alert, AlertProps } from '@material-ui/lab';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import { WithStylesOptions } from '@material-ui/core/styles/withStyles';

export default withStyles<string, WithStylesOptions<Theme>, AlertProps>(
  (theme: Theme) =>
    createStyles({
      root: {
        borderRadius: theme.shape.borderRadius,
        position: 'relative',
        display: 'flex',
        textAlign: 'initial',
        borderLeft: ({ severity = 'info' }) =>
          `3px solid ${theme.egPalette[severity][1]}`,
        backgroundColor: ({ severity = 'info' }) =>
          theme.egPalette[severity][5],
      },
      message: {
        display: 'flex',
        textAlign: 'initial',
        paddingBottom: ({ icon }) => (icon === false ? '' : 0),
        '& .MuiAlertTitle-root': {
          marginRight: theme.spacing(2),
        },
      },
      action: {
        '& .MuiButton-root': {
          border: ({ severity = 'info' }) =>
            `1px solid ${theme.egPalette[severity][1]}`,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
        },
      },
    })
)(Alert);
