import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ArticleInListType from "../../common/types";
import getPageArcitleList from "../../service/express";
import Article from "./Article";
import SubMenu from "./SubMenu";

const StyledBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  width: calc(100% - 13em);
  min-height: calc(100vh - 5.5em);
  margin: 1em 1em 1em 0;
  box-shadow: 0 0 0.375em var(--color--shadow);

  @media screen and (max-width: 768px) {
    width: calc(100%);
    margin: 1em 0 1em 0;
  }
`;

const StyledBoardTitleWrapper = styled.div`
  user-select: none;
  display: flex;
  padding: 0.75em;
  width: calc(100% - 1.5em);
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
`;

const StyledBoardPagingWrapper = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  padding: 0.75em;
  width: calc(100% - 1.5em);
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 0px 0px inset;
`;

const StyledBoardArticleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  flex-direction: column;
`;

const Board = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentArticles, setCurrentArticles] = useState<any[]>();
  const currentPage = useRef<number>(Number(searchParams.get("page")) || 1);
  useEffect(() => {
    getPageArcitleList(currentPage.current).then((value) =>
      setCurrentArticles(value.data.rows)
    );
  }, []);
  return (
    <>
      <StyledBoardContainer>
        <StyledBoardTitleWrapper>커뮤니티</StyledBoardTitleWrapper>
        <StyledBoardArticleWrapper>
          {currentArticles &&
            currentArticles.map((value: ArticleInListType) => {
              return <Article key={value.POST_ID} data={value}></Article>;
            })}
        </StyledBoardArticleWrapper>
        <StyledBoardPagingWrapper>페이지</StyledBoardPagingWrapper>
      </StyledBoardContainer>
      <SubMenu></SubMenu>
    </>
  );
};

export default Board;
