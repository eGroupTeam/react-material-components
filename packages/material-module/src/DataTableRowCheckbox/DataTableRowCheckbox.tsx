import React, { forwardRef, useContext, useEffect } from 'react'
import useControlled from '@e-group/hooks/useControlled'
import { Checkbox, CheckboxProps } from '@material-ui/core'
import DataTableContext, { EachRowState } from '../DataTable/DataTableContext'

export interface DataTableRowCheckboxProps extends CheckboxProps {
  dataId: string | number;
  onEachRowStateChange?: (eachRowState: EachRowState) => void
}

const DataTableRowCheckbox = forwardRef<HTMLButtonElement, DataTableRowCheckboxProps>((props, ref) => {
  const { dataId, checked: checkedProp, defaultChecked, onChange, onEachRowStateChange, ...other } = props
  const { setEachRowState, eachRowState } = useContext(DataTableContext);
  const [checked, setChecked] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
  });

  useEffect(() => {
    if (setEachRowState) {
      setEachRowState(val => ({
        ...val,
        [dataId]: {
          checked: false,
          ...val[dataId]
        }
      }))
    }
  }, [dataId, setEachRowState])

  useEffect(() => {
    const rowInfo = eachRowState[dataId]
    if (rowInfo) {
      setChecked(rowInfo.checked)
    }
  }, [eachRowState, dataId, setChecked])

  useEffect(() => {
    if (onEachRowStateChange) {
      onEachRowStateChange(eachRowState)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eachRowState])

  return (
    <Checkbox
      checked={checked}
      onChange={(e, checked) => {
        if (onChange) {
          onChange(e, checked)
        }
        setChecked(checked)
        if (setEachRowState) {
          setEachRowState(val => ({
            ...val,
            [dataId]: {
              checked
            }
          }))
        }
      }}
      ref={ref}
      {...other}
    />
  )
})

export default DataTableRowCheckbox
