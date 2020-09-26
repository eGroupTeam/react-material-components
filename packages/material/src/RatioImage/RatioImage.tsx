import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  ImgHTMLAttributes,
} from 'react';

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

function calcPaddingTop(ratio: string) {
  const array = ratio.split(':');
  const denominator = parseInt(array[0], 10);
  const numerator = parseInt(array[1], 10);
  return `${(numerator / denominator) * 100}%`;
}

const isBrowser = typeof document !== 'undefined';

const styles = () =>
  createStyles({
    root: {
      position: 'relative',
      paddingTop: (props: RatioImageProps) =>
        calcPaddingTop(props.ratio || '16:9'),
    },
    container: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
      overflow: 'hidden',
    },
    useObjectFit: {
      width: '100%',
      objectFit: (props: RatioImageProps) => props.fit || 'contain',
    },
    fixedObjectFit: {
      width: '100%',
      height: '100%',
      backgroundImage: (props: RatioImageProps) => `url(${props.src})`,
      backgroundSize: (props: RatioImageProps) => props.fit || 'contain',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    },
  });
export interface RatioImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Image object fit.
   */
  fit?: CSSProperties['objectFit'];
  /**
   * Image ratio
   */
  ratio?: string;
}

const RatioImage = forwardRef<
  HTMLImageElement,
  RatioImageProps & WithStyles<typeof styles>
>(function RatioImage(props, ref) {
  const { classes, className, ratio, src, fit, style, ...other } = props;
  const [height, setHeight] = useState<number>();
  const supportObjectFit =
    isBrowser &&
    !(
      document.documentElement.style.objectFit === undefined ||
      'objectFit' in document.documentElement.style === false
    );
  const rootEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(rootEl?.current?.offsetHeight);
  }, [rootEl]);

  useEffect(() => {
    function handleResize() {
      setHeight(rootEl?.current?.offsetHeight);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [rootEl]);

  const renderContent = () => {
    if (supportObjectFit) {
      return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          ref={ref}
          height={height}
          className={classes.useObjectFit}
          src={src}
          {...other}
        />
      );
    }
    return <div className={classes.fixedObjectFit} />;
  };

  return (
    <div ref={rootEl} className={clsx(className, classes.root)} style={style}>
      <div className={classes.container}>{renderContent()}</div>
    </div>
  );
});

export default withStyles(styles)(RatioImage);
