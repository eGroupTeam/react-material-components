import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Icomoon, { IcomoonProps } from '@e-group/material/Icomoon';

import { Grid } from '@material-ui/core';

const style = {
  display: 'inline-block',
  padding: '5px',
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
          'white',
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
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="academic" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="add-people" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="add-text" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="add" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="analysis" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="arrow-left" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="bottom" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="buildings" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="calculator" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="calendar_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="calendar_2" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="calendar-check" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="calendar-small" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="calendar-time_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="calendar-time" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="calendar" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="camera-change" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="cancel_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="cancel" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="chart" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="check" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="checklist_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="checklist-man" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="checklist" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="checklist" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="circus" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="clock" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="close" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="cloud-change" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="computer-info" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="computer-location" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="countdown" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="cowork" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="delete_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="delete" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="download" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="drag" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="edit_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="edit" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="email_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="email-resend" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="email-send" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="email" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="excel" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="file-attached" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="files" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="filter" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="firework" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="goback" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="home" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="idear_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="idear_2" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="idear" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="info" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="left" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="link" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="loading" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="location-favorite" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="location-home" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="location" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="map" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="move" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="news_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="news" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="notice-money" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="notice" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="notify_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="notify_2" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="notify" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-alert" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-analysis" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-award_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-award_2" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-award_3" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-award" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-cancel" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-change" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-checked" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-download_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-download" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-edit" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-question" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-remove" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-setting" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-upload" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-view_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-view" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper-write" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="paper" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="papers" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="pdf" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="people-network_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="people-network" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="people-setting_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="people-setting_2" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="people-setting_3" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="people-setting" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="people-talk" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="people" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="peper-remove" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="person" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="phone_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="phone" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="picture" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="play_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="play" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="qrcode" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="recognize-face" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="recovery" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="right" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="save" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="search-data" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="search" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="select-person" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="send" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="settings-circle" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="settings" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="share" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="startup" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="success" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="teaching" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="time_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="time" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="upload_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="upload" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="view" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="wallet" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="way" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="web-setting_1" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="web-setting" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="server" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="chip" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="chip-full" {...args} />
          </div>
          <div
            style={{
              ...style,
              background: args.color !== 'white' ? 'white' : 'black',
            }}
          >
            <Icomoon type="computer" {...args} />
          </div>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
