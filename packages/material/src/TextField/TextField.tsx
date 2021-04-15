import React, { FC } from 'react';
import TextFieldBase, { TextFieldBaseProps } from './TextFieldBase';

export type TextFieldProps = TextFieldBaseProps;

const TextField: FC<TextFieldProps> = (props) => {
  return <TextFieldBase {...props} />;
};

export default TextField;
