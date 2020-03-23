import React from 'react';

import { withRouter } from 'react-router'
import { storiesOf } from '@storybook/react';

import { Route, Switch } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';
import NestedMenu from '@e-group/material-module/NestedMenu';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BusinessIcon from "@material-ui/icons/Business";

const routes = [
  {
    path: '/',
    exact: true,
    breadcrumbName: '首頁',
    icon: <DashboardIcon />,
  },
  {
    path: '/a',
    breadcrumbName: 'A',
    icon: <PeopleIcon />,
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
        breadcrumbName: 'C'
      }
    ]
  },
]

storiesOf('NestedMenu', module)
  .addDecorator(StoryRouter())
  .add('default', () => {
    const Demo = withRouter(({ location }) => (
      <>
        <NestedMenu
          routes={routes}
          location={location}
        />
        <Switch>
          <Route exact path="/" render={() => (<div>Home</div>)}/>
          <Route path="/a" render={() => (<div>A</div>)}/>
          <Route exact path="/b" render={() => (<div>B</div>)}/>
          <Route path="/b/c" render={() => (<div>B/C</div>)}/>
        </Switch>
      </>
    ))
    return <Demo />
  }
);
