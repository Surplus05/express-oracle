import React from "react";
import styled from "styled-components";

const StyledCautionWrapper = styled.div`
  display: flex;
  user-select: none;
  align-items: center;
  flex-direction: row;
  background-color: #f24d34;
  padding: 0.75em;
  font-size: 0.75em;
  border-radius: var(--border--radius);
  color: white;
  font-weight: bold;
  width: calc(100% - 1.5em);
  margin-bottom: 0.5em;
`;

const Caution = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledCautionWrapper>
      <i
        style={{ fontSize: "2em", marginRight: "0.25em" }}
        className="fa-solid fa-triangle-exclamation"
      ></i>
      {children}
    </StyledCautionWrapper>
  );
};

export default Caution;
