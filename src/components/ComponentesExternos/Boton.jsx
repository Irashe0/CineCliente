import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick, children, disabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  padding: 6px 16px;
  font-size: 14px;
  color: rgb(193, 163, 98);
  border: 2px solid rgb(193, 163, 98);
  background-color: #2D2D2D;
  border-radius: 30px;
  background-color: transparent;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  overflow: hidden;

  ::before {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    width: 40px;
    height: 40px;
    border-radius: inherit;
    scale: 0;
    z-index: -1;
    background-color: rgb(193, 163, 98);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  }

  &:hover::before {
    scale: 3;
  }

  &:hover {
    color:rgb(255, 255, 255);
    scale: 1.1;
    box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
  }

  &:active {
    scale: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default Button;
