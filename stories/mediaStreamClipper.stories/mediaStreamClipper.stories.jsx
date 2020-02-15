import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';

import MediaStreamClipper from '@e-group/material-lab/MediaStreamClipper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

storiesOf('MediaStreamClipper', module)
  .add('default', () => {
    const Demo = () => {
      const [facingMode, setFacingMode] = React.useState('user')
      const [blob, setBlob] = React.useState()

      const handleGetIntervalShot = blob => {
        setBlob(URL.createObjectURL(blob))
      };

      const handleClick = () => {
        setFacingMode(val =>
          val === 'user' ? 'environment' : 'user'
        )
      }

      return (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">Streaming</Typography>
            <MediaStreamClipper
              facingMode={facingMode}
              handleGetIntervalShot={handleGetIntervalShot}
              muted
              controls
              autoPlay
              mirrored
              intervalTime={number('intervalTime', 200)}
            />
            <br />
            <button onClick={handleClick}>Change facingMode</button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Snapshots</Typography>
            <img src={blob} alt=""/>
          </Grid>
        </Grid>
      )
    }
    return (
      <Demo />
    )
  });
