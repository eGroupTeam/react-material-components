import { createContext } from 'react';

export type EditableTableRowContextProps = {
  editing: boolean;
  totalCell: number;
};

const EditableTableRowContext = createContext<EditableTableRowContextProps>({
  editing: false,
  totalCell: 1,
});

export default EditableTableRowContext;
