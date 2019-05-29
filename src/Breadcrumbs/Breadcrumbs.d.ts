import * as React from 'react';
import { BreadcrumbsProps as MuiBreadcrumbsProps } from '@material-ui/lab/Breadcrumbs';
import { TypographyProps } from '@material-ui/core/Typography';
import { LinkProps } from '@material-ui/core/Link';

export interface BreadcrumbsProps extends MuiBreadcrumbsProps{
  /**
   * The parameter of `matchRoutes`
   */
  routes: array;
  /**
   * The parameter of `matchRoutes`
   */
  pathname: string;
  /**
   * Mui `Typography` porps
   */
  MuiTypographyProps: TypographyProps;
  /**
   * Mui `Link` porps
   */
  MuiLinkProps: LinkProps;
}

declare const Breadcrumbs: React.ComponentType<BreadcrumbsProps>;

export default Breadcrumbs;