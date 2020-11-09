import React, { FC, HTMLAttributes, MouseEventHandler } from 'react';

import calcPaddingTop from '@e-group/utils/calcPaddingTop';
import clsx from 'clsx';
import queryString from 'query-string';

import {
  createStyles,
  Dialog,
  ModalProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import useControlled from '@e-group/hooks/useControlled';

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
        paddingTop: (props: YoutubePlayerProps) =>
          calcPaddingTop(props.ratio || '16:9'),
      },
    },
    dialogWrapper: {
      position: 'relative',
      overflow: 'hidden',
      paddingTop: calcPaddingTop('16:9'),
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
  /**
   * Placeholder image ratio and if present it'll use dialog mode automatically.
   */
  ratio?: string;
  /**
   * Set this to hide play button.
   */
  hidePlayButton?: boolean;
  /**
   * Set this to control video play.
   */
  isPlay?: boolean;
  /**
   * Play button click event.
   */
  onVideoPlay?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Dialog close event.
   */
  onClose?: ModalProps['onClose'];
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
    ratio,
    hidePlayButton,
    isPlay: isPlayProp,
    onVideoPlay,
    onClose,
    ...other
  } = props;

  const [isPlay, setIsPlay] = useControlled({
    controlled: isPlayProp,
    default: false,
  });
  const isLightbox = variant === 'lightbox' || !!ratio;
  const { url, query } = queryString.parseUrl(iframeSrc);

  const handlePlay: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsPlay(true);
    if (onVideoPlay) {
      onVideoPlay(e);
    }
  };

  const handleCloseDialog: ModalProps['onClose'] = (e, reason) => {
    setIsPlay(false);
    if (onClose) {
      onClose(e, reason);
    }
  };

  return (
    <>
      {isLightbox && (
        <Dialog
          open={isPlay}
          maxWidth="md"
          fullWidth
          onClose={handleCloseDialog}
        >
          <div className={classes.dialogWrapper}>
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
      )}
      <div
        className={clsx(className, classes.wrapper, {
          [classes.reveal]: isPlay && !isLightbox,
        })}
        {...other}
      >
        <div className={classes.poster} />
        {!hidePlayButton && (
          <button className={classes.btn} onClick={handlePlay}>
            <PlayArrowIcon className={classes.icon} />
          </button>
        )}
        {!isLightbox && (
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
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(YoutubePlayer);
