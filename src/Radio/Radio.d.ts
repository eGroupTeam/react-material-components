import * as React from 'react';
import { RadioProps as MuiRadioProps } from '@material-ui/core/Radio';
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel';

export interface RadioProps extends FormControlLabelProps {
  MuiRadioProps: MuiRadioProps;
}

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;