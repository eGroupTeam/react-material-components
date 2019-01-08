export default theme => ({
  root: {
    display: 'block',
    maxWidth: '100%',
    padding: '10px',
  },
  '@media only screen and (min-width: 1200px)': {
    root: {
      width: '1127px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
});
