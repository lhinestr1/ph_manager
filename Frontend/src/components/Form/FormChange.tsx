import { connect, FormikContext, FormikContextType } from 'formik';
import React from 'react';

type Values = Record<string | number, string | number> | any;

export interface Props {
  visible?: (values: Values, formik: FormikContextType<typeof values>) => boolean;
  onChange?: (values: Values, formik: FormikContextType<typeof values>) => any;
  children?: React.ReactNode;
}

function FormChange({
  onChange,
  visible,
  children,
  formik,
}: Props & { formik: FormikContextType<any> }) {
  let isVisible = React.useRef(true);
  const prevValues = React.useRef(() => formik.values);

  if (!formik.isValidating) {
    if (prevValues.current !== formik.values) {
      prevValues.current = formik.values;
      if (onChange) onChange(formik.values, formik);
      if (visible) isVisible.current = visible(formik.values, formik);
    }
  }

  if (isVisible.current) return <>{children}</>;
  return null;
}

export default connect<Props>(FormChange);
