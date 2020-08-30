import React, { FC } from 'react';

import calcPercent from './calcPercent';
import colors from './colors';

import {
  TableBody as MuiTableBody,
  TableRow,
  TableCell,
  makeStyles,
  Theme
} from '@material-ui/core';
import { Question } from './SurveyCharts';

const useStyles = makeStyles((theme: Theme) => ({
  colorBlock: {
    width: '12px',
    height: '12px',
    display: 'inline-block',
    marginRight: '7px',
    marginBottom: '2px',
    verticalAlign: 'middle'
  }
}));

export interface TableBodyProps {
  question: Question;
  totalResponses: number;
}

const TableBody: FC<TableBodyProps> = ({ question, totalResponses }) => {
  const classes = useStyles();
  switch (question.questionType) {
    case 'rating': {
      // const statistics = question.statistics;
      return (
        <MuiTableBody>
          {question?.optionList?.map(el => (
            <TableRow key={el.optionId}>
              <TableCell component="th" scope="row">
                {el.optionName}
              </TableCell>
              <TableCell align="right">{el.optionCount}</TableCell>
              <TableCell align="right">
                {calcPercent(el.optionCount, question.questionCount)}
              </TableCell>
            </TableRow>
          ))}
          {/* {statistics && (
            <React.Fragment>
              <TableRow>
                <TableCell rowSpan={5} style={{ borderBottom: 'none' }} />
                <TableCell>最大值</TableCell>
                <TableCell align="right">
                  {statistics.max} 分
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>最小值</TableCell>
                <TableCell align="right">
                  {statistics.min} 分
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>總分</TableCell>
                <TableCell align="right">
                  {statistics.totalScore} 分
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>平均數</TableCell>
                <TableCell align="right">
                  {statistics.mean} 分
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>標準差</TableCell>
                <TableCell align="right">
                  {statistics.standardDeviation} 分
                </TableCell>
              </TableRow>
            </React.Fragment>
          )} */}
        </MuiTableBody>
      );
    }
    case 'choiceone':
    case 'select': {
      return (
        <MuiTableBody>
          {question?.optionList?.map(el => (
            <TableRow key={el.optionId}>
              <TableCell component="th" scope="row">
                {el.optionName}
              </TableCell>
              <TableCell align="right">{el.optionCount}</TableCell>
              <TableCell align="right">
                {calcPercent(el.optionCount, question.questionCount)}
              </TableCell>
            </TableRow>
          ))}
        </MuiTableBody>
      );
    }
    case 'choicemulti': {
      return (
        <MuiTableBody>
          {question?.optionList?.map((el, index) => (
            <TableRow key={el.optionId}>
              <TableCell component="th" scope="row">
                <div
                  className={classes.colorBlock}
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                {el.optionName}
              </TableCell>
              <TableCell align="right">{el.optionCount}</TableCell>
              <TableCell align="right">
                {calcPercent(el.optionCount, totalResponses)}
              </TableCell>
            </TableRow>
          ))}
        </MuiTableBody>
      );
    }
    default:
      return null;
  }
};

export default TableBody;
