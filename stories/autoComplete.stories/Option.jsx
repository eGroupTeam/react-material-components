import React from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const Option = props => {
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

export default Option
