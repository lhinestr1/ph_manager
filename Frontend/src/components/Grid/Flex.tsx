import styled from 'styled-components';

export interface FlexProps {
  /**  default: row */
  row?: boolean;
  /**  default: row */
  column?: boolean;
  /**  default: wrap */
  nowrap?: boolean;
  /**  default: none */
  flex?: string | number | boolean;
  /** default: flex-start */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /** default: flex-start */
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
}

export const Flex = styled.div<FlexProps>`
  display: flex;

  flex-direction: ${props => (props.column ? 'column' : 'row')};
  flex-wrap: ${props => (props.nowrap ? 'nowrap' : 'wrap')};
  flex: ${props =>
    typeof props.flex === 'boolean'
      ? Number(props.flex)
      : props.flex || 'none'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.alignItems || 'flex-start'};
`;

export interface BlockProps {
  /**  default: none */
  flex?: string | number | boolean;
  /**  default: left */
  textAlign?: 'left' | 'center' | 'right';
}

export const Block = styled.div<BlockProps>`
  flex: ${props =>
    typeof props.flex === 'boolean'
      ? Number(props.flex)
      : props.flex || 'none'};
  text-align: ${props => props.textAlign || 'left'};
`;
