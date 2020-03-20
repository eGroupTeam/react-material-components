import React from 'react';

import { withRouter } from 'react-router'
import { storiesOf } from '@storybook/react';

import { Route, Switch, Link } from 'react-router-dom';
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
      const ROOT_PATH = '/me'
      const Demo = withRouter(({ location }) => (
        <>
          <BottomNavigationMenu rootPath={ROOT_PATH} location={location} routes={[
            {
              path: ROOT_PATH,
              exact: true,
              breadcrumbName: '首頁',
              icon: <DashboardIcon />,
            },
            {
              path: `${ROOT_PATH}/a`,
              breadcrumbName: 'A',
              icon: <PeopleIcon />,
            },
            {
              path: `${ROOT_PATH}/b`,
              breadcrumbName: 'B',
              icon: <BusinessIcon />,
              routes: [
                {
                  path: `${ROOT_PATH}/b`,
                  exact: true,
                },
                {
                  path: `${ROOT_PATH}/b/c`,
                  breadcrumbName: 'C',
                  routes: [
                    {
                      path: `${ROOT_PATH}/b/c/d`,
                    },
                  ]
                }
              ]
            },
            {
              path: `${ROOT_PATH}/c`,
              breadcrumbName: 'C',
              icon: <PeopleIcon />,
            },
            {
              path: `${ROOT_PATH}/d`,
              breadcrumbName: 'D',
              icon: <PeopleIcon />,
            },
            {
              path: `${ROOT_PATH}/e`,
              breadcrumbName: 'E',
              icon: <PeopleIcon />,
            },
          ]} />
          <Switch>
            <Route exact path={ROOT_PATH} render={() => (<div>Home</div>)}/>
            <Route path={`${ROOT_PATH}/a`} render={() => (<div>A</div>)}/>
            <Route exact path={`${ROOT_PATH}/b`} render={() => (<div>B</div>)}/>
            <Route exact path={`${ROOT_PATH}/b/c`} render={() => (<div>B/C</div>)}/>
            <Route path={`${ROOT_PATH}/b/c/d`} render={() => (<div>B/C/D</div>)}/>
          </Switch>
          <Link to={`${ROOT_PATH}/b/c`}>Go to nest page</Link>
          <br />
          <Link to={`${ROOT_PATH}/b/c/d`}>Go to nest page</Link>
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