import React, { FC, useEffect } from 'react';

import { TextField, TextFieldProps } from '@material-ui/core';
import { Dist } from './types';

export interface PostalCodeProps {
  dists: Dist[];
  areaInputValue: string;
  setPostalCodeInputValue: (value: string) => void;
  postalCodeInputValue: string;
}

const PostalCode: FC<PostalCodeProps & TextFieldProps> = ({
  onChange,
  value,
  dists,
  areaInputValue,
  setPostalCodeInputValue,
  postalCodeInputValue,
  ...other
}) => {
  const handlePostalCodeChange = (e: any) => {
    if (onChange) {
      onChange(e);
    }
    setPostalCodeInputValue(e.target.value);
  };

  useEffect(() => {
    const findPostalCode = dists.find((el) => el.name === areaInputValue);
    let postalCode = '';

    if (findPostalCode) {
      postalCode = findPostalCode.postalCode;
    }
    setPostalCodeInputValue(postalCode);
  }, [dists, areaInputValue, postalCodeInputValue, setPostalCodeInputValue]);

  return (
    <TextField
      onChange={handlePostalCodeChange}
      value={postalCodeInputValue}
      {...other}
    />
  );
};

export default PostalCode;
