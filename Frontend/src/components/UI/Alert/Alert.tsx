import React from 'react';
import { Alert as AlertComponent } from 'antd';
import styled from 'styled-components';

interface AlertProps {
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    showIcon?: boolean;
}

const AlertComponentStyles = styled.div`
    width: 100%; 
    position: absolute; 
    bottom: 10px;
    left: 0;
    z-index: 1000;
    padding: 10px; 
    box-sizing: border-box;
`;
export const Alert: React.FC<AlertProps> = ({
    message,
    type
}) => {
  return (
    <AlertComponentStyles>
        <AlertComponent message={message} type={type} showIcon />
    </AlertComponentStyles>
  )
}
