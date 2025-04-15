import styled from "styled-components";


const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  text-align: left;
  color: #083863;
  max-width: 305px;
  flex-grow: 1;
  @media (min-width: 700px) {
    max-width: 400px;
  }
`;

export default Label;
