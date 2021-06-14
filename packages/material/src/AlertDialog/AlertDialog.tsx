import { Alert, AlertProps } from '@material-ui/lab';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import { WithStylesOptions } from '@material-ui/core/styles/withStyles';

export type AlertDialogProps = AlertProps;

export default withStyles<string, WithStylesOptions<Theme>, AlertDialogProps>(
  (theme: Theme) =>
    createStyles({
      root: {
        borderRadius: theme.shape.borderRadius,
        position: 'relative',
        display: 'block',
        textAlign: 'center',
        borderLeft: 'none',
        backgroundColor: 'white',
        boxShadow: theme.egShadows[1],
        padding: theme.spacing(4),
      },
      message: {
        display: 'block',
        textAlign: 'center',
        paddingBottom: 0,
        '& .MuiAlertTitle-root': {
          marginRight: theme.spacing(2),
        },
      },
      icon: {
        display: 'flex',
        justifyContent: 'center',
        '& .MuiSvgIcon-root': {
          backgroundColor: ({ severity = 'info' }) =>
            theme.egPalette[severity][1],
          padding: theme.spacing(2),
          borderRadius: '50%',
          fontSize: '60px',
          color: 'white',
        },
      },
      action: {
        position: 'absolute',
        top: '10px',
        right: '20px',
        '& .MuiButton-root': {
          textTransform: 'initial',
          border: ({ severity = 'info' }) =>
            `1px solid ${theme.egPalette[severity][1]}`,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
        },
      },
    })
)(Alert);
