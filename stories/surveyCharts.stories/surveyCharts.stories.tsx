import React from 'react';
import { storiesOf } from '@storybook/react';

import SurveyCharts from '@e-group/material-module/SurveyCharts';
import data from './data'

storiesOf('SurveyCharts', module)
  .add(
    'default',
    () => {
      const Demo = () => (
        <SurveyCharts
          data={data}
          totalResponses={15}
        />
      )
      return <Demo />
    },
    {
      info: {
        propTables: [SurveyCharts]
      }
    }
  )
