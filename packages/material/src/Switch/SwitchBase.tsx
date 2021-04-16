import React, { forwardRef, HTMLAttributes, ReactNode, Ref } from 'react';
import clsx from 'clsx';
import {
  capitalize,
  withStyles,
  fade,
  createStyles,
  Theme,
  WithStyles,
} from '@material-ui/core';
import SwitchIconButton, { SwitchIconButtonProps } from './SwitchIconButton';

export const styles = (theme: Theme) =>
  createStyles({
    /* Styles applied to the root element. */
    root: {
      display: 'inline-flex',
      width: 34 + 12 * 2,
      height: 14 + 12 * 2,
      overflow: 'hidden',
      padding: 12,
      boxSizing: 'border-box',
      position: 'relative',
      flexShrink: 0,
      zIndex: 0, // Reset the stacking context.
      verticalAlign: 'middle', // For correct alignment with the text.
      '@media print': {
        colorAdjust: 'exact',
      },
    },
    /* Styles applied to the root element if `edge="start"`. */
    edgeStart: {
      marginLeft: -8,
    },
    /* Styles applied to the root element if `edge="end"`. */
    edgeEnd: {
      marginRight: -8,
    },
    /* Styles applied to the internal `SwitchIconButton` component's `root` class. */
    switchBase: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1, // Render above the focus ripple.
      color:
        theme.palette.type === 'light'
          ? theme.palette.grey[50]
          : theme.palette.grey[400],
      transition: theme.transitions.create(['left', 'transform'], {
        duration: theme.transitions.duration.shortest,
      }),
      '&$checked': {
        transform: 'translateX(20px)',
      },
      '&$disabled': {
        color:
          theme.palette.type === 'light'
            ? theme.palette.grey[400]
            : theme.palette.grey[800],
      },
      '&$checked + $track': {
        opacity: 0.5,
      },
      '&$disabled + $track': {
        opacity: theme.palette.type === 'light' ? 0.12 : 0.1,
      },
    },
    /* Styles applied to the internal SwitchIconButton component's root element if `color="primary"`. */
    colorPrimary: {
      '&$checked': {
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: fade(
            theme.palette.primary.main,
            theme.palette.action.hoverOpacity
          ),
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
      },
      '&$disabled': {
        color:
          theme.palette.type === 'light'
            ? theme.palette.grey[400]
            : theme.palette.grey[800],
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.primary.main,
      },
      '&$disabled + $track': {
        backgroundColor:
          theme.palette.type === 'light'
            ? theme.palette.common.black
            : theme.palette.common.white,
      },
    },
    /* Styles applied to the internal SwitchIconButton component's root element if `color="secondary"`. */
    colorSecondary: {
      '&$checked': {
        color: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: fade(
            theme.palette.secondary.main,
            theme.palette.action.hoverOpacity
          ),
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
      },
      '&$disabled': {
        color:
          theme.palette.type === 'light'
            ? theme.palette.grey[400]
            : theme.palette.grey[800],
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.secondary.main,
      },
      '&$disabled + $track': {
        backgroundColor:
          theme.palette.type === 'light'
            ? theme.palette.common.black
            : theme.palette.common.white,
      },
    },
    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      width: 40,
      height: 24,
      padding: 7,
      '& $thumb': {
        width: 16,
        height: 16,
      },
      '& $switchBase': {
        padding: 4,
        '&$checked': {
          transform: 'translateX(16px)',
        },
      },
    },
    /* Pseudo-class applied to the internal `SwitchIconButton` component's `checked` class. */
    checked: {},
    /* Pseudo-class applied to the internal SwitchIconButton component's disabled class. */
    disabled: {},
    /* Styles applied to the internal SwitchIconButton component's input element. */
    input: {
      left: '-100%',
      width: '300%',
    },
    /* Styles used to create the thumb passed to the internal `SwitchIconButton` component `icon` prop. */
    thumb: {
      boxShadow: theme.shadows[1],
      backgroundColor: 'currentColor',
      width: 20,
      height: 20,
      borderRadius: '50%',
    },
    /* Styles applied to the track element. */
    track: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 3,
      paddingLeft: 3,
      color: theme.palette.common.white,
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: theme.typography.body2.fontSize,
      height: '100%',
      width: '100%',
      borderRadius: 14 / 2,
      zIndex: -1,
      transition: theme.transitions.create(['opacity', 'background-color'], {
        duration: theme.transitions.duration.shortest,
      }),
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.common.black
          : theme.palette.common.white,
      opacity: theme.palette.type === 'light' ? 0.38 : 0.3,
    },
    checkedTrack: {
      width: 20,
      overflow: 'hidden',
    },
    uncheckedTrack: {
      width: 20,
      overflow: 'hidden',
    },
  });

export interface SwitchBaseProps
  extends Omit<SwitchIconButtonProps, 'checkedIcon' | 'icon' | 'type'> {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean;
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'default' | 'primary' | 'secondary';
  /**
   * @ignore
   */
  defaultChecked?: boolean;
  /**
   * If `true`, the switch will be disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple?: boolean;
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   */
  edge?: 'end' | 'start' | false;
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: HTMLAttributes<HTMLInputElement>;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: Ref<HTMLInputElement>;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (event, checked: boolean) => void;
  /**
   * If `true`, the `input` element will be required.
   */
  required?: boolean;
  /**
   * The size of the switch.
   * `small` is equivalent to the dense switch styling.
   */
  size?: 'medium' | 'small';
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: any;
  /**
   * The track to display when the component is unchecked.
   */
  uncheckedTrack?: ReactNode;
  /**
   * The track to display when the component is checked.
   */
  checkedTrack?: ReactNode;
}

const SwitchBase = forwardRef<
  HTMLButtonElement,
  SwitchBaseProps & WithStyles<typeof styles>
>(function SwitchBase(props, ref) {
  const {
    classes,
    className,
    color = 'secondary',
    edge = false,
    size = 'medium',
    uncheckedTrack,
    checkedTrack,
    ...other
  } = props;

  const icon = <span className={classes.thumb} />;

  return (
    <span
      className={clsx(
        classes.root,
        {
          [classes.edgeStart]: edge === 'start',
          [classes.edgeEnd]: edge === 'end',
          [classes[`size${capitalize(size)}`]]: size !== 'medium',
        },
        className
      )}
    >
      <SwitchIconButton
        type="checkbox"
        icon={icon}
        checkedIcon={icon}
        classes={{
          root: clsx(classes.switchBase, classes[`color${capitalize(color)}`]),
          input: classes.input,
          checked: classes.checked,
          disabled: classes.disabled,
        }}
        ref={ref}
        {...other}
      />
      <div className={classes.track}>
        <div className={classes.uncheckedTrack}>{uncheckedTrack}</div>
        <div className={classes.checkedTrack}>{checkedTrack}</div>
      </div>
    </span>
  );
});

export default withStyles(styles, { name: 'EgSwitchBase' })(SwitchBase);
