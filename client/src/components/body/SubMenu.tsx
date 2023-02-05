import react from "react";
import styled from "styled-components";

const StyledBoardSubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 12em;
  height: 36em;
  margin-top: 1em;
  background-color: #fff;
  position: sticky;
  top: 4.5em;
  box-shadow: 0 0 0.375em var(--color--shadow);
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StyledHotArticleWrapper = styled.div`
  display: flex;
  width: 12em;
  height: 28em;
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
`;
const StyledFooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 12em;
  height: 8em;
`;

const StyledFooterHref = styled.a`
  color: var(--color--gray--middle);
  font-size: 0.75em;
`;

const SubMenu = () => {
  return (
    <StyledBoardSubWrapper>
      <StyledHotArticleWrapper>인기글</StyledHotArticleWrapper>
      <StyledFooterWrapper>
        <span
          style={{
            fontSize: "0.75em",
            color: "var(--color--gray--middle)",
          }}
        >
          © KST. All Rights Reserved.
        </span>
        <div
          style={{
            margin: "0 1em",
            width: "calc(100% - 2em)",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <StyledFooterHref href="">이용약관</StyledFooterHref>
          <StyledFooterHref href="">개인정보처리방침</StyledFooterHref>
        </div>
      </StyledFooterWrapper>
    </StyledBoardSubWrapper>
  );
};

export default SubMenu;
