import React, { FC } from 'react';
import { Meta } from '@storybook/react';
import MuiList from '@material-ui/core/List';
import NestedListItem from '@e-group/material/NestedListItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';

export default {
  title: 'Components/NestedListItem',
  component: NestedListItem,
} as Meta;

export const Default: FC = () => {
  const routes = [
    {
      key: '/',
      path: '/',
      exact: true,
      breadcrumbName: 'Home',
    },
    {
      key: '/a',
      path: '/a',
      breadcrumbName: 'Page A',
    },
    {
      key: '/b',
      path: '/b',
      breadcrumbName: 'Page B',
      icon: <DashboardIcon />,
      routes: [
        {
          key: '/b/:id',
          path: '/b/:id',
          breadcrumbName: 'Page B Detail',
          icon: <PeopleIcon />,
        },
        {
          key: '/b/c',
          path: '/b/c',
          breadcrumbName: 'Page B Detail',
        },
      ],
    },
  ];
  return (
    <MuiList component="nav">
      {routes.map((route) => {
        const items = route.routes
          ? route.routes.map((el) => ({
              key: el.key,
              icon: el.icon,
              MuiListItemProps: {
                button: true,
              },
              MuiListItemTextProps: {
                primary: el.breadcrumbName,
              },
            }))
          : [];
        return (
          <NestedListItem
            key={route.path}
            icon={route.icon}
            MuiListItemProps={{
              button: true,
            }}
            MuiListItemTextProps={{
              primary: route.breadcrumbName,
            }}
            items={items}
            defaultIsOpen
          />
        );
      })}
    </MuiList>
  );
};
