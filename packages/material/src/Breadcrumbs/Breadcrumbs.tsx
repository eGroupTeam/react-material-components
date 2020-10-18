import React, { FC } from 'react';
import { matchRoutes, RouteConfig } from 'react-router-config';
import { Link } from 'react-router-dom';
import {
  Typography,
  Link as MuiLink,
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  TypographyProps,
  LinkProps,
} from '@material-ui/core';

export interface EgRouteConfig extends RouteConfig {
  /**
   * If breadcrumbName defined it'll display in Breadcrumbs.
   */
  breadcrumbName?: string;
}

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  /**
   * The parameter of `matchRoutes`
   */
  routes: EgRouteConfig[];
  /**
   * The parameter of `matchRoutes`
   */
  pathname: string;
  /**
   * Mui `Typography` porps
   */
  MuiTypographyProps?: TypographyProps;
  /**
   * Mui `Link` porps
   */
  MuiLinkProps?: LinkProps;
}

/**
 * @deprecated
 * This component is deprecated.
 */
const Breadcrumbs: FC<BreadcrumbsProps> = ({
  routes,
  pathname,
  MuiTypographyProps,
  MuiLinkProps,
  ...other
}) => {
  const matchedRoutes = matchRoutes(routes, pathname).filter(
    (el) => el.route.breadcrumbName
  );
  return (
    <MuiBreadcrumbs {...other}>
      {matchedRoutes.map((matchRoute, i) => {
        const { url } = matchRoute.match;
        const { key, breadcrumbName } = matchRoute.route;
        // last item
        if (i + 1 === matchedRoutes.length) {
          return (
            <Typography key={key} {...MuiTypographyProps}>
              {breadcrumbName}
            </Typography>
          );
        }
        return (
          <MuiLink component={Link} to={url} key={key} {...MuiLinkProps}>
            {breadcrumbName}
          </MuiLink>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
