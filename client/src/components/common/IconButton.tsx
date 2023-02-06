import React from "react";
import styled from "styled-components";

const StyledIconButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border--radius);
  width: 2em;
  height: 2em;
  box-sizing: border-box;
  cursor: pointer;
  :hover {
    background: var(--color--main);
    color: #fff;
  }
  margin: 0.125em;
`;

const IconButton = ({
  children,
  style,
  onClick,
}: {
  children: React.ReactNode;
  style?: any;
  onClick: Function;
}) => {
  return (
    <StyledIconButtonWrapper
      style={style}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </StyledIconButtonWrapper>
  );
};

export default IconButton;
