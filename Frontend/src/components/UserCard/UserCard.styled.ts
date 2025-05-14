import styled from "styled-components";

export const AnimatedWrapper = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(1rem)")};
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
`;

export const Card = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 0.8rem;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const Name = styled.div`
  font-weight: 500;
  font-size: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const RedIconButton = styled(IconButton)`
  color: #ef4444;
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 0.3rem;
`;

export const RoleBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  color: #374151;
  background-color: #f9fafb;
`;