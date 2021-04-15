import React, { FC } from 'react';
import IcomoonBase, { IcomoonBaseProps } from './IcomoonBase';

export type IcomoonProps = IcomoonBaseProps;

const Icomoon: FC<IcomoonProps> = (props) => {
  return <IcomoonBase {...props} />;
};

export default Icomoon;
