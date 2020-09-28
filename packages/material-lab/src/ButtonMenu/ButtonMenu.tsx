import React, {
  Children,
  cloneElement,
  FC,
  ReactElement,
  useState,
  isValidElement,
} from 'react';
import { Menu, MenuProps } from '@material-ui/core';

export interface ButtonMenuProps {
  /**
   * The button to open `Menu`.
   */
  button: ReactElement;
  /**
   * The content of the `Menu`.
   */
  children?: ReactElement;
  /**
   * Mui Menu props.
   */
  MuiMenuProps?: MenuProps;
}

const ButtonMenu: FC<ButtonMenuProps> = ({
  button,
  children,
  MuiMenuProps,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { anchorEl: anchorElProp, open, onClose, ...otherMenuProps } =
    MuiMenuProps || {};

  function handleClose(e, reason) {
    setAnchorEl(null);
    if (onClose) {
      onClose(e, reason);
    }
  }

  const controledButton = cloneElement(button, {
    onClick: (e) => {
      setAnchorEl(e.currentTarget);
      if (button.props.onClick) {
        button.props.onClick(e);
      }
    },
  });

  const items = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        onClick: (e) => {
          handleClose(e, 'itemClick');
          if (child.props.onClick) {
            child.props.onClick(e);
          }
        },
      });
    }
    return undefined;
  });

  return (
    <>
      {controledButton}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        {...otherMenuProps}
      >
        {items}
      </Menu>
    </>
  );
};

export default ButtonMenu;
