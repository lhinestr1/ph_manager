import styled from "styled-components";

export const PlacaContainer = styled.div`
  width: 260px;
  height: 130px;
  background-color: #ffcc00; /* Amarillo típico */
  border: 4px solid black;
  border-radius: 12px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Arial Black', sans-serif;
`;

export const PaisText = styled.div`
  font-size: 12px;
  color: black;
  margin-bottom: 5px;
  letter-spacing: 2px;
`;

export const NumeroText = styled.div`
  font-size: 32px;
  color: black;
  letter-spacing: 4px;
  font-weight: bold;
  display: flex;
  gap: 10px;
`;