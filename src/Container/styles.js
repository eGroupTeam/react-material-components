const styles = theme => {
  return {
    root: {
      width: '100%',
      marginLeft: 'auto',
      boxSizing: 'border-box',
      marginRight: 'auto',
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 4
      }
    },
    xs: {
      [theme.breakpoints.up('xs')]: {
        maxWidth: Math.max(theme.breakpoints.values.xs, 444)
      }
    },
    sm: {
      [theme.breakpoints.up('sm')]: {
        maxWidth: theme.breakpoints.values.sm
      }
    },
    md: {
      [theme.breakpoints.up('md')]: {
        maxWidth: theme.breakpoints.values.md
      }
    },
    lg: {
      [theme.breakpoints.up('lg')]: {
        maxWidth: theme.breakpoints.values.lg
      }
    },
    xl: {
      [theme.breakpoints.up('xl')]: {
        maxWidth: theme.breakpoints.values.xl
      }
    }
  };
};

export default styles;
