import React from 'react';
import { storiesOf } from '@storybook/react';

import DateRangePicker from '@e-group/material-lab/DateRangePicker';

storiesOf('DateRangePicker', module)
  .add(
    'default',
    () => {
      const [dateRange, setDateRange] = React.useState({})

      const Demo = () => {
        return (
          <>
            <DateRangePicker open onChange={range => setDateRange(range)}/>
            {JSON.stringify(dateRange)}
          </>
        )
      }
      return <Demo />
    },
    {
      info: {
        propTables: [DateRangePicker]
      }
    }
  )
