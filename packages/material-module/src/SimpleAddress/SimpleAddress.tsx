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
  zipCode: string;
};

export type City = {
  city: string;
  dists: Dist[];
};

export type Values = {
  city: string;
  area: string;
  zipCode?: string;
};
export interface SimpleAddressProps {
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
   * Zip code field props.
   */
  zipCodeProps?: TextFieldProps;
  /**
   * Set `true` to disable zip code field.
   */
  disableZipCode?: boolean;
  /**
   * Customer render function provide three field.
   */
  renderFields?: (
    city: ReactNode,
    area: ReactNode,
    zipCode?: ReactNode
  ) => ReactElement;
  /**
   * Callback fired when the value is changed..
   */
  onChange?: (values: Values) => void;
}

const SimpleAddress: FC<SimpleAddressProps> = (props) => {
  const {
    data = locations,
    MuiTextFieldProps,
    cityProps,
    areaProps,
    zipCodeProps,
    disableZipCode,
    renderFields,
    onChange,
  } = props;
  const defaultValues = !disableZipCode
    ? {
        city: '',
        area: '',
        zipCode: '',
      }
    : {
        city: '',
        area: '',
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
    onChange: zipCodeOnChange,
    value: zipCodeValue,
    ...otherZipCodeProps
  } = {
    ...(MuiTextFieldProps || {}),
    ...(zipCodeProps || {}),
  };
  const cities = useMemo(() => data.map((el) => el.city), [data]);
  const [dists, setDists] = useState<Dist[]>([]);

  useEffect(() => {
    const findCity = data.find((el) => el.city === inputValues.city);
    let dists: Dist[] = [];
    if (findCity) {
      dists = findCity.dists;
    }
    setDists(dists);
  }, [data, inputValues.city]);

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (cityOnChange) {
      cityOnChange(e);
    }
    let nextValues: Values = {
      city: e.target.value,
      area: '',
    };
    if (!disableZipCode) {
      nextValues = {
        ...nextValues,
        zipCode: '',
      };
    }
    setInputValues(nextValues);
    if (onChange) {
      onChange(nextValues);
    }
  };

  const handleAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (areaOnChange) {
      areaOnChange(e);
    }
    let nextValues = {
      ...inputValues,
      area: e.target.value,
    };
    if (!disableZipCode) {
      const findZipCode = dists.find((el) => el.name === e.target.value);
      let zipCode = '';

      if (findZipCode) {
        zipCode = findZipCode.zipCode;
      }
      nextValues = {
        ...nextValues,
        zipCode,
      };
    }
    setInputValues(nextValues);
    if (onChange) {
      onChange(nextValues);
    }
  };

  const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disableZipCode) return;
    const nextValues = {
      ...inputValues,
      zipCode: e.target.value,
    };
    setInputValues(nextValues);
    if (onChange) {
      onChange(nextValues);
    }
  };

  const city = (
    <TextField
      select
      onChange={handleCityChange}
      value={inputValues.city}
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
      value={inputValues.area}
      {...otherAreaProps}
    >
      <MenuItem value="" disabled>
        <em>None</em>
      </MenuItem>
      {dists.map((dist) => (
        <MenuItem key={`${dist.name}${dist.zipCode}`} value={dist.name}>
          {dist.name}
        </MenuItem>
      ))}
    </TextField>
  );

  const zipCode = !disableZipCode ? (
    <TextField
      onChange={handleZipCodeChange}
      value={inputValues.zipCode}
      {...otherZipCodeProps}
    />
  ) : undefined;

  if (renderFields) {
    return renderFields(city, area, zipCode);
  }

  return (
    <>
      {city}
      {area}
      {zipCode}
    </>
  );
};

export default SimpleAddress;
