import React from 'react';
import { storiesOf } from '@storybook/react';

import { withRouter } from 'react-router'
import { Route, Switch, Link } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@e-group/material/Breadcrumbs';

storiesOf('Breadcrumbs', module)
  .addDecorator(StoryRouter())
  .add(
    'default',
    () => {
      const Demo = withRouter(({ location }) => (
        <React.Fragment>
          <Breadcrumbs
            routes={[
              {
                path: '/',
                exact: true,
                breadcrumbName: '首頁'
              },
              {
                path: '/a',
                breadcrumbName: 'A'
              },
              {
                path: '/b',
                routes: [
                  {
                    path: '/b',
                    exact: true,
                    breadcrumbName: 'B'
                  },
                  {
                    path: '/b/c',
                    breadcrumbName: 'C'
                  }
                ]
              }
            ]}
            pathname={location.pathname}
            separator={<NavigateNextIcon />}
            MuiTypographyProps={{
              variant: 'h6'
            }}
            MuiLinkProps={{
              variant: 'h6',
              color: 'secondary'
            }}
          />
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/a">A</Link></li>
            <li><Link to="/b">B</Link></li>
            <li><Link to="/b/c">B/C</Link></li>
          </ul>
          <Switch>
            <Route exact path="/" render={() => (<div>Home</div>)}/>
            <Route path="/a" render={() => (<div>A</div>)}/>
            <Route exact path="/b" render={() => (<div>B</div>)}/>
            <Route path="/b/c" render={() => (<div>B/C</div>)}/>
          </Switch>
        </React.Fragment>
      ))
      return <Demo />
    },
    {
      info: {
        propTables: [Breadcrumbs]
      }
    }
  );
