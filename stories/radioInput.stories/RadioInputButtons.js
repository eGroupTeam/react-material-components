import React from 'react';
import RadioInput from '@e-group/material/RadioInput';

import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';

const GreenRadioInput = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(({ classes, ...other }) => (
  <RadioInput classes={classes} color="default" {...other} />
));

function RadioInputButtons({ classes }) {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <RadioInput
        checked={selectedValue === 'a'}
        onChange={handleChange}
        name="RadioInput"
        value="a"
        toggleInput
        label="a"
      />
      <RadioInput
        checked={selectedValue === 'b'}
        onChange={handleChange}
        name="RadioInput"
        value="b"
        toggleInput
        label="b"
      />
      <GreenRadioInput
        checked={selectedValue === 'c'}
        onChange={handleChange}
        name="RadioInput"
        value="c"
        toggleInput
        label="c"
      />
      <RadioInput
        checked={selectedValue === 'd'}
        onChange={handleChange}
        name="RadioInput"
        value="d"
        color="default"
        toggleInput
        label="d"
      />
      <RadioInput
        checked={selectedValue === 'e'}
        onChange={handleChange}
        name="RadioInput"
        value="e"
        color="default"
        size="small"
        toggleInput
        label="e"
      />
    </div>
  );
}

export default RadioInputButtons;
