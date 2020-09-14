import React, { FC } from 'react';
import { Grid, Typography, Hidden, makeStyles, Theme } from '@material-ui/core';
import { Question } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

export interface SectionHeaderProps {
  question: Question;
  totalResponses: number;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  question,
  totalResponses,
}) => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">{question.questionName}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Hidden xsDown implementation="css">
          <Typography align="right" variant="body2">
            填答人數： {question.questionCount}/{totalResponses}人
          </Typography>
        </Hidden>
        <Hidden smUp implementation="css">
          <Typography variant="body2">
            填答人數： {question.questionCount}/{totalResponses}人
          </Typography>
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default SectionHeader;
