import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import datatableMarkdownText from './doc/datatable.md';
import DataTable from '../src/DataTable';
// import autoCompleteMarkdownText from './doc/autoComplete.md';
import AutoComplete from '../src/AutoComplete';

storiesOf('Modules', module)
  .add(
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
        filterType: 'checkbox',
        onTableChange: action('table Changed')
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
  )
  .add(
    'AutoComplete',
    () => {
      return (
        <AutoComplete
          TextFieldProps={{
            fullWidth: true,
            InputProps: {
              disableUnderline: true
            }
          }}
          placeholder="Search"
        />
      );
    },
    {
      info: {
        text: datatableMarkdownText,
        propTables: [AutoComplete]
      }
    }
  );
