import React, {
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TextField, MenuItem, TextFieldProps } from '@material-ui/core';
import PostalCode from './PostalCode';
import locations from './locations';
import { City, Dist } from './types';

export interface SimpleAddressProps {
  data?: City[];
  MuiTextFieldProps?: TextFieldProps;
  cityProps?: TextFieldProps;
  areaProps?: TextFieldProps;
  postalCodeProps?: TextFieldProps;
  render?: (
    city: ReactNode,
    area: ReactNode,
    postalCode?: ReactNode
  ) => ReactElement;
  names: string[];
}

const SimpleAddress: FC<SimpleAddressProps> = (props) => {
  const {
    data = locations,
    MuiTextFieldProps,
    cityProps,
    areaProps,
    postalCodeProps,
    render,
    names,
  } = props;
  const [cityInputValue, setCityInputValue] = useState('');
  const [areaInputValue, setAreaInputValue] = useState('');
  const [postalCodeInputValue, setPostalCodeInputValue] = useState('');

  const { onChange: cityOnChange, value: cityValue, ...otherCityProps } = {
    ...(MuiTextFieldProps || {}),
    ...(cityProps || {}),
  };
  const { onChange: areaOnChange, value: areaValue, ...otherAreaProps } = {
    ...(MuiTextFieldProps || {}),
    ...(areaProps || {}),
  };
  const cities = useMemo(() => data.map((el) => el.city), [data]);
  const [dists, setDists] = useState<Dist[]>([]);

  useEffect(() => {
    const findCity = data.find((el) => el.city === cityInputValue);
    let dists: Dist[] = [];
    if (findCity) {
      dists = findCity.dists;
    }
    setDists(dists);
  }, [cityInputValue, data]);

  const handleCityChange = (e: any) => {
    if (cityOnChange) {
      cityOnChange(e);
    }
    setCityInputValue(e.target.value);
    setAreaInputValue('');
    setPostalCodeInputValue('');
  };

  const handleAreaChange = (e: any) => {
    if (areaOnChange) {
      areaOnChange(e);
    }
    setAreaInputValue(e.target.value);
  };

  const city = (
    <TextField
      select
      onChange={handleCityChange}
      value={cityInputValue}
      {...otherCityProps}
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

  const area = (
    <TextField
      select
      onChange={handleAreaChange}
      value={areaInputValue}
      {...otherAreaProps}
    >
      <MenuItem value="" disabled>
        <em>None</em>
      </MenuItem>
      {dists.map((dist) => (
        <MenuItem key={`${dist.name}${dist.postalCode}`} value={dist.name}>
          {dist.name}
        </MenuItem>
      ))}
    </TextField>
  );

  const postalCode =
    names[2] !== undefined ? (
      <PostalCode
        dists={dists}
        setPostalCodeInputValue={setPostalCodeInputValue}
        areaInputValue={areaInputValue}
        postalCodeInputValue={postalCodeInputValue}
        {...MuiTextFieldProps}
        {...postalCodeProps}
      />
    ) : undefined;

  if (render) {
    return render(city, area, postalCode);
  }

  return (
    <>
      {city}
      {area}
      {postalCode}
    </>
  );
};

export default SimpleAddress;
