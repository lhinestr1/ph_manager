import styled from 'styled-components';

interface Props {
  fluid?: boolean;
  center?: boolean;
}

const Column = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex-grow: ${props => (props.fluid ? 1 : 0)};
  align-content: flex-start;
  text-align: ${props => (props.center ? 'center' : 'left')};
`;

export default Column;
