import styled from 'styled-components';

export interface Props {
  $fluid?: boolean;
  $center?: boolean;
  $gap?: number;
}

const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  gap: ${props => (props.$gap ? `${props.$gap}px` : '0')};
  //flex-grow: ${props => (props.$fluid ? 1 : 0)};
  //justify-content: ${props => (props.$center ? 'center' : 'left')};
`;

export default Row;
