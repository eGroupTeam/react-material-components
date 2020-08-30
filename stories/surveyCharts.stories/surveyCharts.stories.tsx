import React from 'react';
import { storiesOf } from '@storybook/react';

import SurveyCharts from '@e-group/material-module/SurveyCharts';
import data from './data'

const totalResponses = 10

storiesOf('SurveyCharts', module)
  .add(
    'default',
    () => {
      const Demo = () => (
        <SurveyCharts
          data={data}
          totalResponses={totalResponses}
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
