import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { hasSubmitSucceeded, getFormValues, reset, submit } from 'redux-form';

export default function makeEditableFieldUtils(FORM: string) {
  return function useEditableFieldUtils() {
    const dispatch = useDispatch();
    const [afterSubmitActions, setAfterSubmitActions] = useState<{
      closeEditing?: () => void;
    }>({});
    const submitSucceeded = useSelector((state) =>
      hasSubmitSucceeded(FORM)(state)
    );
    const formValues = useSelector((state) => getFormValues(FORM)(state) || {});

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
