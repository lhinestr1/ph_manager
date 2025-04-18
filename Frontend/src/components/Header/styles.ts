import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const HeaderWrapper = styled.header`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2937;
  color: white;
  padding: 0px 1rem;
  height: 50px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const NavDesktop = styled.nav`
  display: none;
  gap: 1.5rem;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Bar = styled.div<{ open: boolean }>`
  position: absolute;
  width: 24px;
  height: 3px;
  background-color: white;
  transition: transform 0.4s ease, opacity 0.3s ease;

  &:nth-child(1) {
    transform: ${({ open }) => (open ? "rotate(135deg)" : "translateY(-8px)")};
  }

  &:nth-child(2) {
    opacity: ${({ open }) => (open ? 0 : 1)};
  }

  &:nth-child(3) {
    transform: ${({ open }) => (open ? "rotate(-135deg)" : "translateY(8px)")};
  }
`;

export const Sidebar = styled.aside<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100%;
  background-color: #374151;
  color: white;
  padding: 1rem;
  z-index: 100;
  transform: ${({ $show }) => ($show ? "translateX(0)" : "translateX(-100%)")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: transform 0.3s ease, opacity 0.3s ease;
  animation: ${fadeIn} 0.4s ease forwards;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavMobile = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    padding: 0.2rem 1rem;
    border-radius: 8px;
    background-color: #4b5563;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;

    > p {
     margin-left: 0.5rem;
    }

    &:hover {
      background-color: #6b7280;
    }
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
  animation: ${fadeIn} 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }
`;