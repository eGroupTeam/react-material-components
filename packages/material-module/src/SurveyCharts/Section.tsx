import React, { FC, useRef } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import html2canvas from 'html2canvas';
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
  const ref = useRef<HTMLElement>(null);

  const handleDownloadImage = () => {
    if (ref && ref.current) {
      // https://stackoverflow.com/questions/36213275/html2canvas-does-not-render-full-div-only-what-is-visible-on-screen
      html2canvas(ref.current, { scrollY: -window.scrollY }).then((canvas) => {
        const uri = canvas.toDataURL();
        const filename = `${question.questionName}.png`;
        const link = document.createElement('a');
        if (typeof link.download === 'string') {
          link.href = uri;
          link.download = filename;
          link.click();
        } else {
          window.open(uri);
        }
      });
    }
  };

  const renderContent = () => {
    switch (question.questionType) {
      case 'text':
      case 'textarea':
      case 'email':
      case 'date':
        return (
          <Grid container>
            <SectionHeader
              question={question}
              totalResponses={totalResponses}
              onDownloadImageClick={handleDownloadImage}
            />
            <ResponseContentList data={question.responseContentList} />
          </Grid>
        );
      case 'titleBlock':
        return (
          <>
            <div className={classes.decorate} />
            <Typography
              variant="h6"
              gutterBottom={question.questionDescription !== undefined}
            >
              {question.questionName}
            </Typography>
            <Typography>{question.questionDescription}</Typography>
          </>
        );
      default:
        return (
          <Grid container>
            <SectionHeader
              question={question}
              totalResponses={totalResponses}
              onDownloadImageClick={handleDownloadImage}
            />
            <TableAndChart
              question={question}
              totalResponses={totalResponses}
            />
          </Grid>
        );
    }
  };

  return (
    <Paper ref={ref} className={classes.root}>
      {renderContent()}
    </Paper>
  );
};

export default Section;
