import React from "react";
import styled from "styled-components";

interface ButtonColorProps {
  isColor: boolean;
}

const StyledButton = styled.button<ButtonColorProps>`
  font-size: 0.875em;
  color: ${({ isColor }) => (isColor ? "#fff" : "var(--color--gray--foucs)")};
  background-color: ${({ isColor }) =>
    isColor ? "var(--color--main)" : "#fff"};
  border-radius: var(--border--radius);
  border: 1px solid
    ${({ isColor }) =>
      isColor ? "transparent" : "var(--color--gray-outFoucs)"};
  padding: 0.375em 0.625em;
  line-height: 1.6em;
  cursor: pointer;
  user-select: none;
`;

const Button = ({ text, isColor }: { text: string; isColor: boolean }) => {
  return <StyledButton isColor={isColor}>{text}</StyledButton>;
};

export default Button;
