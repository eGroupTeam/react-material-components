import { jsPDF as JsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const getImageHeight = (
  pdfWidth: number,
  contentWidth: number,
  contentHeight: number
) => (pdfWidth / contentWidth) * contentHeight;

const addImage = async (
  pdf: JsPDF,
  pdfWidth: number,
  el: HTMLDivElement,
  options: PdfAppendImagesOptions = {}
) => {
  const { xPadding = 0, yPadding = 0 } = options;
  const canvas = await html2canvas(el);
  const contentWidth = canvas.width;
  const contentHeight = canvas.height;
  const imgWidth = pdfWidth - 2 * xPadding;
  const imgHeight = getImageHeight(imgWidth, contentWidth, contentHeight);
  const image = canvas.toDataURL('image/jpeg', 1.0);
  pdf.addImage(image, 'JPEG', xPadding, yPadding, imgWidth, imgHeight);
  // remove node
  el.remove();
};

const wrapGroup = (containerId: string, group: HTMLDivElement[]) => {
  const wrapper = document.createElement('div');
  group.forEach((el) => {
    wrapper.appendChild(el.cloneNode(true));
  });
  const container = document.getElementById(containerId);
  if (container) {
    container.append(wrapper);
  }
  return wrapper;
};

export type PdfAppendImagesOptions = {
  xPadding?: number;
  yPadding?: number;
};

const pdfAddPages = async (
  containerId: string,
  pdf: JsPDF,
  items: HTMLDivElement[],
  options: PdfAppendImagesOptions = {}
) => {
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  // Create page group by items and total items height should fit in page height.
  const pageGroups: HTMLDivElement[] = [];
  let group: HTMLDivElement[] = [];
  let leftHeight = pdfHeight;
  for (let i = 0; i < items.length; i += 1) {
    const el = items[i];
    const imgHeight = getImageHeight(pdfWidth, el.offsetWidth, el.offsetHeight);
    if (imgHeight > pdfHeight) {
      pageGroups.push(wrapGroup(containerId, [el]));
      return;
    }
    if (leftHeight > imgHeight) {
      group.push(el);
      leftHeight -= imgHeight;
    } else {
      i -= 1;
      pageGroups.push(wrapGroup(containerId, group));
      group = [];
      leftHeight = pdfHeight;
    }
  }
  // add last group
  if (group.length > 0) {
    pageGroups.push(wrapGroup(containerId, group));
  }

  for (let i = 0; i < pageGroups.length; i += 1) {
    const group = pageGroups[i];
    // eslint-disable-next-line no-await-in-loop
    await addImage(pdf, pdfWidth, group, options);
    if (i + 1 < pageGroups.length) {
      pdf.addPage();
    }
  }
};

export default pdfAddPages;
