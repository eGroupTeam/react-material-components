import React from 'react';
import { storiesOf } from '@storybook/react';

import DateRangePicker from '@e-group/material-lab/DateRangePicker';

storiesOf('DateRangePicker', module)
  .add(
    'default',
    () => (
      <DateRangePicker />
    ),
    {
      info: {
        propTables: [DateRangePicker]
      }
    }
  )
