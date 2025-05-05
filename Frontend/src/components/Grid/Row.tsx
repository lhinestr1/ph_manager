import styled from 'styled-components';

export interface Props {
  $fluid?: boolean;
  $justifyContent?: 'space-between' | 'space-around' | 'space-evenly' | 'center' | 'left' | 'right';
  $alignItems?: 'center' | 'left' | 'right';
  $gap?: number;
}

const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  gap: ${props => (props.$gap ? `${props.$gap}px` : '0')};
  //flex-grow: ${props => (props.$fluid ? 1 : 0)};
  justify-content: ${({ $justifyContent }) => $justifyContent ? $justifyContent : 'left'};
`;

export default Row;
