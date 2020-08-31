import React from 'react';
import { Curve } from 'recharts';

const CustomizedLabelLine = (props: any) => {
  const { percent } = props;
  if (percent * 100 < 1) return false;
  return <Curve {...props} type="linear" className="recharts-pie-label-line" />;
};

export default CustomizedLabelLine;
