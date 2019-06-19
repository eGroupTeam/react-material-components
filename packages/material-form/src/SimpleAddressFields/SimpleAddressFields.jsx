import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';

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
  const areaInput = other[areaName].input;
  const postalCodeNameInput = other[postalCodeName].input;
  const cities = data.map(el => el.get('city'));
  const [dists, setDists] = React.useState(List());

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
    postalCodeNameInput.onChange(postalCode);
  }, [dists, areaInput.value, postalCodeNameInput]);

  const handleCityChange = e => {
    cityInput.onChange(e.target.value);
    areaInput.onChange('');
    postalCodeNameInput.onChange('');
  };

  return (
    <React.Fragment>
      <TextField
        {...MuiTextFieldProps}
        {...cityProps}
        select
        {...cityInput}
        onChange={handleCityChange}
      >
        <MenuItem value="" />
        {cities.map((city, index) => (
          <MenuItem key={`city-${index}`} value={city}>
            {city}
          </MenuItem>
        ))}
      </TextField>
      <TextField {...MuiTextFieldProps} {...areaProps} select {...areaInput}>
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
        {...MuiTextFieldProps}
        {...postalCodeProps}
        {...postalCodeNameInput}
      />
    </React.Fragment>
  );
};

export default SimpleAddressFields;
