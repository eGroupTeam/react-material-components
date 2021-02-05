import React, { FC } from 'react';

import { Meta } from '@storybook/react';
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import useStepper from '@e-group/hooks/useStepper';

export default {
  title: 'Hooks/useStepper',
} as Meta;

export const Default: FC = () => {
  const { value, handlePrev, handleNext } = useStepper('stepper', 3);

  return (
    <>
      <Stepper activeStep={value}>
        <Step>
          <StepLabel>Step One</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step Two</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step Three</StepLabel>
        </Step>
      </Stepper>
      {value === 0 && <Typography>Step One</Typography>}
      {value === 1 && <Typography>Step Two</Typography>}
      {value === 2 && <Typography>Step Three</Typography>}
      {value === 3 && <Typography>Successful</Typography>}
      <Button onClick={handlePrev}>Prev</Button>
      <Button onClick={handleNext}>Next</Button>
    </>
  );
};
