import calculateAspectRatioFit from './calculateAspectRatioFit';

/**
 * Compress and resize image and keep aspect ratio.
 *
 * @param {node} canvas Canvas element
 * @param {node} img Image element
 * @param {object} options
 * @param {string} options.type ['image/jpeg'] compressed image type
 * @param {number} options.quality [1] compressed image quality
 * @param {number} options.maxWidth [1920] compressed image max width
 * @param {number} options.maxHeight [1920] compressed image max height
 * @param {boolean} options.orientation provide image orientation to reset it
 */
const preProcessImage = (canvas, img, options) => {
  const { type = 'image/jpeg', quality, maxWidth, maxHeight, orientation } =
    options || {};
  if (!canvas || !img) {
    throw TypeError('Canvas or Img element is required.');
  }

  const isCompressImage = typeof quality !== 'undefined';
  const isShrinkingImage =
    typeof maxWidth !== 'undefined' && typeof maxHeight !== 'undefined';
  const isResetOrientation = typeof orientation !== 'undefined';

  if (!isCompressImage && !isShrinkingImage && !isResetOrientation) {
    throw TypeError('At least need one option to handle image.');
  }

  return new Promise((resolve, reject) => {
    try {
      const ctx = canvas.getContext('2d');
      const imgWidth = img.width;
      const imgHeight = img.height;
      let currentImgWidth;
      let currentImgHeight;

      canvas.width = imgWidth;
      canvas.height = imgHeight;
      currentImgWidth = imgWidth;
      currentImgHeight = imgHeight;

      if (isShrinkingImage) {
        // Shrinking image
        const { width, height } = calculateAspectRatioFit(
          imgWidth,
          imgHeight,
          maxWidth,
          maxHeight
        );
        // Set canvas width and height.
        canvas.width = width;
        canvas.height = height;
        currentImgWidth = width;
        currentImgHeight = height;
      }

      if (isResetOrientation) {
        if (4 < orientation && orientation < 9) {
          canvas.width = currentImgHeight;
          canvas.height = currentImgWidth;
          currentImgWidth = canvas.height;
          currentImgHeight = canvas.width;
        }
        // transform context before drawing image
        switch (orientation) {
          case 2:
            ctx.transform(-1, 0, 0, 1, currentImgWidth, 0);
            break;
          case 3:
            ctx.transform(-1, 0, 0, -1, currentImgWidth, currentImgHeight);
            break;
          case 4:
            ctx.transform(1, 0, 0, -1, 0, currentImgHeight);
            break;
          case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
          case 6:
            ctx.transform(0, 1, -1, 0, currentImgHeight, 0);
            break;
          case 7:
            ctx.transform(0, -1, -1, 0, currentImgHeight, currentImgWidth);
            break;
          case 8:
            ctx.transform(0, -1, 1, 0, 0, currentImgWidth);
            break;
          default:
            break;
        }
      }

      // Draw canvas.
      ctx.drawImage(img, 0, 0, currentImgWidth, currentImgHeight);

      // Convert back to blob.
      canvas.toBlob(resolve, type, quality);
    } catch (error) {
      reject(error);
    }
  });
};

export default preProcessImage;
