import styled from 'styled-components';

interface Props {
  $fluid?: boolean;
  $alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  $justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  style?: React.CSSProperties;
}

//flex-grow: ${props => (props.$fluid ? 1 : 0)};
//text-align: ${props => (props.$center ? 'center' : 'left')};
const Column = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: ${ ({ $alignItems }) => $alignItems ? $alignItems : "flex-start" };
  justify-content: ${ ({ $justifyContent }) => $justifyContent ? $justifyContent : "flex-start" };
  flex-grow: ${ ({ $fluid }) => $fluid ? 1 : 0 };
`;

export default Column;
