import React from 'react';
import PropTypes from 'prop-types';
import { matchRoutes } from 'react-router-config';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';

const Breadcrumbs = ({
  routes,
  pathname,
  MuiTypographyProps,
  MuiLinkProps,
  ...other
}) => {
  const matchedRoutes = matchRoutes(routes, pathname);
  return (
    <MuiBreadcrumbs {...other}>
      {matchedRoutes.map((matchRoute, i) => {
        const { breadcrumbName } = matchRoute.route;
        const { url } = matchRoute.match;
        // last item
        if (i + 1 === matchedRoutes.length) {
          return (
            <Typography key={`breadcrumb-link-${i}`} {...MuiTypographyProps}>
              {breadcrumbName}
            </Typography>
          );
        }
        return (
          <Link
            component={RouterLink}
            to={url}
            key={`breadcrumb-link-${i}`}
            {...MuiLinkProps}
          >
            {breadcrumbName}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

Breadcrumbs.propTypes = {
  /**
   * The parameter of `matchRoutes`
   */
  routes: PropTypes.array.isRequired,
  /**
   * The parameter of `matchRoutes`
   */
  pathname: PropTypes.string.isRequired,
  /**
   * Mui `Typography` porps
   */
  MuiTypographyProps: PropTypes.object,
  /**
   * Mui `Link` porps
   */
  MuiLinkProps: PropTypes.object
};

export default Breadcrumbs;
