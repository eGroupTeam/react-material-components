import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import MuiList from '@material-ui/core/List';
import NestedListItem from '@e-group/material/NestedListItem';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";

const routes = [
  {
    path: '/',
    exact: true,
    breadcrumbName: 'Home'
  },
  {
    path: '/a',
    breadcrumbName: 'Page A'
  },
  {
    path: '/b',
    breadcrumbName: 'Page B',
    icon: <DashboardIcon />,
    routes: [
      {
        path: '/b/:id',
        breadcrumbName: 'Page B Detail',
        icon: <PeopleIcon />,
      },
      {
        path: '/b/c',
        breadcrumbName: 'Page B Detail'
      }
    ]
  }
];

const Demo = ({ classes }) => {
  return (
    <MuiList component="nav">
      {routes.map(route => {
        const items = route.routes ? route.routes.map(el => ({
          ...el,
          MuiListItemProps: {
            onClick: action('clicked'),
            button: true
          },
          MuiListItemTextProps: {
            primary: el.breadcrumbName
          }
        })) : [];
        return (
          <NestedListItem
            key={route.path}
            icon={route.icon}
            MuiListItemProps={{
              onClick: action('clicked'),
              button: true
            }}
            MuiListItemTextProps={{
              primary: route.breadcrumbName
            }}
            items={items}
            defaultIsOpen
          />
        );
      })}
    </MuiList>
  );
};

storiesOf('NestedListItem', module).add('default', () => <Demo />);
