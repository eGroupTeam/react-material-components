import React from 'react';

import { withRouter } from 'react-router'
import { storiesOf } from '@storybook/react';

import { Route, Switch } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';
import BottomNavigationMenu from '@e-group/material-module/BottomNavigationMenu';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BusinessIcon from "@material-ui/icons/Business";

storiesOf('BottomNavigationMenu', module)
  .addDecorator(StoryRouter())
  .add(
    'default',
    () => {
      const Demo = withRouter(({ location }) => (
        <>
          <BottomNavigationMenu location={location} routes={[
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
              breadcrumbName: 'B',
              icon: <BusinessIcon />,
              routes: [
                {
                  path: '/b',
                  exact: true,
                },
                {
                  path: '/b/c',
                  breadcrumbName: 'C'
                }
              ]
            },
            {
              path: '/c',
              breadcrumbName: 'C',
              icon: <PeopleIcon />,
            },
            {
              path: '/d',
              breadcrumbName: 'D',
              icon: <PeopleIcon />,
            },
            {
              path: '/e',
              breadcrumbName: 'E',
              icon: <PeopleIcon />,
            },
          ]} />
          <Switch>
            <Route exact path="/" render={() => (<div>Home</div>)}/>
            <Route path="/a" render={() => (<div>A</div>)}/>
            <Route exact path="/b" render={() => (<div>B</div>)}/>
            <Route path="/b/c" render={() => (<div>B/C</div>)}/>
          </Switch>
        </>
      ))
      return <Demo />
    },
    {
      info: {
        propTables: [BottomNavigationMenu],
      }
    }
  )