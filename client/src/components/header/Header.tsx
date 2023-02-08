import React from "react";
import styled from "styled-components";
import { StyledInnerLayoutWrapper } from "../../common/style";
import ControlPanel from "./ControlPanel";
import SearchBar from "./SearchBar";

const StyledHeaderWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 3.5em;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
  box-sizing: border-box;
`;

const Header = () => {
  return (
    <StyledHeaderWrapper>
      <StyledInnerLayoutWrapper>
        <img
          style={{
            margin: "0.5em 0",
            height: "calc(100% - 1em)",
            userSelect: "none",
            cursor: "pointer",
          }}
          src={"logo.png"}
          alt="logo"
        ></img>
        <SearchBar></SearchBar>
        <ControlPanel></ControlPanel>
      </StyledInnerLayoutWrapper>
    </StyledHeaderWrapper>
  );
};

export default Header;
