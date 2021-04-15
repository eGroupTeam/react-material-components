import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Icomoon, { IcomoonProps } from '@e-group/material/Icomoon';

import { Grid } from '@material-ui/core';

const style = {
  display: 'inline-block',
  padding: '5px',
  background: 'white',
  borderRadius: '5px',
  boxShadow: '0 0 10px -1px #00000042',
  marginRight: '25px',
  marginBottom: '25px',
  cursor: 'pointer',
};

export default {
  title: 'Components/Icomoon',
  component: Icomoon,
  argTypes: {
    color: {
      control: {
        type: 'radio',
        options: [
          'inherit',
          'primary',
          'secondary',
          'default',
          'text',
          'success',
          'warning',
          'info',
          'error',
        ],
      },
    },
  },
} as Meta;

export const Default: Story<IcomoonProps> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={7}>
          <div style={style}>
            <Icomoon type="academic" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="add-people" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="add-text" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="add" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="analysis" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="arrow-left" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="bottom" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="buildings" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="calculator" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="calendar_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="calendar_2" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="calendar-check" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="calendar-small" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="calendar-time_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="calendar-time" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="calendar" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="camera-change" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="cancel_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="cancel" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="chart" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="check" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="checklist_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="checklist-man" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="checklist" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="checklist" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="circus" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="clock" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="close" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="cloud-change" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="computer-info" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="computer-location" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="countdown" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="cowork" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="delete_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="delete" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="download" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="drag" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="edit_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="edit" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="email_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="email-resend" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="email-send" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="email" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="excel" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="file-attached" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="files" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="filter" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="firework" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="goback" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="home" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="idear_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="idear_2" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="idear" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="info" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="left" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="link" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="loading" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="location-favorite" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="location-home" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="location" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="map" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="move" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="news_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="news" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="notice-money" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="notice" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="notify_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="notify_2" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="notify" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-alert" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-analysis" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-award_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-award_2" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-award_3" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-award" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-cancel" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-change" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-checked" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-download_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-download" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-edit" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-question" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-remove" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-setting" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-upload" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-view_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-view" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper-write" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="paper" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="papers" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="pdf" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="people-network_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="people-network" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="people-setting_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="people-setting_2" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="people-setting_3" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="people-setting" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="people-talk" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="people" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="peper-remove" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="person" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="phone_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="phone" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="picture" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="play_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="play" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="qrcode" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="recognize-face" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="recovery" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="right" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="save" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="search-data" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="search" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="select-person" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="send" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="settings-circle" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="settings" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="share" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="startup" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="success" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="teaching" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="time_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="time" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="upload_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="upload" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="view" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="wallet" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="way" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="web-setting_1" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="web-setting" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="server" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="chip" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="chip-full" {...args} />
          </div>
          <div style={style}>
            <Icomoon type="computer" {...args} />
          </div>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
