import { useCallback, useRef, useState } from 'react';
import { jsPDF as JsPDF } from 'jspdf';
import pdfAddPages from '@e-group/utils/pdfAddPages';

export default function useMediaPrint(printBoxId: string) {
  const [loading, setLoading] = useState(false)
  const itemRefs = useRef<HTMLDivElement[]>([]);

  const handleSavePdf = useCallback(
    async (filename?: string) => {
      const pdf = new JsPDF('p', 'mm', 'a4');
      setLoading(true)
      await pdfAddPages(printBoxId, pdf, itemRefs.current, {
        xPadding: 8,
        yPadding: 8,
      });
      setLoading(false)
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
    handleSavePdf,
    handleMediaPrint,
    itemRefs,
    loading
  };
}
