import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import { StyledInnerLayoutWrapper } from "../../common/style";

const StyledBodyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  box-sizing: border-box;
`;

const StyledBodyCommonAdsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 4.5em;
  width: 12em;
  height: 24em;
  margin: 1em 1em 1em 0;
  background-color: #fff;
  box-shadow: 0 0 0.375em var(--color--shadow);
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Body = () => {
  return (
    <StyledBodyWrapper>
      <StyledInnerLayoutWrapper
        style={{ paddingTop: "3.5em" }}
        alignItems="flex-start"
      >
        <StyledBodyCommonAdsWrapper>광고</StyledBodyCommonAdsWrapper>
        <Outlet></Outlet>
      </StyledInnerLayoutWrapper>
    </StyledBodyWrapper>
  );
};

export default Body;
