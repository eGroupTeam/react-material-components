import React from 'react';
import { storiesOf } from '@storybook/react';

import datatableMarkdownText from './doc/datatable.md';
import DataTable from '../src/DataTable';

storiesOf('Modules', module).add(
  'DataTable',
  () => {
    const columns = ['Name', 'Company', 'City', 'State'];

    const data = [
      ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
      ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
      ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
      ['James Houston', 'Test Corp', 'Dallas', 'TX']
    ];

    const options = {
      filterType: 'checkbox'
    };

    return (
      <DataTable
        title={'Employee List'}
        data={data}
        columns={columns}
        options={options}
      />
    );
  },
  {
    info: {
      text: datatableMarkdownText,
      propTables: [DataTable]
    }
  }
);
