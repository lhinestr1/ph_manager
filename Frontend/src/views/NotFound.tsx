import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundStyled = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;

  h1 {
    font-size: 40px;
  }
  p {
    font-weight: 500;
    font-size: 25px;
  }
`;

const NotFound: React.FC = () => (
  <NotFoundStyled>
    <h1>404</h1>
    <p>No pudimos encontrar la pagina que estabas buscando.</p>
    <button as={NavLink} outline to="/home">
      Volver atras
    </button>
  </NotFoundStyled>
);

export default NotFound;
