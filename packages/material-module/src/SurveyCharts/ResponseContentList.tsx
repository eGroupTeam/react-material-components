import React, { FC, useState } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { ResponseContent } from './types';

export interface ResponseContentListProps {
  data?: ResponseContent[];
}

const ResponseContentList: FC<ResponseContentListProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  if (!data) {
    return null;
  }

  const renderContent = () => {
    if (data.length > 10) {
      const EndIcon = open ? ArrowDropUpIcon : ArrowDropDownIcon;
      const sliceData = open ? data : data.slice(0, 9);
      return (
        <>
          {sliceData.map((el, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index}>
              <TableCell>{`${el.responseContent} (${el.responseContentCount})`}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <div style={{ display: 'flex' }}>
              <Button
                fullWidth
                endIcon={<EndIcon />}
                onClick={() => {
                  setOpen((open) => !open);
                }}
              >
                {open ? '查看部分' : '查看全部'}
              </Button>
            </div>
          </TableRow>
        </>
      );
    }
    return data.map((el) => (
      <TableRow key={`${el.responseContent}${el.responseContentCount}`}>
        <TableCell>{`${el.responseContent} (${el.responseContentCount})`}</TableCell>
      </TableRow>
    ));
  };

  return (
    <Grid item xs={12}>
      <Table>
        <TableBody>{renderContent()}</TableBody>
      </Table>
    </Grid>
  );
};

export default ResponseContentList;
