import * as React from 'react';
import { BreadcrumbsProps as MuiBreadcrumbsProps } from '@material-ui/lab/Breadcrumbs';
import { TypographyProps } from '@material-ui/core/Typography';
import { LinkProps } from '@material-ui/core/Link';

export interface BreadcrumbsProps extends MuiBreadcrumbsProps{
  routes: Array<any>;
  pathname: string;
  MuiTypographyProps: TypographyProps;
  MuiLinkProps: LinkProps;
}

declare const Breadcrumbs: React.ComponentType<BreadcrumbsProps>;

export default Breadcrumbs;