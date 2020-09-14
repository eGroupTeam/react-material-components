import React, { FC } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import SectionHeader from './SectionHeader';
import ResponseContentList from './ResponseContentList';
import TableAndChart from './TableAndChart';
import { Question } from './types';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    padding: theme.spacing(3),
  },
  decorate: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: theme.palette.primary.main,
  },
}));
export interface SectionProps {
  question: Question;
  totalResponses: number;
}

const Section: FC<SectionProps> = ({ question, totalResponses }) => {
  const classes = useStyles();
  switch (question.questionType) {
    case 'text':
    case 'textarea':
      return (
        <Paper className={classes.root}>
          <Grid container>
            <SectionHeader
              question={question}
              totalResponses={totalResponses}
            />
            <ResponseContentList data={question.responseContentList} />
          </Grid>
        </Paper>
      );
    case 'titleBlock':
      return (
        <Paper className={classes.root}>
          <div className={classes.decorate} />
          <Typography
            variant="h6"
            gutterBottom={typeof question.questionDescription !== 'undefined'}
          >
            {question.questionName}
          </Typography>
          <Typography>{question.questionDescription}</Typography>
        </Paper>
      );
    default:
      return (
        <Paper className={classes.root}>
          <Grid container>
            <SectionHeader
              question={question}
              totalResponses={totalResponses}
            />
            <TableAndChart
              question={question}
              totalResponses={totalResponses}
            />
          </Grid>
        </Paper>
      );
  }
};

export default Section;
