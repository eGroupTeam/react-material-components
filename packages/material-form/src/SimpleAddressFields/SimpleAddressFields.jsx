import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { List } from 'immutable';

const SimpleAddressFields = ({
  data,
  cityName,
  areaName,
  postalCodeName,
  MuiTextFieldProps,
  cityProps,
  areaProps,
  postalCodeProps,
  ...other
}) => {
  const cityInput = other[cityName].input;
  const cityMeta = other[cityName].meta;
  const areaInput = other[areaName].input;
  const areaMeta = other[areaName].meta;
  const postalCodeInput = other[postalCodeName].input;
  const postalCodeMeta = other[postalCodeName].meta;
  const cities = data.map(el => el.get('city'));
  const [dists, setDists] = React.useState(List());
  const isCityError = cityMeta.touched && cityMeta.invalid;
  const isAreaError = areaMeta.touched && areaMeta.invalid;
  const isPostalCodeError = postalCodeMeta.touched && postalCodeMeta.invalid;
  const cityHelpText = MuiTextFieldProps.helperText || cityProps.helperText;
  const areaHelpText = MuiTextFieldProps.helperText || areaProps.helperText;
  const postalCodeHelpText =
    MuiTextFieldProps.helperText || postalCodeProps.helperText;

  React.useEffect(() => {
    const findCity = data.find(el => el.get('city') === cityInput.value);
    let dists = List();
    if (findCity) {
      dists = findCity.get('dists');
    }
    setDists(dists);
  }, [cityInput.value, data]);

  React.useEffect(() => {
    const findPostalCode = dists.find(el => el.get('name') === areaInput.value);
    let postalCode = '';
    if (findPostalCode) {
      postalCode = findPostalCode.get('postalCode');
    }
    postalCodeInput.onChange(postalCode);
  }, [dists, areaInput.value, postalCodeInput]);

  const handleCityChange = e => {
    cityInput.onChange(e.target.value);
    areaInput.onChange('');
    postalCodeInput.onChange('');
  };

  return (
    <React.Fragment>
      <TextField
        error={isCityError}
        {...MuiTextFieldProps}
        {...cityProps}
        select
        {...cityInput}
        onChange={handleCityChange}
        helperText={isCityError ? cityMeta.error : cityHelpText}
      >
        <MenuItem value="" />
        {cities.map((city, index) => (
          <MenuItem key={`city-${index}`} value={city}>
            {city}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        error={isAreaError}
        {...MuiTextFieldProps}
        {...areaProps}
        select
        {...areaInput}
        helperText={isAreaError ? areaMeta.error : areaHelpText}
      >
        <MenuItem value="" />
        {dists.map((dist, index) => (
          <MenuItem
            key={`dist-${dist.get('name')}-${index}`}
            value={dist.get('name')}
          >
            {dist.get('name')}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        error={isPostalCodeError}
        {...MuiTextFieldProps}
        {...postalCodeProps}
        {...postalCodeInput}
        helperText={
          isPostalCodeError ? postalCodeMeta.error : postalCodeHelpText
        }
      />
    </React.Fragment>
  );
};

export default SimpleAddressFields;
