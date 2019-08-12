import React from 'react';
import { storiesOf } from '@storybook/react';

import autoCompleteMarkdownText from './doc/autoComplete.md';

import AutoComplete from '@e-group/material-module/AutoComplete';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { boolean } from '@storybook/addon-knobs';

const options = [{
  userName: 'userName',
  userOrganizationName: 'userOrganizationName',
  userPhone: 'userPhone',
  label: 'userName'
}]

const Option = (props) => {
  const { userName, userPhone, userOrganizationName } = props.data;
  return (
    <ListItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      button
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      <ListItemText
        primary={userName}
        secondary={
          <React.Fragment>
            <Typography component="span" color="textPrimary">
              {userOrganizationName}
            </Typography>
            {' '}
            {userPhone}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

storiesOf('AutoComplete', module)
  .add(
    'default',
    () => (
      <AutoComplete
        MuiTextFieldProps={{
          fullWidth: boolean('FullWidth', true),
          InputProps: {
            disableUnderline: boolean('DisableUnderline', false)
          }
        }}
        options={options}
        components={{
          Option
        }}
        placeholder="Search"
      />
    ),
    {
      notes: autoCompleteMarkdownText,
      info: {
        propTables: [AutoComplete]
      }
    }
  )
