import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { hasSubmitSucceeded, getFormValues, reset, submit } from 'redux-form';

export default function makeEditableFieldUtils<Values = any>(FORM: string) {
  const successSelector = (state) => hasSubmitSucceeded(FORM)(state);
  const valueSelector = (state) => getFormValues(FORM)(state) || {};
  return function useEditableFieldUtils() {
    const dispatch = useDispatch();
    const [afterSubmitActions, setAfterSubmitActions] = useState<{
      closeEditing?: () => void;
    }>({});
    const submitSucceeded = useSelector(successSelector);
    const formValues = useSelector<Values>(valueSelector);

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
      formValues: formValues as Values,
      afterSubmitActions,
      setAfterSubmitActions,
      handleClose,
      handleSave,
      submitSucceeded,
    };
  };
}
