import React, {
  CSSProperties,
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import QRCodeImpl from 'qr.js/lib/QRCode';
import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel';
import usePrevious from '@e-group/hooks/usePrevious';
import mergeRefs from '@e-group/utils/mergeRefs';

// For canvas we're going to switch our drawing mode based on whether or not
// the environment supports Path2D. We only need the constructor to be
// supported, but Edge doesn't actually support the path (string) type
// argument. Luckily it also doesn't support the addPath() method. We can
// treat that as the same thing.
const getHasSupportPath2D = () => {
  try {
    new Path2D().addPath(new Path2D());
  } catch (e) {
    return false;
  }
  return true;
};
const SUPPORTS_PATH2D = getHasSupportPath2D();

const MARGIN_SIZE = 4;

// This is *very* rough estimate of max amount of QRCode allowed to be covered.
// It is "wrong" in a lot of ways (area is a terrible way to estimate, it
// really should be number of modules covered), but if for some reason we don't
// get an explicit height or width, I'd rather default to something than throw.
const DEFAULT_IMG_SCALE = 0.1;

function generatePath(modules: Modules, margin = 0): string {
  const ops: string[] = [];
  modules.forEach((row, y) => {
    let start: null | number = null;
    row.forEach((cell, x) => {
      if (!cell && start !== null) {
        // M0 0h7v1H0z injects the space with the move and drops the comma,
        // saving a char per operation
        ops.push(
          `M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`
        );
        start = null;
        return;
      }

      // end of row, clean up or skip
      if (x === row.length - 1) {
        if (!cell) {
          // We would have closed the op above already so this can only mean
          // 2+ light modules in a row.
          return;
        }
        if (start === null) {
          // Just a single dark module.
          ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
        } else {
          // Otherwise finish the current line.
          ops.push(
            `M${start + margin},${y + margin} h${x + 1 - start}v1H${
              start + margin
            }z`
          );
        }
        return;
      }

      if (cell && start === null) {
        start = x;
      }
    });
  });
  return ops.join('');
}

// We could just do this in generatePath, except that we want to support
// non-Path2D canvas, so we need to keep it an explicit step.
function excavateModules(
  modules: Modules,
  excavation: Exclude<Excavation, null>
): Modules {
  return modules.slice().map((row, y) => {
    if (y < excavation.y || y >= excavation.y + excavation.h) {
      return row;
    }
    return row.map((cell, x) => {
      if (x < excavation.x || x >= excavation.x + excavation.w) {
        return cell;
      }
      return false;
    });
  });
}

type Modules = Array<Array<boolean>>;
type Excavation = { x: number; y: number; w: number; h: number } | null;

export type ImageSettings = {
  src: string;
  height: number;
  width: number;
  excavate: boolean;
  x?: number;
  y?: number;
};
export interface QRCodeProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  bgColor?: string;
  fgColor?: string;
  style?: CSSProperties;
  includeMargin?: boolean;
  imageSettings?: ImageSettings;
}

export function getImageSettings(
  size: number,
  includeMargin: boolean,
  cells: Modules,
  imageSettings?: ImageSettings
): null | {
  x: number;
  y: number;
  h: number;
  w: number;
  excavation: Excavation;
} {
  if (imageSettings == null) {
    return null;
  }
  const margin = includeMargin ? MARGIN_SIZE : 0;
  const numCells = cells.length + margin * 2;
  const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE);
  const scale = numCells / size;
  const w = (imageSettings.width || defaultSize) * scale;
  const h = (imageSettings.height || defaultSize) * scale;
  const x =
    imageSettings.x == null
      ? cells.length / 2 - w / 2
      : imageSettings.x * scale;
  const y =
    imageSettings.y == null
      ? cells.length / 2 - h / 2
      : imageSettings.y * scale;

  let excavation: Excavation = null;
  if (imageSettings.excavate) {
    const floorX = Math.floor(x);
    const floorY = Math.floor(y);
    const ceilW = Math.ceil(w + x - floorX);
    const ceilH = Math.ceil(h + y - floorY);
    excavation = { x: floorX, y: floorY, w: ceilW, h: ceilH };
  }

  return { x, y, h, w, excavation };
}

const QRCode = forwardRef<HTMLCanvasElement, QRCodeProps>((
  props,
  ref
) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const imageEl = useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const {
    value,
    size = 128,
    level = 'L',
    bgColor = '#FFFFFF',
    fgColor = '#000000',
    includeMargin = false,
    style,
    imageSettings,
    ...otherProps
  } = props;
  const prevImageSettings = usePrevious(imageSettings);

  useEffect(() => {
    const currentSrc = imageSettings?.src;
    const prevSrc = prevImageSettings?.src;
    if (prevSrc !== currentSrc) {
      setImgLoaded(false);
    }
  }, [imageSettings?.src, prevImageSettings?.src]);

  const handleImageLoad = () => {
    setImgLoaded(true);
  };

  const update = useCallback(() => {
    // We'll use type===-1 to force QRCode to automatically pick the best type
    const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
    qrcode.addData(value);
    qrcode.make();

    if (canvasEl && canvasEl.current) {
      const canvas = canvasEl.current;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }

      let cells = qrcode.modules;
      if (cells === null) {
        return;
      }

      const margin = includeMargin ? MARGIN_SIZE : 0;
      const numCells = cells.length + margin * 2;
      const calculatedImageSettings = getImageSettings(
        size,
        includeMargin,
        cells,
        imageSettings
      );

      if (imageSettings && calculatedImageSettings != null) {
        if (calculatedImageSettings.excavation != null) {
          cells = excavateModules(cells, calculatedImageSettings.excavation);
        }
      }

      // We're going to scale this so that the number of drawable units
      // matches the number of cells. This avoids rounding issues, but does
      // result in some potentially unwanted single pixel issues between
      // blocks, only in environments that don't support Path2D.
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.height = size * pixelRatio;
      canvas.width = size * pixelRatio;
      const scale = (size / numCells) * pixelRatio;
      ctx.scale(scale, scale);

      // Draw solid background, only paint dark modules.
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, numCells, numCells);

      ctx.fillStyle = fgColor;
      if (SUPPORTS_PATH2D) {
        // $FlowFixMe: Path2D c'tor doesn't support args yet.
        ctx.fill(new Path2D(generatePath(cells, margin)));
      } else {
        cells.forEach((row, rdx) => {
          row.forEach((cell, cdx) => {
            if (cell) {
              ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
            }
          });
        });
      }
      if (
        imgLoaded &&
        imageEl &&
        imageEl.current &&
        calculatedImageSettings != null
      ) {
        ctx.drawImage(
          imageEl.current,
          calculatedImageSettings.x + margin,
          calculatedImageSettings.y + margin,
          calculatedImageSettings.w,
          calculatedImageSettings.h
        );
      }
    }
  }, [
    bgColor,
    fgColor,
    imageSettings,
    imgLoaded,
    includeMargin,
    level,
    size,
    value,
  ]);

  useEffect(() => {
    if (canvasEl && imageEl) {
      handleImageLoad();
    }
    update();
  }, [update]);

  useEffect(() => {
    update();
  });

  let img: ReactElement | null = null;
  const imgSrc = imageSettings && imageSettings.src;
  if (imageSettings && imgSrc != null) {
    img = (
      <img
        src={imgSrc}
        style={{ display: 'none' }}
        onLoad={handleImageLoad}
        ref={imageEl}
        alt=""
      />
    );
  }
  return (
    <>
      <canvas
        style={{
          height: size,
          width: size,
          ...style,
        }}
        height={size}
        width={size}
        ref={mergeRefs([canvasEl, ref])}
        {...otherProps}
      />
      {img}
    </>
  );
});

export default QRCode;
