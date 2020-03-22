import React from 'react';

import { withRouter } from 'react-router'
import { storiesOf } from '@storybook/react';

import { Route, Switch, Link } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';
import InnerSideMenu from '@e-group/material-module/InnerSideMenu';
import Grid from "@material-ui/core/Grid";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";

storiesOf('InnerSideMenu', module)
  .addDecorator(StoryRouter())
  .add(
    'default',
    () => {
      const Demo = withRouter(({ location }) => (
        <Grid container style={{ height: '100vh'}}>
          <Grid item style={{ width: 256 }}>
            <InnerSideMenu
              style={{
                backgroundColor: "#fafafa",
                borderRight: '1.1px solid rgba(0,0,0,.12)',
                borderTop: '1.1px solid rgba(0,0,0,.12)'
              }}
              location={location}
              routes={[
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
                breadcrumbName: 'B'
              },
            ]} />
          </Grid>
          <Grid item>
            <Switch>
              <Route exact path="/" render={() => (<div>Home</div>)}/>
              <Route path="/a" render={() => (<div>A</div>)}/>
              <Route exact path="/b" render={() => (<div>B</div>)}/>
              <Route path="/b/c" render={() => (<div>B/C</div>)}/>
            </Switch>
            <Link to="/b/c">Go to nest</Link>
          </Grid>
        </Grid>
      ))
      return <Demo />
    },
    {
      info: {
        propTables: [InnerSideMenu],
      }
    }
  )