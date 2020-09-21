import React, { FC, useEffect, useRef } from 'react';
import { Meta } from '@storybook/react';

import SurveyCharts from '@e-group/material-module/SurveyCharts';
import data from './data';
import data1 from './data1';

export default {
  title: 'Modules/SurveyCharts',
  component: SurveyCharts,
} as Meta;

export const Default: FC = () => (
  <SurveyCharts data={data} totalResponses={15} />
);

export const WithRating: FC = () => (
  <SurveyCharts data={data1} totalResponses={1} />
);

export const WithUseRef: FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    console.log(ref.current);
  }, []);

  return <SurveyCharts ref={ref} data={data1} totalResponses={1} />;
};
