import React, { FC } from 'react';
import TextAreaBase, { TextAreaBaseProps } from './TextAreaBase';

export type TextAreaProps = TextAreaBaseProps;

const TextArea: FC<TextAreaProps> = (props) => {
  return <TextAreaBase {...props} />;
};

export default TextArea;
