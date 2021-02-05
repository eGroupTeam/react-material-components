import React from 'react';
import { Meta, Story } from '@storybook/react';

import TogglePanel, { TogglePanelProps } from '@e-group/material/TogglePanel';
import useTab from '@e-group/hooks/useTab';
import { Button, Step, StepLabel, Stepper, Tab, Tabs } from '@material-ui/core';
import useStepper from '@e-group/hooks/useStepper';

export default {
  title: 'Components/TogglePanel',
  component: TogglePanel,
  argTypes: {
    index: { control: 'number', defaultValue: 1 },
    value: { control: 'number', defaultValue: 1 },
  },
} as Meta;

export const Default: Story<TogglePanelProps> = (args) => (
  <TogglePanel {...args}>Display Panel by index and value</TogglePanel>
);

export const WithTab: Story<TogglePanelProps> = () => {
  const { value, handleChange } = useTab('tab');
  return (
    <>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={(_, value) => handleChange(value)}
      >
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
      <TogglePanel index={0} value={value}>
        Panel One
      </TogglePanel>
      <TogglePanel index={1} value={value}>
        Panel Two
      </TogglePanel>
      <TogglePanel index={2} value={value}>
        Panel Three
      </TogglePanel>
    </>
  );
};

export const WithStep: Story<TogglePanelProps> = () => {
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
      <TogglePanel index={0} value={value}>
        Panel One
      </TogglePanel>
      <TogglePanel index={1} value={value}>
        Panel Two
      </TogglePanel>
      <TogglePanel index={2} value={value}>
        Panel Three
      </TogglePanel>
      <TogglePanel index={3} value={value}>
        Successful Page
      </TogglePanel>
      <Button onClick={handlePrev}>Prev</Button>
      <Button onClick={handleNext}>Next</Button>
    </>
  );
};
