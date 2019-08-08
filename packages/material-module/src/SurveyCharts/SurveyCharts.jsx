import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import makeStyles from '@material-ui/core/styles/makeStyles';
import makeChartColors from '@e-group/utils/makeChartColors';

import {
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar
} from 'recharts';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';

import CustomAxisTick from './CustomAxisTick';
import CustomTooltip from './CustomTooltip';

const COLORS = makeChartColors();
const useStyles = makeStyles(theme => ({
  colorBlock: {
    width: '12px',
    height: '12px',
    display: 'inline-block',
    marginRight: '7px',
    marginBottom: '2px',
    verticalAlign: 'middle'
  },
  chartsContainer: {
    width: '100%',
    height: '100%',
    minHeight: 300
  },
  sectionHeader: {
    marginBottom: theme.spacing(2)
  },
  responsiveTable: {
    overflowX: 'auto'
  },
  table: {
    whiteSpace: 'nowrap'
  }
}));
const calcPercent = (a, b) => `${Math.round((a / b) * 100 * 100) / 100}%`;

const SurveyCharts = ({ groups, totalResponses }) => {
  const classes = useStyles();

  const renderTableBody = result => {
    switch (result.get('questionType')) {
      case 'rating': {
        const statistics = result.get('statistics');
        return (
          <TableBody>
            {result.get('optionList').map((el, index) => (
              <TableRow key={el.get('optionId')}>
                <TableCell component="th" scope="row">
                  {el.get('optionName')}
                </TableCell>
                <TableCell align="right">{el.get('optionCount')}</TableCell>
                <TableCell align="right">
                  {calcPercent(
                    el.get('optionCount'),
                    result.get('questionCount')
                  )}
                </TableCell>
              </TableRow>
            ))}
            {statistics && (
              <React.Fragment>
                <TableRow>
                  <TableCell rowSpan={5} style={{ borderBottom: 'none' }} />
                  <TableCell>最大值</TableCell>
                  <TableCell align="right">
                    {statistics.get('max')} 分
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>最小值</TableCell>
                  <TableCell align="right">
                    {statistics.get('min')} 分
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>總分</TableCell>
                  <TableCell align="right">
                    {statistics.get('totalScore')} 分
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>平均數</TableCell>
                  <TableCell align="right">
                    {statistics.get('mean')} 分
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>標準差</TableCell>
                  <TableCell align="right">
                    {statistics.get('standardDeviation')} 分
                  </TableCell>
                </TableRow>
              </React.Fragment>
            )}
          </TableBody>
        );
      }
      case 'choiceone': {
        return (
          <TableBody>
            {result.get('optionList').map((el, index) => (
              <TableRow key={el.get('optionId')}>
                <TableCell component="th" scope="row">
                  {el.get('optionName')}
                </TableCell>
                <TableCell align="right">{el.get('optionCount')}</TableCell>
                <TableCell align="right">
                  {calcPercent(
                    el.get('optionCount'),
                    result.get('questionCount')
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        );
      }
      case 'choicemulti': {
        return (
          <TableBody>
            {result.get('optionList').map((el, index) => (
              <TableRow key={el.get('optionId')}>
                <TableCell component="th" scope="row">
                  <div
                    className={classes.colorBlock}
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {el.get('optionName')}
                </TableCell>
                <TableCell align="right">{el.get('optionCount')}</TableCell>
                <TableCell align="right">
                  {calcPercent(el.get('optionCount'), totalResponses)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        );
      }
      case 'boolean': {
        const option = result.getIn(['optionList', 0]);
        return (
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {option.get('optionName')}
              </TableCell>
              <TableCell align="right">{option.get('optionCount')}</TableCell>
              <TableCell align="right">
                {calcPercent(option.get('optionCount'), totalResponses)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                否
              </TableCell>
              <TableCell align="right">
                {totalResponses - option.get('optionCount')}
              </TableCell>
              <TableCell align="right">
                {calcPercent(
                  totalResponses - option.get('optionCount'),
                  totalResponses
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        );
      }
      case 'Sorting': {
        return (
          <TableBody>
            {result.get('optionList').map((option, index) => (
              <TableRow key={option.get('optionId')}>
                <TableCell>{option.get('optionName')}</TableCell>
                {option.get('sortingNoCountList').map((el, index) => (
                  <TableCell
                    key={`table-cell-${index}`}
                    component="th"
                    scope="row"
                  >
                    {el}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        );
      }
      default:
        return undefined;
    }
  };

  const renderTableHead = result => {
    if (result.get('questionType') === 'Sorting') {
      return (
        <TableHead>
          <TableRow>
            <TableCell>答案選項</TableCell>
            {result
              .getIn(['optionList', 0, 'sortingNoCountList'])
              .map((el, index) => (
                <TableCell key={`排序${index + 1}`}>
                  <div
                    className={classes.colorBlock}
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {`排序${index + 1}`}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
      );
    }
    return (
      <TableHead>
        <TableRow>
          <TableCell>答案選項</TableCell>
          <TableCell align="right">填答次數</TableCell>
          <TableCell align="right">百分比</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const renderTable = result => {
    return (
      <div className={classes.responsiveTable}>
        <Table className={classes.table}>
          {renderTableHead(result)}
          {renderTableBody(result)}
        </Table>
      </div>
    );
  };

  const renderPieChart = data => {
    return (
      <PieChart>
        <Pie
          dataKey="value"
          data={data.toJS()}
          innerRadius={65}
          outerRadius={115}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  };

  const renderMultiBarChart = result => {
    return (
      <BarChart
        margin={{
          left: 100
        }}
        layout="vertical"
        data={result.get('data').toJS()}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis tick={<CustomAxisTick />} dataKey="name" type="category" />
        <Tooltip />
        <Bar dataKey="分數">
          {result.get('data').map((entry, index) => (
            <Cell
              key={entry.get('name')}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    );
  };

  const renderSortingBarChart = result => {
    const bars = result
      .getIn(['data', 0])
      .delete('name')
      .toList();
    return (
      <BarChart
        margin={{
          left: 100
        }}
        layout="vertical"
        data={result.get('data').toJS()}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis tick={<CustomAxisTick />} dataKey="name" type="category" />
        <Tooltip content={<CustomTooltip />} />
        {bars.map((value, index) => (
          <Bar
            key={index}
            dataKey={index}
            stackId="a"
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </BarChart>
    );
  };

  const renderCharts = result => {
    switch (result.get('questionType')) {
      case 'rating':
      case 'choiceone':
      case 'boolean': {
        return (
          <div className={classes.chartsContainer}>
            <ResponsiveContainer>
              {renderPieChart(result.get('data'))}
            </ResponsiveContainer>
          </div>
        );
      }
      case 'choicemulti': {
        return (
          <div className={classes.chartsContainer} style={{ paddingTop: 50 }}>
            <ResponsiveContainer>
              {renderMultiBarChart(result)}
            </ResponsiveContainer>
          </div>
        );
      }
      case 'Sorting': {
        return (
          <div className={classes.chartsContainer} style={{ paddingTop: 50 }}>
            <ResponsiveContainer>
              {renderSortingBarChart(result)}
            </ResponsiveContainer>
          </div>
        );
      }
      default:
        return undefined;
    }
  };

  const renderSectionHeader = result => {
    return (
      <Grid container item xs={12} className={classes.sectionHeader}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">
            {result.get('questionName')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Hidden xsDown implementation="css">
            <Typography align="right" variant="body2">
              填答人數： {result.get('questionCount')}/{totalResponses}人
            </Typography>
          </Hidden>
          <Hidden smUp implementation="css">
            <Typography variant="body2">
              填答人數： {result.get('questionCount')}/{totalResponses}人
            </Typography>
          </Hidden>
        </Grid>
      </Grid>
    );
  };

  const renderResponseContentList = result => {
    return (
      <Grid item xs={12}>
        <Table>
          <TableBody>
            {result.get('responseContentList').map((el, index) => (
              <TableRow key={`response-content-${index}`}>
                <TableCell>{`${el.get('responseContent')} (${el.get(
                  'responseContentCount'
                )})`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    );
  };

  const renderTableAndChart = result => {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={6}>
          {renderTable(result)}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderCharts(result)}
        </Grid>
      </React.Fragment>
    );
  };

  const renderSection = (result, index) => {
    return (
      <Grid key={result.get('questionId')} item container>
        {renderSectionHeader(result)}
        {result.get('questionType') === 'textarea'
          ? renderResponseContentList(result)
          : renderTableAndChart(result)}
      </Grid>
    );
  };

  return groups
    .map((group, key) => (
      <Grid key={key} item xs={12}>
        <Paper>
          <Box p={3}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="h6">{key || '其他'}</Typography>
              </Grid>
              {group.map(renderSection)}
            </Grid>
          </Box>
        </Paper>
      </Grid>
    ))
    .valueSeq();
};

SurveyCharts.propTypes = {
  groups: ImmutablePropTypes.map.isRequired,
  totalResponses: PropTypes.number.isRequired
};

export default SurveyCharts;
