import { connect, FormikContextType, getIn } from 'formik';
import React from 'react';
import styled from 'styled-components';

const ErrorStyled = styled.div`
  color: red;
  padding: 4px 0;
  font-size: 12px;
`;

interface Props {
  name?: string;
}

const Error: React.FC<{ formik: FormikContextType<any> } & Props> = ({
  formik,
  name,
}) => {
  const error = getIn(formik.errors, name || 'form-error');

  return <>{error && <ErrorStyled>{error}</ErrorStyled>}</>;
};

export default connect<Props>(Error);
