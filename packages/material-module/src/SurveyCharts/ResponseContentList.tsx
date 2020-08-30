import React, { FC } from 'react';
import { Grid, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { ResponseContent } from './SurveyCharts';

export interface ResponseContentListProps {
  data?: ResponseContent[];
}

const ResponseContentList: FC<ResponseContentListProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <Table>
        <TableBody>
          {data.map((el, index) => (
            <TableRow key={`response-content-${index}`}>
              <TableCell>{`${el.responseContent} (${el.responseContentCount})`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default ResponseContentList;
