import React, {
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TextField, MenuItem, TextFieldProps } from '@material-ui/core';
import { WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import PostalCodeField from './PostalCodeField';
import locations from './locations';
import indexPath from './indexPath';
import { City, Dist } from './types';

export interface SimpleAddressFieldsProps {
  data?: City[];
  MuiTextFieldProps?: TextFieldProps;
  cityProps?: TextFieldProps;
  areaProps?: TextFieldProps;
  postalCodeProps?: TextFieldProps;
  render?: (
    cityField: ReactNode,
    areaField: ReactNode,
    postalCodeField?: ReactNode
  ) => ReactElement;
  names: string[];
}

const SimpleAddressFields: FC<SimpleAddressFieldsProps> = (props) => {
  const {
    data = locations,
    MuiTextFieldProps,
    cityProps,
    areaProps,
    postalCodeProps,
    render,
    names,
    ...other
  } = props;

  const cityFormProps: WrappedFieldProps = indexPath(other, names[0]);
  const areaFormProps: WrappedFieldProps = indexPath(other, names[1]);
  const postalCodeFormProps: WrappedFieldProps = indexPath(other, names[2]);

  const {
    onChange: cityInputOnChange,
    ...otherCityInput
  } = cityFormProps.input;
  const {
    onChange: areaInputOnChange,
    ...otherAreaInput
  } = areaFormProps.input;
  const { onChange: postalCodeInputOnChange, ...otherPostalCodeInput } =
    postalCodeFormProps.input || {};

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
  const cities = useMemo(() => data.map((el) => el.city), [data]);
  const [dists, setDists] = useState<Dist[]>([]);
  const isCityError = cityMeta.touched && cityMeta.invalid;
  const isAreaError = areaMeta.touched && areaMeta.invalid;

  useEffect(() => {
    const findCity = data.find((el) => el.city === otherCityInput.value);
    let dists: Dist[] = [];
    if (findCity) {
      dists = findCity.dists;
    }
    setDists(dists);
  }, [otherCityInput.value, data]);

  const handleCityChange = (e: any) => {
    if (cityOnChange) {
      cityOnChange(e);
    }
    cityInputOnChange(e.target.value);
    areaInputOnChange('');
    if (postalCodeInputOnChange) {
      postalCodeInputOnChange('');
    }
  };

  const handleAreaChange = (e: any) => {
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
        <MenuItem key={`${dist.name}${dist.postalCode}`} value={dist.name}>
          {dist.name}
        </MenuItem>
      ))}
    </TextField>
  );

  const postalCodeField =
    names[2] !== undefined ? (
      <PostalCodeField
        {...props}
        dists={dists}
        otherAreaInput={otherAreaInput}
        postalCodeInputOnChange={postalCodeInputOnChange}
        otherPostalCodeInput={
          otherPostalCodeInput as Omit<WrappedFieldInputProps, 'onChange'>
        }
        postalCodeFormProps={postalCodeFormProps}
      />
    ) : undefined;

  if (render) {
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

export default SimpleAddressFields;
