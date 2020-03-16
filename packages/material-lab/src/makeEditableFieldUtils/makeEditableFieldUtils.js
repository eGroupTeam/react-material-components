import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  hasSubmitSucceeded,
  getFormValues,
  reset,
  submit
} from 'redux-form/immutable';

export default function makeEditableFieldUtils(FORM) {
  return function useEditableFieldUtils() {
    const dispatch = useDispatch();
    const [afterSubmitActions, setAfterSubmitActions] = React.useState();
    const submitSucceeded = useSelector(state =>
      hasSubmitSucceeded(FORM)(state)
    );
    const formValues = useSelector(state => getFormValues(FORM)(state));

    React.useEffect(() => {
      if (submitSucceeded && afterSubmitActions) {
        afterSubmitActions.closeEditing();
      }
    }, [afterSubmitActions, submitSucceeded]);

    const handleSave = (e, { closeEditing }) => {
      dispatch(submit(FORM));
      setAfterSubmitActions({
        closeEditing
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
      submitSucceeded
    };
  };
}
