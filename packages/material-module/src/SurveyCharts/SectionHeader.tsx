import React, { FC, MouseEvent } from 'react';
import { Typography, makeStyles, Theme, IconButton } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { Question } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
}));

export interface SectionHeaderProps {
  question: Question;
  totalResponses: number;
  onDownloadImageClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  question,
  totalResponses,
  onDownloadImageClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">{question.questionName}</Typography>
      <div className={classes.grow} />
      <IconButton disableRipple onClick={onDownloadImageClick}>
        <ImageIcon />
      </IconButton>
      <Typography variant="body2">
        填答人數:{question.questionCount}/{totalResponses}人
      </Typography>
    </div>
  );
};

export default SectionHeader;
