import { useEffect, useState } from 'react';

import { Map } from '@e-group/immutable';
import { useDispatch, useSelector } from 'react-redux';
import {
  hasSubmitSucceeded,
  getFormValues,
  reset,
  // @ts-ignore
  submit,
} from 'redux-form/immutable';

export default function makeEditableFieldUtils(FORM) {
  return function useEditableFieldUtils() {
    const dispatch = useDispatch();
    const [afterSubmitActions, setAfterSubmitActions] = useState<{
      closeEditing?: () => void;
    }>({});
    const submitSucceeded = useSelector((state) =>
      hasSubmitSucceeded(FORM)(state)
    );
    const formValues = useSelector(
      (state) => getFormValues(FORM)(state) || Map()
    );

    useEffect(() => {
      if (submitSucceeded && afterSubmitActions.closeEditing) {
        afterSubmitActions.closeEditing();
      }
    }, [afterSubmitActions, submitSucceeded]);

    const handleSave = (e, { closeEditing }) => {
      dispatch(submit(FORM));
      setAfterSubmitActions({
        closeEditing,
      });
    };

    const handleClose = () => {
      dispatch(reset(FORM));
    };

    return {
      formValues,
      afterSubmitActions,
      setAfterSubmitActions,
      handleClose,
      handleSave,
      submitSucceeded,
    };
  };
}
