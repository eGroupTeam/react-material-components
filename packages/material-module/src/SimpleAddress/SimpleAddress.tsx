import React, {
  ChangeEvent,
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

import useControlled from '@e-group/hooks/useControlled';
import TextField, { TextFieldProps } from '@e-group/material/TextField';
import MenuItem from '@e-group/material/MenuItem';
import locations from './locations';

export type Dist = {
  name: string;
  zipCode: string;
};

export type City = {
  city: string;
  dists: Dist[];
};

export type Value = {
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
  onChange?: (value: Value) => void;
  /**
   * The value of the component.
   */
  value?: Value;
}

const SimpleAddress = forwardRef<HTMLDivElement, SimpleAddressProps>(
  function SimpleAddress(props, ref) {
    const {
      data = locations,
      MuiTextFieldProps,
      cityProps,
      areaProps,
      zipCodeProps,
      disableZipCode,
      renderFields,
      onChange,
      value: valueProp,
    } = props;
    const defaultValue = !disableZipCode
      ? {
          city: '',
          area: '',
          zipCode: '',
        }
      : {
          city: '',
          area: '',
        };
    const [valueState, setValueState] = useControlled({
      controlled: valueProp,
      default: defaultValue,
    });

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
      const findCity = data.find((el) => el.city === valueState.city);
      let dists: Dist[] = [];
      if (findCity) {
        dists = findCity.dists;
      }
      setDists(dists);
    }, [data, valueState.city]);

    const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (cityOnChange) {
        cityOnChange(e);
      }
      let nextValue: Value = {
        city: e.target.value,
        area: '',
      };
      if (!disableZipCode) {
        nextValue = {
          ...nextValue,
          zipCode: '',
        };
      }
      setValueState(nextValue);
      if (onChange) {
        onChange(nextValue);
      }
    };

    const handleAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (areaOnChange) {
        areaOnChange(e);
      }
      let nextValue = {
        ...valueState,
        area: e.target.value,
      };
      if (!disableZipCode) {
        const findZipCode = dists.find((el) => el.name === e.target.value);
        let zipCode = '';

        if (findZipCode) {
          zipCode = findZipCode.zipCode;
        }
        nextValue = {
          ...nextValue,
          zipCode,
        };
      }
      setValueState(nextValue);
      if (onChange) {
        onChange(nextValue);
      }
    };

    const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (disableZipCode) return;
      const nextValue = {
        ...valueState,
        zipCode: e.target.value,
      };
      setValueState(nextValue);
      if (onChange) {
        onChange(nextValue);
      }
    };

    const city = (
      <TextField
        select
        onChange={handleCityChange}
        value={valueState.city}
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
        value={valueState.area}
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
        value={valueState.zipCode}
        {...otherZipCodeProps}
      />
    ) : undefined;

    if (renderFields) {
      return (
        <>
          <div ref={ref} style={{ display: 'inline' }} />
          {renderFields(city, area, zipCode)}
        </>
      );
    }

    return (
      <>
        <div ref={ref} style={{ display: 'inline' }} />
        {city}
        {area}
        {zipCode}
      </>
    );
  }
);

export default SimpleAddress;
