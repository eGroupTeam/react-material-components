import React from 'react';
import { storiesOf } from '@storybook/react';

import SurveyCharts from '@e-group/material-module/SurveyCharts';
import data from './data'
import data1 from './data1'

storiesOf('SurveyCharts', module)
  .add(
    'default',
    () => {
      return (
        <SurveyCharts
          data={data}
          totalResponses={15}
        />
      )
    },
  )
  .add(
    'with rating',
    () => {
      return (
        <SurveyCharts
          data={data1}
          totalResponses={1}
        />
      )
    },
  )
