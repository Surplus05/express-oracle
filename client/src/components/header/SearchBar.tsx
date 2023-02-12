import React from "react";
import styled from "styled-components";

const StyledSearchBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--color--gray-outFoucs);
  height: 2.15625em;
  line-height: 2.15625em;
  flex-grow: 1;
  max-width: 30em;
  border-radius: 2em;
  margin: 0 1em;
  @media (max-width: 768px) {
    margin: 0 1em;
  }
`;

const StyledSearchBarInput = styled.input`
  padding: 0.375em;
  margin: 0 0 0 0.5em;
  width: 0;
  border: none;
  outline: none;
  flex-grow: 1;
  text-overflow: ellipsis;
`;

const SearchBar = () => {
  return (
    <StyledSearchBarWrapper>
      <StyledSearchBarInput placeholder="제목으로 검색하세요 (미구현)"></StyledSearchBarInput>
      <i
        className="fa-solid fa-magnifying-glass"
        style={{
          color: "var(--color--main)",
          padding: "0.25em",
          margin: "0 0.25em 0.125em 0",
          fontSize: "1.25em",
        }}
      ></i>
    </StyledSearchBarWrapper>
  );
};

export default SearchBar;
