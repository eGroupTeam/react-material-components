import React, { FC, useEffect, useRef } from 'react';
import { Meta } from '@storybook/react';
import SurveyCharts from '@e-group/material-module/SurveyCharts';
import { Button } from '@material-ui/core';
import useMediaPrint from '@e-group/hooks/useMediaPrint';
import PdfPrintBox from '@e-group/material/PdfPrintBox';
import PdfContainer from '@e-group/material/PdfContainer';
import data from './data';
import data1 from './data1';

export default {
  title: 'Modules/SurveyCharts',
  component: SurveyCharts,
} as Meta;

export const Default: FC = () => (
  <SurveyCharts data={data} totalResponses={300} />
);

export const WithRating: FC = () => (
  <SurveyCharts data={data1} totalResponses={1} />
);

export const WithUseRef: FC = () => {
  const rootRef = useRef(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    console.log(rootRef.current);
    console.log(itemRefs);
  }, []);

  return (
    <SurveyCharts
      ref={rootRef}
      data={data1}
      totalResponses={1}
      GridItemProps={{
        ref: (ref) => {
          if (ref) {
            itemRefs.current.push(ref);
          }
        },
      }}
    />
  );
};

export const WithDownloadPdf: FC = () => {
  const rootRef = useRef(null);
  const { itemRefs, handleMediaPrint, handleSavePdf, loading } = useMediaPrint('pdf-print-box');

  return (
    <>
      <Button onClick={() => handleSavePdf('survey.pdf')}>Download PDF</Button>
      <Button onClick={handleMediaPrint}>Print</Button>
      {loading && 'preparing'}
      <PdfPrintBox id="pdf-print-box" />
      <PdfContainer>
        <SurveyCharts
          ref={rootRef}
          data={data}
          totalResponses={300}
          GridItemProps={{
            ref: (ref) => {
              if (ref) {
                itemRefs.current.push(ref);
              }
            },
          }}
        />
      </PdfContainer>
    </>
  );
};
