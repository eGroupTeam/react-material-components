import React from 'react';
import Radio from '@e-group/material/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    color: green[600],
    '&$checked': {
      color: green[500]
    }
  },
  checked: {}
});

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
      <Radio
        checked={selectedValue === 'c'}
        onChange={handleChange}
        name="Radio"
        value="c"
        MuiRadioProps={{
          classes
        }}
      />
      <Radio
        checked={selectedValue === 'd'}
        onChange={handleChange}
        name="Radio"
        value="d"
        MuiRadioProps={{
          color: 'default',
          icon: <RadioButtonUncheckedIcon fontSize="small" />,
          checkedIcon: <RadioButtonCheckedIcon fontSize="small" />
        }}
      />
    </div>
  );
}

export default withStyles(styles)(RadioButtons);
