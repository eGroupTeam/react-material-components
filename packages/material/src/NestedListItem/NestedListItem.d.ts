import * as React from 'react';
import { ListItemProps } from '@material-ui/core/ListItem';
import { ListItemTextProps } from '@material-ui/core/ListItemText';
import { ListItemIconProps } from '@material-ui/core/ListItemIcon';
import { List } from 'immutable';

export interface NestedListItemProps {
  /**
   * Mui `ListItem` Props
   */
  MuiListItemProps: ListItemProps;
  /**
   * Mui `ListItemText` props
   */
  MuiListItemTextProps: ListItemTextProps;
  /**
   * Mui `ListItemIcon` props
   */
  MuiListItemIconProps: ListItemIconProps;
  /**
   * Set icon before text.
   */
  icon: React.ReactNode;
  /**
   * If has items will auto generate nested list.
   */
  items: array;
}

declare const NestedListItem: React.ComponentType<NestedListItemProps>;

export default NestedListItem;
