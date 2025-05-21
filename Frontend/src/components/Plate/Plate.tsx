import React from "react";
import * as Styled from './styles'

interface Props {
  numero: string
}

export const Plate: React.FC<Props> = ({ numero }) => {

  const letters = numero.substring(0, 3).toUpperCase();
  const numbers = numero.substring(3, 6).toUpperCase();

  return (
    <Styled.PlacaContainer>
      <Styled.PaisText>COLOMBIA</Styled.PaisText>
      <Styled.NumeroText>
        <div> {letters} </div>
        <div>-</div>
        <div> {numbers} </div>
      </Styled.NumeroText>
    </Styled.PlacaContainer>
  );
};
