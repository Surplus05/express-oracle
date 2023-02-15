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
  padding: 0.375em 0.875em;
  line-height: 1.6em;
  cursor: pointer;
  user-select: none;
  margin-left: 1em;
  font-family: "KoPubWorldDotum";
`;

const Button = ({
  text,
  isColor,
  onClick,
}: {
  text: string;
  isColor: boolean;
  onClick: Function;
}) => {
  return (
    <StyledButton
      isColor={isColor}
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
