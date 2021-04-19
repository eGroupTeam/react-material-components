import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import DropDown, { DropDownProps } from '@e-group/material/DropDown';
import Grid from '@e-group/material/Grid';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

export default {
  title: 'Components/DropDown',
  component: DropDown,
} as Meta;

const options1 = [
  { group: 'Graphic Designers' },
  { text: 'John Doe', value: 1 },
  { text: 'Ran Mandes', value: 2 },
  { group: 'UI/UX Designers' },
  { text: 'Karl Hamilton', value: 3 },
];
const options2 = [
  '1-Mumbai',
  '2-New York',
  '3-London',
  '4-Monaco',
  '5-Melbourne',
];
const option3 = [
  { text: 'Profile', value: '1', icon: <ClearOutlinedIcon /> },
  { text: 'Notification', value: '2', icon: <ClearOutlinedIcon /> },
  { text: 'Recordings', value: '3', icon: <ClearOutlinedIcon /> },
  { text: 'Events', value: '4', icon: <ClearOutlinedIcon /> },
  { text: 'Logout', value: '5', icon: <ClearOutlinedIcon /> },
];

const options4 = ['Laptops', 'Smart Phones', 'LCD tv', 'Washing Machine'];

const options5 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];

export const Default: Story<DropDownProps> = (args) => (
  <Grid container justify="center" spacing={5}>
    <Grid item xs={10}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <DropDown options={options1} select>
            Disgners
          </DropDown>
        </Grid>
        <Grid item xs={6} md={3}>
          <DropDown
            type="check"
            startIcon={<RoomOutlinedIcon fontSize="small" />}
            options={options2}
            select
          >
            Location
          </DropDown>
        </Grid>
        <Grid item xs={6} md={3}>
          <DropDown
            type="check"
            endIcon={<SettingsOutlinedIcon fontSize="small" />}
            options={option3}
            select
          >
            Settings
          </DropDown>
        </Grid>
        <Grid item xs={6} md={3}>
          <DropDown options={options4} search seperate type="check" select>
            Electronics
          </DropDown>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={10}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <DropDown options={options5} select>
            Select
          </DropDown>
        </Grid>
        <Grid item xs={6} md={3}>
          <DropDown options={options5} select disabled>
            Select
          </DropDown>
        </Grid>
        <Grid item xs={6} md={3}>
          <DropDown options={options5} shape="radio" select>
            Select
          </DropDown>
        </Grid>
        <Grid item xs={6} md={3}>
          <DropDown options={options5} shape="checkbox" select>
            Select
          </DropDown>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
