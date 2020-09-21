import React, { FC, useState, useCallback, useRef } from 'react';
import { Meta } from '@storybook/react';

import MediaStreamClipper, {
  useGetVideoSnapshot,
  FacingMode,
} from '@e-group/material-lab/MediaStreamClipper';
import { Grid, Typography, Button } from '@material-ui/core';

export default {
  title: 'Lab/MediaStreamClipper',
  component: MediaStreamClipper,
  argTypes: {
    timeout: { control: 'number', defaultValue: 30000 },
    mirrored: { control: 'boolean', defaultValue: true },
    intervalTime: { control: 'number', defaultValue: 33 },
  },
} as Meta;

export const Default: FC = (args) => {
  const [countTimeout, setCountTimeout] = useState(0);
  const [facingMode, setFacingMode] = useState<FacingMode>('user');
  const [blob, setBlob] = useState<string>();
  const [isStop, setIsStop] = useState(false);

  const handleGetIntervalShot = (
    blob: Blob,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D | null
  ) => {
    setBlob(URL.createObjectURL(blob));
    // Can get imageData by canvas and ctx
    // ctx.getImageData(0, 0, canvas.width, canvas.height).data
  };

  const handleClick = () => {
    setFacingMode((val) => (val === 'user' ? 'environment' : 'user'));
  };

  const handleToggle = () => {
    setIsStop((v) => !v);
  };

  const handleUserMediaFulfilled = useCallback((video) => {
    // eslint-disable-next-line no-param-reassign
    video.onloadedmetadata = function () {
      video.play();
    };
  }, []);
  const handleUserMediaRejected = useCallback((reason) => {
    console.log(reason);
  }, []);
  const handleGetUserMediaError = useCallback((error) => {
    console.log(error);
  }, []);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h6">Streaming</Typography>
        <MediaStreamClipper
          facingMode={facingMode}
          handleGetIntervalShot={handleGetIntervalShot}
          muted
          isStop={isStop}
          onTimeout={() => {
            setCountTimeout((v) => v + 1);
          }}
          controls
          autoPlay
          onGetUserMediaFulfilled={handleUserMediaFulfilled}
          onGetUserMediaRejected={handleUserMediaRejected}
          onGetUserMediaError={handleGetUserMediaError}
          {...args}
        />
        <br />
        <button onClick={handleClick}>Change facingMode</button>
        <button onClick={handleToggle}>{isStop ? 'Continue' : 'Stop'}</button>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">Snapshots</Typography>
        <img src={blob} alt="" />
      </Grid>
      <Grid item xs={12}>
        count timeout: {countTimeout}
      </Grid>
    </Grid>
  );
};

export const UseGetVideoSnapshot: FC = () => {
  const videoEl = useRef(null);
  const [getVideoSnapshot] = useGetVideoSnapshot(videoEl);
  const [blob, setBlob] = useState<string>();

  const handleClick = async () => {
    const { blob } = await getVideoSnapshot('image/jpeg', 0.8);
    setBlob(URL.createObjectURL(blob));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Video</Typography>
        <video ref={videoEl} src="/video.mp4" autoPlay controls />
        <br />
        <Button variant="contained" onClick={handleClick}>
          Snapshot
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Snapshots</Typography>
        <img src={blob} alt="" />
      </Grid>
    </Grid>
  );
};
