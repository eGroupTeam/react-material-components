import React from 'react';
import PropTypes from 'prop-types';

import { List, fromJS } from 'immutable';
import locations from './locations';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const SimpleAddressFields = ({
  data,
  cityName,
  areaName,
  postalCodeName,
  MuiTextFieldProps,
  cityProps,
  areaProps,
  postalCodeProps,
  render,
  ...other
}) => {
  const { onChange: cityInputOnChange, ...otherCityInput } = other[
    cityName
  ].input;
  const { onChange: areaInputOnChange, ...otherAreaInput } = other[
    areaName
  ].input;
  const { onChange: postalCodeInputOnChange, ...otherPostalCodeInput } = other[
    postalCodeName
  ].input;
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
  const {
    helperText: postalCodeHelperText,
    onChange: postalCodeOnChange,
    ...otherPostalCodeProps
  } = {
    ...(MuiTextFieldProps || {}),
    ...(postalCodeProps || {})
  };
  const cityMeta = other[cityName].meta;
  const areaMeta = other[areaName].meta;
  const postalCodeMeta = other[postalCodeName].meta;
  const cities = React.useMemo(() => data.map(el => el.get('city')), [data]);
  const [dists, setDists] = React.useState(List());
  const isCityError = cityMeta.touched && cityMeta.invalid;
  const isAreaError = areaMeta.touched && areaMeta.invalid;
  const isPostalCodeError = postalCodeMeta.touched && postalCodeMeta.invalid;

  React.useEffect(() => {
    const findCity = data.find(el => el.get('city') === otherCityInput.value);
    let dists = List();
    if (findCity) {
      dists = findCity.get('dists');
    }
    setDists(dists);
  }, [otherCityInput.value, data]);

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

  const handleCityChange = e => {
    if (cityOnChange) {
      cityOnChange(e);
    }
    cityInputOnChange(e.target.value);
    areaInputOnChange('');
    postalCodeInputOnChange('');
  };

  const handleAreaChange = e => {
    if (areaOnChange) {
      areaOnChange(e);
    }
    areaInputOnChange(e.target.value);
  };

  const handlePostalCodeChange = e => {
    if (postalCodeOnChange) {
      postalCodeOnChange(e);
    }
    postalCodeInputOnChange(e.target.value);
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

  const field3 = (
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
  cityName: PropTypes.string.isRequired,
  areaName: PropTypes.string.isRequired,
  postalCodeName: PropTypes.string.isRequired,
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
