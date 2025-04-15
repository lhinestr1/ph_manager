import { FormikHelpers } from 'formik';

import { FormikErrors } from 'formik';

type ErrorRecord = Record<string, string | React.ReactNode>;

export class FormFieldsError extends Error {
  errors: FormikErrors<any>;
  constructor(errors: ErrorRecord) {
    super('form-error');
    this.errors = errors as any;
  }
}

type Submit<T> = (
  values: T,
  actions: FormikHelpers<T>,
  setFormError: (message: React.ReactNode) => void
) => Promise<void> | void;

export const submitTrap = <T = any>(submit: Submit<T>) => {
  return async (values: T, actions: FormikHelpers<T>) => {
    try {
      actions.setSubmitting(true);
      await submit(values, actions, setFormError(actions));
    } catch (e) {
      if (e instanceof FormFieldsError) {
        actions.setErrors(e.errors);
      }
    } finally {
      actions.setSubmitting(false);
    }
  };
};

export const setFormError = <T>(actions: FormikHelpers<T>) => (
  message: React.ReactNode
) => {
  actions.setFieldError('form-error', message as any);
};
