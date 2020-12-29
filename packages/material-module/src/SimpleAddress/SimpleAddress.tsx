import React, {
  ChangeEvent,
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TextField, MenuItem, TextFieldProps } from '@material-ui/core';
import locations from './locations';

export type Dist = {
  name: string;
  postalCode: string;
};

export type City = {
  city: string;
  dists: Dist[];
};
export interface SimpleAddressProps {
  /**
   * Fields names.
   */
  names: [string, string, string] | [string, string];
  /**
   * location data.
   */
  data?: City[];
  /**
   * Shared props apply on every field.
   */
  MuiTextFieldProps?: TextFieldProps;
  /**
   * City field props.
   */
  cityProps?: TextFieldProps;
  /**
   * Area field props.
   */
  areaProps?: TextFieldProps;
  /**
   * Postal code field props.
   */
  postalCodeProps?: TextFieldProps;
  /**
   * Customer render function provide three field.
   */
  render?: (
    city: ReactNode,
    area: ReactNode,
    postalCode?: ReactNode
  ) => ReactElement;
  /**
   * Callback fired when the value is changed..
   */
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    values: {
      [x: string]: string;
    }
  ) => void;
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
    onChange,
  } = props;
  const cityName = names[0];
  const areaName = names[1];
  const postalCodeName = names[2];
  const defaultValues = postalCodeName
    ? {
        [cityName]: '',
        [areaName]: '',
        [postalCodeName]: '',
      }
    : {
        [cityName]: '',
        [areaName]: '',
      };
  const [inputValues, setInputValues] = useState(defaultValues);

  const { onChange: cityOnChange, value: cityValue, ...otherCityProps } = {
    ...(MuiTextFieldProps || {}),
    ...(cityProps || {}),
  };
  const { onChange: areaOnChange, value: areaValue, ...otherAreaProps } = {
    ...(MuiTextFieldProps || {}),
    ...(areaProps || {}),
  };
  const {
    onChange: postalCodeOnChange,
    value: postalCodeValue,
    ...otherPostalCodeProps
  } = {
    ...(MuiTextFieldProps || {}),
    ...(postalCodeProps || {}),
  };
  const cities = useMemo(() => data.map((el) => el.city), [data]);
  const [dists, setDists] = useState<Dist[]>([]);

  useEffect(() => {
    const findCity = data.find((el) => el.city === inputValues[cityName]);
    let dists: Dist[] = [];
    if (findCity) {
      dists = findCity.dists;
    }
    setDists(dists);
  }, [cityName, data, inputValues]);

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (cityOnChange) {
      cityOnChange(e);
    }
    let nextValues = {
      [cityName]: e.target.value,
      [areaName]: '',
    };
    if (postalCodeName) {
      nextValues = {
        [cityName]: e.target.value,
        [areaName]: '',
        [postalCodeName]: '',
      };
    }
    setInputValues(nextValues);
    if (onChange) {
      onChange(e, nextValues);
    }
  };

  const handleAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (areaOnChange) {
      areaOnChange(e);
    }
    let nextValues = {
      ...inputValues,
      [areaName]: e.target.value,
    };
    if (postalCodeName) {
      const findPostalCode = dists.find((el) => el.name === e.target.value);
      let postalCode = '';

      if (findPostalCode) {
        postalCode = findPostalCode.postalCode;
      }
      nextValues = {
        ...nextValues,
        [postalCodeName]: postalCode,
      };
    }
    setInputValues(nextValues);
    if (onChange) {
      onChange(e, nextValues);
    }
  };

  const handlePostalCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!postalCodeName) return;
    const nextValues = {
      ...inputValues,
      [postalCodeName]: e.target.value,
    };
    setInputValues(nextValues);
    if (onChange) {
      onChange(e, nextValues);
    }
  };

  const city = (
    <TextField
      select
      onChange={handleCityChange}
      value={inputValues[cityName]}
      name={cityName}
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
      value={inputValues[areaName]}
      name={areaName}
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

  const postalCode = postalCodeName ? (
    <TextField
      onChange={handlePostalCodeChange}
      value={inputValues[postalCodeName]}
      name={postalCodeName}
      {...otherPostalCodeProps}
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
