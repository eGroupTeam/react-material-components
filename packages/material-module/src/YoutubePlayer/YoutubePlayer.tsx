import React, { FC, HTMLAttributes } from 'react';

import clsx from 'clsx';
import queryString from 'query-string';

import {
  createStyles,
  Dialog,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'relative',
      display: 'block',
      width: '100%',
      overflow: 'hidden',

      '&::before': {
        display: 'block',
        content: "''",
        zIndex: 0,
        paddingTop: '56.25%',
      },
    },
    reveal: {
      '& $poster, $btn': {
        opacity: 0,
        visibility: 'hidden',
        transition: '.8s linear',
      },
    },
    poster: {
      backgroundImage: (props: YoutubePlayerProps) =>
        `url(${props.placeholder})`,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      zIndex: 1,
      transition: '.3s',
    },
    iframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      border: 0,
    },
    btn: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: theme.spacing(8),
      height: theme.spacing(8),
      zIndex: 2,
      transition: '.3s',
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.palette.secondary.light,
      border: 0,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      boxShadow: theme.shadows[4],
      outline: 0,

      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    icon: {
      color: '#ffffff',
    },
  });

export interface YoutubePlayerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Iframe src.
   */
  iframeSrc: string;
  /**
   * Iframe title.
   */
  iframeTitle?: string;
  /**
   * Iframe width.
   */
  iframeWidth?: number;
  /**
   * Iframe height.
   */
  iframeHeight?: number;
  /**
   * Video placeholder path.
   */
  placeholder?: string;
  /**
   * The variant to use.
   */
  variant?: 'default' | 'lightbox';
}

const YoutubePlayer: FC<YoutubePlayerProps & WithStyles<typeof styles>> = (
  props
) => {
  const {
    className,
    classes,
    placeholder,
    iframeSrc,
    iframeTitle,
    iframeWidth,
    iframeHeight,
    variant = 'default',
    ...other
  } = props;
  const [isPlay, setIsPlay] = React.useState(false);
  const isLightbox = variant === 'lightbox';
  const { url, query } = queryString.parseUrl(iframeSrc);

  const handlePlay = () => {
    setIsPlay(true);
  };

  const handleStop = () => {
    setIsPlay(false);
  };

  if (isLightbox) {
    return (
      <>
        <Dialog open={isPlay} maxWidth="md" fullWidth onClose={handleStop}>
          <div className={classes.wrapper}>
            <iframe
              className={classes.iframe}
              src={`${url}?${queryString.stringify({
                ...query,
                autoplay: Number(isPlay),
              })}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={iframeTitle}
            />
          </div>
        </Dialog>
        <div className={clsx(className, classes.wrapper)} {...other}>
          <div className={classes.poster} />
          <button className={classes.btn} onClick={handlePlay}>
            <PlayArrowIcon className={classes.icon} />
          </button>
        </div>
      </>
    );
  }

  return (
    <div
      className={clsx(className, classes.wrapper, {
        [classes.reveal]: isPlay,
      })}
      {...other}
    >
      <div className={classes.poster} />
      <button className={classes.btn} onClick={handlePlay}>
        <PlayArrowIcon className={classes.icon} />
      </button>
      <iframe
        className={classes.iframe}
        width={iframeWidth}
        height={iframeHeight}
        src={`${url}?${queryString.stringify({
          ...query,
          autoplay: Number(isPlay),
        })}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={iframeTitle}
      />
    </div>
  );
};

export default withStyles(styles)(YoutubePlayer);
