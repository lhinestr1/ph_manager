import styled, { keyframes } from "styled-components";
import backgroundImage from "../../../images/arrecife.png";

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Background = styled.div`
  min-height: calc(100% - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const StyledCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  animation: ${fadeIn} 0.6s ease-in-out;

  @media (max-width: 640px) {
    height: 100%;
    border-radius: 0;
    max-width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    box-sizing: border-box;
  }
`;

export const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;


export const Button = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: #1f2937;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color:#45505f;
  }

  @media (max-width: 640px) {
    font-size: 0.95rem;
    padding: 0.7rem 1rem;
  }
`;