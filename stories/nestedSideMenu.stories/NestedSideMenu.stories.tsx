import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import NestedSideMenu from '@e-group/material-module/NestedSideMenu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';

export default {
  title: 'Modules/NestedSideMenu',
  component: NestedSideMenu,
} as Meta;

const routes = [
  {
    path: '/',
    exact: true,
    breadcrumbName: '首頁',
    icon: <DashboardIcon />,
  },
  {
    key: 'subheader',
    subheader: 'subheader',
  },
  {
    path: '/a',
    breadcrumbName: 'A',
    icon: <PeopleIcon />,
    routes: [
      {
        path: '/a',
        routes: [
          {
            path: '/a',
            breadcrumbName: 'AB',
            icon: <BusinessIcon />,
            exact: true,
          },
        ],
      },
    ],
  },
  {
    path: '/b',
    icon: <BusinessIcon />,
    breadcrumbName: 'B',
    routes: [
      {
        path: '/b',
        breadcrumbName: 'B',
        icon: <BusinessIcon />,
        exact: true,
      },
      {
        path: '/b/c',
        breadcrumbName: 'C',
      },
    ],
  },
];

const Demo = withRouter(({ location }) => (
  <>
    <NestedSideMenu routes={routes} pathname={location.pathname} />
    <Switch>
      <Route exact path="/" render={() => <div>Home</div>} />
      <Route path="/a" render={() => <div>A</div>} />
      <Route exact path="/b" render={() => <div>B</div>} />
      <Route path="/b/c" render={() => <div>B/C</div>} />
    </Switch>
  </>
));

export const Default: FC = () => (
    <Router>
      <Demo />
    </Router>
  );
