import React, { FC, useEffect, useRef } from 'react';
import { Meta } from '@storybook/react';
import { jsPDF as JsPDF } from 'jspdf';
import SurveyCharts from '@e-group/material-module/SurveyCharts';
import pdfAddPages from '@e-group/utils/pdfAddPages';
import { Button } from '@material-ui/core';
import data from './data';
import data1 from './data1';

export default {
  title: 'Modules/SurveyCharts',
  component: SurveyCharts,
} as Meta;

export const Default: FC = () => (
  <SurveyCharts data={data} totalResponses={15} />
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
  const itemRefs = useRef<HTMLDivElement[]>([]);

  const handlePrintPdf = async () => {
    const pdf = new JsPDF('p', 'mm', 'a4');
    await pdfAddPages('pdf-print-box', pdf, itemRefs.current, {
      xPadding: 8,
      yPadding: 8,
    });
    pdf.save('survey.pdf');
  };

  return (
    <>
      <Button onClick={handlePrintPdf}>Download PDF</Button>
      <div
        id="pdf-print-box"
        style={{
          width: 980,
          position: 'absolute',
          left: -16384,
        }}
      />
      <div style={{ maxWidth: 980 }}>
        <SurveyCharts
          ref={rootRef}
          data={data}
          totalResponses={25}
          GridItemProps={{
            ref: (ref) => {
              if (ref) {
                itemRefs.current.push(ref);
              }
            },
          }}
        />
      </div>
    </>
  );
};
