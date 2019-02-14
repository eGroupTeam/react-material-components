const styles = theme => {
  const config = theme.config || {};
  return {
    root: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        maxWidth: config.containerMaxWidth || '960px'
      },
      margin: 'auto'
    }
  };
};

export default styles;
