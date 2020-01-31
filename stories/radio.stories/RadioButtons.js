import React from 'react';
import Radio from '@e-group/material/Radio';

import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((MuiRadioProps, ...other) => <Radio MuiRadioProps={{ color: "default", ...MuiRadioProps }} {...other} />);

function RadioButtons({ classes }) {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        name="Radio"
        value="a"
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        name="Radio"
        value="b"
      />
      <GreenRadio
        checked={selectedValue === 'c'}
        onChange={handleChange}
        name="Radio"
        value="c"
      />
      <Radio
        checked={selectedValue === 'd'}
        onChange={handleChange}
        name="Radio"
        value="d"
        MuiRadioProps={{
          color: 'default',
        }}
      />
      <Radio
        checked={selectedValue === 'e'}
        onChange={handleChange}
        name="Radio"
        value="e"
        MuiRadioProps={{
          color: 'default',
          size: "small"
        }}
      />
    </div>
  );
}

export default RadioButtons;
