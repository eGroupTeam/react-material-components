import React from 'react';
import PropTypes from 'prop-types';

import { List, fromJS } from '@e-group/immutable';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import locations from '../../SimpleAddressFields/locations';
import indexPath from '../../SimpleAddressFields/indexPath';

const PostalCodeField = ({
  MuiTextFieldProps,
  postalCodeProps,
  dists,
  otherAreaInput,
  postalCodeInputOnChange,
  otherPostalCodeInput,
  postalCodeFormProps,
}) => {
  const {
    helperText: postalCodeHelperText,
    onChange: postalCodeOnChange,
    ...otherPostalCodeProps
  } = {
    ...(MuiTextFieldProps || {}),
    ...(postalCodeProps || {}),
  };
  const postalCodeMeta = postalCodeFormProps.meta;
  const isPostalCodeError = postalCodeMeta.touched && postalCodeMeta.invalid;

  const handlePostalCodeChange = (e) => {
    if (postalCodeOnChange) {
      postalCodeOnChange(e);
    }
    postalCodeInputOnChange(e.target.value);
  };

  React.useEffect(() => {
    const findPostalCode = dists.find(
      (el) => el.get('name') === otherAreaInput.value
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
    postalCodeInputOnChange,
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

const SimpleAddressFields = (props) => {
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
  const hasPostalCode = typeof names[2] !== 'undefined';

  const cityFormProps = indexPath(other, names[0]);
  const areaFormProps = indexPath(other, names[1]);
  const postalCodeFormProps = hasPostalCode
    ? indexPath(other, names[2])
    : {
        input: {},
      };
  const {
    onChange: cityInputOnChange,
    ...otherCityInput
  } = cityFormProps.input;
  const {
    onChange: areaInputOnChange,
    ...otherAreaInput
  } = areaFormProps.input;
  const {
    onChange: postalCodeInputOnChange,
    ...otherPostalCodeInput
  } = postalCodeFormProps.input;

  const {
    helperText: cityHelperText,
    onChange: cityOnChange,
    ...otherCityProps
  } = {
    ...(MuiTextFieldProps || {}),
    ...(cityProps || {}),
  };
  const {
    helperText: areaHelperText,
    onChange: areaOnChange,
    ...otherAreaProps
  } = {
    ...(MuiTextFieldProps || {}),
    ...(areaProps || {}),
  };
  const cityMeta = cityFormProps.meta;
  const areaMeta = areaFormProps.meta;
  const cities = React.useMemo(() => data.map((el) => el.get('city')), [data]);
  const [dists, setDists] = React.useState(List());
  const isCityError = cityMeta.touched && cityMeta.invalid;
  const isAreaError = areaMeta.touched && areaMeta.invalid;

  React.useEffect(() => {
    const findCity = data.find((el) => el.get('city') === otherCityInput.value);
    let dists = List();
    if (findCity) {
      dists = findCity.get('dists');
    }
    setDists(dists);
  }, [otherCityInput.value, data]);

  const handleCityChange = (e) => {
    if (cityOnChange) {
      cityOnChange(e);
    }
    cityInputOnChange(e.target.value);
    areaInputOnChange('');
    if (postalCodeInputOnChange) {
      postalCodeInputOnChange('');
    }
  };

  const handleAreaChange = (e) => {
    if (areaOnChange) {
      areaOnChange(e);
    }
    areaInputOnChange(e.target.value);
  };

  const cityField = (
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
      {cities.map((city) => (
        <MenuItem key={city} value={city}>
          {city}
        </MenuItem>
      ))}
    </TextField>
  );

  const areaField = (
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
      {dists.map((dist) => (
        <MenuItem
          key={`${dist.get('name')}${dist.get('postalCode')}`}
          value={dist.get('name')}
        >
          {dist.get('name')}
        </MenuItem>
      ))}
    </TextField>
  );

  const postalCodeField = hasPostalCode ? (
    <PostalCodeField
      {...props}
      dists={dists}
      otherAreaInput={otherAreaInput}
      postalCodeInputOnChange={postalCodeInputOnChange}
      otherPostalCodeInput={otherPostalCodeInput}
      postalCodeFormProps={postalCodeFormProps}
    />
  ) : undefined;

  if (typeof render !== 'undefined') {
    return render(cityField, areaField, postalCodeField);
  }

  return (
    <>
      {cityField}
      {areaField}
      {postalCodeField}
    </>
  );
};

SimpleAddressFields.propTypes = {
  data: PropTypes.instanceOf(List).isRequired,
  MuiTextFieldProps: PropTypes.object,
  cityProps: PropTypes.object,
  areaProps: PropTypes.object,
  postalCodeProps: PropTypes.object,
  render: PropTypes.func,
};

SimpleAddressFields.defaultProps = {
  data: fromJS(locations),
};

export default SimpleAddressFields;
