import styled from 'styled-components';

export interface Props {
  fluid?: boolean;
  center?: boolean;
}

const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  flex-grow: ${props => (props.fluid ? 1 : 0)};
  justify-content: ${props => (props.center ? 'center' : 'left')};
`;

export default Row;
