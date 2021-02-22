import React, { FC } from 'react';

import { DropzoneOptions, useDropzone } from 'react-dropzone';

import {
  Typography,
  CircularProgress,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import clsx from 'clsx';

const styles = (theme: Theme) =>
  createStyles({
    // https://jsfiddle.net/prafuitu/vmL0ys1u/
    root: {
      '--border-color': theme.palette.text.secondary,
      '--border-weight': '2px',
      '--dash-size': '8px',
      '--gap-size': '8px',

      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: 200,
      outline: 'none',
      cursor: (props: FileUploadDropzoneProps) =>
        props.uploading ? 'auto' : 'pointer',

      '&::after': {
        content: '""',
        transition: 'all .6s ease',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
        linear-gradient(90deg, var(--border-color) 100%, transparent 100%) top left no-repeat,
        linear-gradient(90deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) top center repeat-x,
        linear-gradient(90deg, var(--border-color) 100%, transparent 100%) top right no-repeat,
        
        linear-gradient(0deg, var(--border-color) 100%, transparent 100%) top left no-repeat,
        linear-gradient(0deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) center left repeat-y,
        linear-gradient(0deg, var(--border-color) 100%, transparent 100%) bottom left no-repeat,
        
        linear-gradient(90deg, var(--border-color) 100%, transparent 100%) bottom left no-repeat,
        linear-gradient(90deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) bottom center repeat-x,
        linear-gradient(90deg, var(--border-color) 100%, transparent 100%) bottom right no-repeat,
        
        linear-gradient(0deg, var(--border-color) 100%, transparent 100%) top right no-repeat,
        linear-gradient(0deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) center right repeat-y,
        linear-gradient(0deg, var(--border-color) 100%, transparent 100%) bottom right no-repeat;
        background-size: var(--dash-size) var(--border-weight), calc(var(--dash-size) + var(--gap-size)) var(--border-weight), var(--dash-size) var(--border-weight), var(--border-weight) var(--dash-size), var(--border-weight) calc(var(--dash-size) + var(--gap-size)), var(--border-weight) var(--dash-size)`,
      },
    },
    dragActive: {
      '--border-color': theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
    },
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1,
    },
    icon: {
      fontSize: 40,
      marginBottom: theme.spacing(2),
    },
  });

export interface FileUploadDropzoneProps {
  onDrop?: DropzoneOptions['onDrop'];
  accept?: DropzoneOptions['accept'];
  uploading?: boolean;
  multiple?: boolean;
  completed?: number;
  inputRef?:
    | ((instance: HTMLInputElement | null) => void)
    | React.MutableRefObject<HTMLInputElement | null>
    | null;
}

const FileUploadDropzone: FC<
  FileUploadDropzoneProps & WithStyles<typeof styles>
> = ({
  classes,
  onDrop: onDropProp,
  uploading,
  accept,
  multiple = false,
  completed,
  inputRef,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    onDrop: onDropProp,
    accept,
    disabled: uploading,
  });

  const renderContent = () => {
    if (uploading) {
      const msg =
        acceptedFiles.length > 1
          ? `${acceptedFiles[0].name} 和其他 ${acceptedFiles.length - 1} 個檔案`
          : acceptedFiles[0].name;
      return (
        <div className={classes.center}>
          <CircularProgress
            variant="determinate"
            color="inherit"
            className={classes.icon}
            value={completed}
          />
          <Typography align="center" gutterBottom>
            檔案上傳中... {completed}%
          </Typography>
          <Typography align="center" color="textSecondary">
            {msg}
          </Typography>
        </div>
      );
    }
    return (
      <div className={classes.center}>
        <CloudUploadIcon color="inherit" className={classes.icon} />
        <Typography align="center" gutterBottom>
          {isDragActive ? '放開檔案開始上傳' : '從這裡上傳講綱檔案'}
        </Typography>
        <Typography align="center" color="textSecondary">
          {isDragActive
            ? '拖移至這裡的檔案將開始上傳'
            : '拖移檔案至此，或點擊開始上傳'}
        </Typography>
      </div>
    );
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.dragActive]: isDragActive,
      })}
      {...getRootProps()}
    >
      <input ref={inputRef} {...getInputProps()} multiple={multiple} />
      {renderContent()}
    </div>
  );
};

export default withStyles(styles)(FileUploadDropzone);
