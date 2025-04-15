//import { IconProp } from '@fortawesome/fontawesome-svg-core';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Input, { Icon, Props as InputProps } from './Input';
import styled from 'styled-components';

export const InputIconStyled = styled.div`
  position: relative;
`;
const InputStyled = styled(Input)`
  padding-left: 36px;
  background: #f4f4f4;
  border-radius: 7px;
  height: 40px;
`;

export interface Props extends InputProps {
  icon: string;
}

const InputIcon: React.FC<Props> = ({ icon, ...restProps }) => (
  <InputIconStyled>
    <InputStyled {...restProps} />
    <Icon>
      ico
    </Icon>
  </InputIconStyled>
);

export default InputIcon;
