import React, { forwardRef, Key, ReactNode } from 'react';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  makeStyles,
  ListItemIconProps,
  ListItemTextProps,
  ListItemProps,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export type NestedItems = {
  key?: Key;
  icon?: ReactNode;
  MuiListItemProps?: ListItemProps;
  MuiListItemTextProps?: ListItemTextProps;
};

export interface NestedListItemProps {
  /**
   * Mui `ListItem` Props
   */
  MuiListItemProps?: ListItemProps;
  /**
   * Mui `ListItemText` props
   */
  MuiListItemTextProps?: ListItemTextProps;
  /**
   * Mui `ListItemIcon` props
   */
  MuiListItemIconProps?: ListItemIconProps;
  /**
   * Set icon before text.
   */
  icon?: ReactNode;
  /**
   * If has items will auto generate nested list.
   */
  items?: NestedItems[];
  /**
   * Set default `isOpen` state.
   */
  defaultIsOpen?: boolean;
}

const NestedListItem = forwardRef<HTMLLIElement, NestedListItemProps>(
  (props, ref) => {
    const {
      icon: iconProp,
      items,
      defaultIsOpen = false,
      MuiListItemProps,
      MuiListItemIconProps,
      MuiListItemTextProps,
    } = props;
    const { onClick, button, ...otherMuiListItemProps } =
      MuiListItemProps || {};
    const [isOpen, setIsOpen] = React.useState(defaultIsOpen);
    const classes = useStyles(props);
    const hasItems = items && items.length > 0;

    const handleClick = (e) => {
      if (!hasItems && onClick) {
        onClick(e);
      }
      if (hasItems) {
        setIsOpen((value) => !value);
      }
    };

    const renderIcon = (icon) => {
      if (icon) {
        return <ListItemIcon {...MuiListItemIconProps}>{icon}</ListItemIcon>;
      }
      return undefined;
    };

    const renderExpendIcon = () => {
      if (hasItems) {
        return isOpen ? <ExpandLess /> : <ExpandMore />;
      }
      return undefined;
    };

    const renderCollapse = () => {
      if (hasItems) {
        return (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List disablePadding>
              {items &&
                items.map((item: NestedItems) => {
                  const {
                    key,
                    icon,
                    MuiListItemTextProps,
                    MuiListItemProps,
                  } = item;
                  // Pending issue waiting for solved.
                  // https://github.com/mui-org/material-ui/issues/14971
                  const { button, ...otherMuiListItemProps } =
                    MuiListItemProps || {};
                  return (
                    <ListItem
                      key={key}
                      className={clsx(
                        MuiListItemProps?.className,
                        classes.nested
                      )}
                      button={button as any}
                      {...otherMuiListItemProps}
                    >
                      {renderIcon(icon)}
                      <ListItemText {...MuiListItemTextProps} />
                    </ListItem>
                  );
                })}
            </List>
          </Collapse>
        );
      }
      return undefined;
    };

    return (
      <>
        <ListItem
          ref={ref}
          onClick={handleClick}
          button={button as any}
          {...otherMuiListItemProps}
        >
          {renderIcon(iconProp)}
          <ListItemText {...MuiListItemTextProps} />
          {renderExpendIcon()}
        </ListItem>
        {renderCollapse()}
      </>
    );
  }
);

export default NestedListItem;
