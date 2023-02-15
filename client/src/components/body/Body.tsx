import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
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
  border-radius: var(--border--radius);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 4.5em;
  width: 12em;
  height: 24em;
  margin: 1em 0 1em 1em;
  background-color: #fff;
  box-shadow: 0 0 0.375em var(--color--shadow);
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Body = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (Number(searchParams.get("page") == null)) {
      navigate("/main?page=1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledBodyWrapper>
      <StyledInnerLayoutWrapper
        style={{ paddingTop: "3.5em" }}
        alignItems="flex-start"
      >
        <Outlet></Outlet>
        <StyledBodyCommonAdsWrapper>광고</StyledBodyCommonAdsWrapper>
      </StyledInnerLayoutWrapper>
    </StyledBodyWrapper>
  );
};

export default Body;
