import React, { FC } from 'react';
import { Meta } from '@storybook/react';

import { useLocation } from 'react-router';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@e-group/material/Breadcrumbs';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
} as Meta;

const MyBreadcrumbs = () => {
  const location = useLocation();
  return (
    <Breadcrumbs
      routes={[
        {
          key: '/',
          path: '/',
          exact: true,
          breadcrumbName: '首頁',
        },
        {
          key: '/a',
          path: '/a',
          breadcrumbName: 'A',
        },
        {
          key: '/b',
          path: '/b',
          breadcrumbName: 'B',
          routes: [
            {
              key: '/b-root',
              path: '/b',
              exact: true,
            },
            {
              key: '/b/c',
              path: '/b/c',
              breadcrumbName: 'C',
            },
          ],
        },
      ]}
      pathname={location.pathname}
      separator={<NavigateNextIcon />}
      MuiTypographyProps={{
        variant: 'h6',
      }}
      MuiLinkProps={{
        variant: 'h6',
        color: 'secondary',
      }}
    />
  );
};

export const Default: FC = () => {
  return (
    <Router>
      <MyBreadcrumbs />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/a">A</Link>
        </li>
        <li>
          <Link to="/b">B</Link>
        </li>
        <li>
          <Link to="/b/c">B/C</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route path="/a" render={() => <div>A</div>} />
        <Route exact path="/b" render={() => <div>B</div>} />
        <Route path="/b/c" render={() => <div>B/C</div>} />
      </Switch>
    </Router>
  );
};
