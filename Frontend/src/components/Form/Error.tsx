import { connect, FormikContextType, getIn } from 'formik';
import React from 'react';
import styled from 'styled-components';

export const ErrorStyled = styled.div`
  color: #ff7375;
  padding: 4px 0 0;
  font-size: 12px;
`;
const HelpStyled = styled.div`
  color: #9E9E9E;
  padding: 4px 0 0;
  font-size: 12px;
`;

interface Props {
  name: string;
  help?: string;
}

const Error: React.FC<Props & { formik: FormikContextType<any> }> = ({
  formik,
  name,
  help,
}) => {
  const error = getIn(formik.errors, name);
  const touch = getIn(formik.touched, name);

  return (
    <>
      {touch && error ? (
        <ErrorStyled>{error}</ErrorStyled>
      ) : (
        help && <HelpStyled>{help}</HelpStyled>
      )}
    </>
  );
};

export default connect<Props>(Error);
