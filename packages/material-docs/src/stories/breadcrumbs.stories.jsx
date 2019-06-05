import React from 'react';
import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '../../../material/src/Breadcrumbs';

storiesOf('Breadcrumbs', module)
  .addDecorator(StoryRouter())
  .add(
    'default',
    () => (
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
            breadcrumbName: 'B',
            routes: [
              {
                path: '/b/c',
                breadcrumbName: 'C'
              }
            ]
          }
        ]}
        pathname="/b/c"
        separator={<NavigateNextIcon />}
        MuiTypographyProps={{
          variant: 'h6'
        }}
        MuiLinkProps={{
          variant: 'h6',
          color: 'secondary'
        }}
      />
    ),
    {
      info: {
        propTables: [Breadcrumbs]
      }
    }
  );
