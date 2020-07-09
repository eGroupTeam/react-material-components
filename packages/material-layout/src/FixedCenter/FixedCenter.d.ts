import { WithStyles } from '@material-ui/core';
import { styles } from './FixedCenter';
export interface FixedCenterProps extends WithStyles<typeof styles> {
  className?: string;
}

declare const FixedCenter: React.FunctionComponent<FixedCenterProps>;

export default FixedCenter;
