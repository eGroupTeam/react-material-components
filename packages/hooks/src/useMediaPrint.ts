import { useCallback, useRef } from 'react';
import { jsPDF as JsPDF } from 'jspdf';
import pdfAddPages from '@e-group/utils/pdfAddPages';

export default function useMediaPrint(printBoxId: string) {
  const printRefs = useRef<HTMLDivElement>(null);

  const handlePrintPdf = useCallback(
    async (filename?: string) => {
      if (!printRefs.current) {
        return;
      }
      const pdf = new JsPDF('p', 'mm', 'a4');
      await pdfAddPages(printBoxId, pdf, [printRefs.current], {
        xPadding: 8,
        yPadding: 8,
      });
      pdf.save(filename);
    },
    [printBoxId],
  )

  const handleMediaPrint = useCallback(
    () => {
      const css = '@page { size: A4 portrait; }';
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
  
      style.media = 'print';
      style.appendChild(document.createTextNode(css));
  
      head.appendChild(style);
      window.print();
      head.removeChild(style);
    },
    [],
  )

  return {
    handlePrintPdf,
    handleMediaPrint,
    printRefs,
  };
}
