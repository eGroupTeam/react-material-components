import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@material-ui/core';

const ButtonMenu = ({ id, button, children, MenuProps }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function _handleClose(e) {
    setAnchorEl(null);
    const { onClose } = MenuProps || {};
    if (onClose) {
      onClose(e);
    }
  }

  const controledButton = React.cloneElement(button, {
    onClick: e => {
      setAnchorEl(e.currentTarget);
      if (button.props.onClick) {
        button.props.onClick(e);
      }
    }
  });

  const items = React.Children.map(children, child => {
    return React.cloneElement(child, {
      onClick: e => {
        _handleClose(e);
        if (child.props.onClick) {
          child.props.onClick(e);
        }
      }
    });
  });

  const {
    id: idProps,
    anchorEl: anchorElProp,
    open,
    onClose,
    ...otherMenuProps
  } = MenuProps || {};

  return (
    <React.Fragment>
      {controledButton}
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={_handleClose}
        {...otherMenuProps}
      >
        {items}
      </Menu>
    </React.Fragment>
  );
};

ButtonMenu.propTypes = {
  /**
   * The menu id use to defined MenuItem key.
   */
  id: PropTypes.string.isRequired,
  /**
   * The content of the IconButton.
   */
  button: PropTypes.node.isRequired,
  /**
   * The content of the Menu.
   */
  children: PropTypes.node,
  /**
   * MUI Menu props.
   */
  MenuProps: PropTypes.object
};

export default ButtonMenu;
