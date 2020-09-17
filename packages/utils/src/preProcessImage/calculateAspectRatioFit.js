/**
 * Conserve aspect ratio of the original region. Useful when shrinking
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
export default function calculateAspectRatioFit(
  srcWidth,
  srcHeight,
  maxWidth,
  maxHeight
) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  // If source width and height both smaller than max just return source.
  if (srcWidth <= maxWidth && srcHeight <= maxHeight) {
    return { width: srcWidth, height: srcHeight };
  }

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}
