import React from 'react';
import PropTypes from 'prop-types';

import { List, fromJS } from 'immutable';
import locations from './locations';
import indexPath from './indexPath';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const PostalCodeField = ({
  MuiTextFieldProps,
  postalCodeProps,
  names,
  dists,
  otherAreaInput,
  postalCodeInputOnChange,
  otherPostalCodeInput,
  field3Props,
  other
}) => {
  const {
    helperText: postalCodeHelperText,
    onChange: postalCodeOnChange,
    ...otherPostalCodeProps
  } = {
    ...(MuiTextFieldProps || {}),
    ...(postalCodeProps || {})
  };
  const postalCodeMeta = field3Props.meta;
  const isPostalCodeError = postalCodeMeta.touched && postalCodeMeta.invalid;

  const handlePostalCodeChange = e => {
    if (postalCodeOnChange) {
      postalCodeOnChange(e);
    }
    postalCodeInputOnChange(e.target.value);
  };

  React.useEffect(() => {
    const findPostalCode = dists.find(
      el => el.get('name') === otherAreaInput.value
    );
    let postalCode = '';
    if (findPostalCode) {
      postalCode = findPostalCode.get('postalCode');
    }
    postalCodeInputOnChange(postalCode);
  }, [
    dists,
    otherAreaInput.value,
    otherPostalCodeInput,
    postalCodeInputOnChange
  ]);

  return (
    <TextField
      error={isPostalCodeError}
      helperText={
        isPostalCodeError ? postalCodeMeta.error : postalCodeHelperText
      }
      onChange={handlePostalCodeChange}
      {...otherPostalCodeProps}
      {...otherPostalCodeInput}
    />
  );
};

const SimpleAddressFields = props => {
  const {
    data,
    MuiTextFieldProps,
    cityProps,
    areaProps,
    postalCodeProps,
    render,
    names,
    ...other
  } = props;
  const field1Props = indexPath(names[0], other);
  const field2Props = indexPath(names[1], other);
  const hasPostalCode = typeof names[2] !== 'undefined';
  const field3Props = hasPostalCode
    ? indexPath(names[2], other)
    : {
        input: {}
      };
  const { onChange: cityInputOnChange, ...otherCityInput } = field1Props.input;
  const { onChange: areaInputOnChange, ...otherAreaInput } = field2Props.input;
  const {
    onChange: postalCodeInputOnChange,
    ...otherPostalCodeInput
  } = field3Props.input;

  const {
    helperText: cityHelperText,
    onChange: cityOnChange,
    ...otherCityProps
  } = {
    ...(MuiTextFieldProps || {}),
    ...(cityProps || {})
  };
  const {
    helperText: areaHelperText,
    onChange: areaOnChange,
    ...otherAreaProps
  } = {
    ...(MuiTextFieldProps || {}),
    ...(areaProps || {})
  };
  const cityMeta = field1Props.meta;
  const areaMeta = field2Props.meta;
  const cities = React.useMemo(() => data.map(el => el.get('city')), [data]);
  const [dists, setDists] = React.useState(List());
  const isCityError = cityMeta.touched && cityMeta.invalid;
  const isAreaError = areaMeta.touched && areaMeta.invalid;

  React.useEffect(() => {
    const findCity = data.find(el => el.get('city') === otherCityInput.value);
    let dists = List();
    if (findCity) {
      dists = findCity.get('dists');
    }
    setDists(dists);
  }, [otherCityInput.value, data]);

  const handleCityChange = e => {
    if (cityOnChange) {
      cityOnChange(e);
    }
    cityInputOnChange(e.target.value);
    areaInputOnChange('');
    if (postalCodeInputOnChange) {
      postalCodeInputOnChange('');
    }
  };

  const handleAreaChange = e => {
    if (areaOnChange) {
      areaOnChange(e);
    }
    areaInputOnChange(e.target.value);
  };

  const field1 = (
    <TextField
      error={isCityError}
      select
      onChange={handleCityChange}
      helperText={isCityError ? cityMeta.error : cityHelperText}
      {...otherCityProps}
      {...otherCityInput}
    >
      <MenuItem value="" disabled>
        <em>None</em>
      </MenuItem>
      {cities.map((city, index) => (
        <MenuItem key={`city-${index}`} value={city}>
          {city}
        </MenuItem>
      ))}
    </TextField>
  );

  const field2 = (
    <TextField
      error={isAreaError}
      select
      helperText={isAreaError ? areaMeta.error : areaHelperText}
      onChange={handleAreaChange}
      {...otherAreaProps}
      {...otherAreaInput}
    >
      <MenuItem value="" disabled>
        <em>None</em>
      </MenuItem>
      {dists.map((dist, index) => (
        <MenuItem
          key={`dist-${dist.get('name')}-${index}`}
          value={dist.get('name')}
        >
          {dist.get('name')}
        </MenuItem>
      ))}
    </TextField>
  );

  const field3 = hasPostalCode ? (
    <PostalCodeField
      {...props}
      dists={dists}
      otherAreaInput={otherAreaInput}
      postalCodeInputOnChange={postalCodeInputOnChange}
      otherPostalCodeInput={otherPostalCodeInput}
      field3Props={field3Props}
    />
  ) : (
    undefined
  );

  if (typeof render !== 'undefined') {
    return render(field1, field2, field3);
  }

  return (
    <React.Fragment>
      {field1}
      {field2}
      {field3}
    </React.Fragment>
  );
};

SimpleAddressFields.propTypes = {
  data: PropTypes.instanceOf(List).isRequired,
  MuiTextFieldProps: PropTypes.object,
  cityProps: PropTypes.object,
  areaProps: PropTypes.object,
  postalCodeProps: PropTypes.object,
  render: PropTypes.func
};

SimpleAddressFields.defaultProps = {
  data: fromJS(locations)
};

export default SimpleAddressFields;
