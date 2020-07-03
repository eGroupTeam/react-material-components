import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';

const ButtonMenu = ({ button, children, MuiMenuProps }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function _handleClose(e) {
    setAnchorEl(null);
    const { onClose } = MuiMenuProps || {};
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

  const { anchorEl: anchorElProp, open, onClose, ...otherMenuProps } =
    MuiMenuProps || {};

  return (
    <>
      {controledButton}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={_handleClose}
        {...otherMenuProps}
      >
        {items}
      </Menu>
    </>
  );
};

ButtonMenu.propTypes = {
  /**
   * The button to open `Menu`.
   */
  button: PropTypes.node.isRequired,
  /**
   * The content of the `Menu`.
   */
  children: PropTypes.node,
  /**
   * Mui Menu props.
   */
  MuiMenuProps: PropTypes.object
};

export default ButtonMenu;
