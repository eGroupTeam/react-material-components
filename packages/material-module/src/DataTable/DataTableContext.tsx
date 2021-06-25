import { createContext, SetStateAction } from 'react';

export type EachRowState = {
  [dataId in string | number]?: {
    checked: boolean;
  };
};

export type DataTableContextProps = {
  /**
   * Each row state.
   */
  eachRowState: EachRowState;
  /**
   * Set each row state.
   */
  setEachRowState?: (rowState: SetStateAction<EachRowState>) => void
};

const DataTableContext = createContext<DataTableContextProps>({
  eachRowState: {}
});

export default DataTableContext;
