import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

const TextLoading = ({
  loading,
  loadingAdornment: loadingAdornmentProp,
  InputProps,
  ...other
}) => {
  const { endAdornment: endAdornmentProp, ...otherInputProps } =
    InputProps || {};
  // set default loading endAdornment
  const loadingAdornment = loadingAdornmentProp || (
    <InputAdornment position="end">
      <CircularProgress size={20} />
    </InputAdornment>
  );
  const endAdornment = loading ? loadingAdornment : endAdornmentProp;
  return (
    <TextField
      InputProps={{
        endAdornment,
        ...otherInputProps
      }}
      {...other}
    />
  );
};

TextLoading.propTypes = {
  /**
   * Set TextField in loading status
   */
  loading: PropTypes.bool,
  /**
   * Customized Loading Adornment
   */
  loadingAdornment: PropTypes.node
};

export default TextLoading;
