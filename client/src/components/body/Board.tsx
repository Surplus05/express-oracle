import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ArticleInListType from "../../common/types";
import { getPageArcitleList } from "../../service/express";
import Article from "./Article";
import Paging from "./Paging";

const StyledBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  width: calc(100% - 13em);
  min-height: calc(100vh - 5.5em);
  margin: 1em 0em 1em 0;
  box-shadow: 0 0 0.375em var(--color--shadow);

  @media screen and (max-width: 768px) {
    width: calc(100%);
  }
`;

const StyledBoardTitleWrapper = styled.div`
  user-select: none;
  display: flex;
  height: 3.05em;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  width: calc(100%);
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
`;

const StyledBoardArticleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
`;

const Board = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentArticles, setCurrentArticles] = useState<any[]>();
  const [currentPage, setCurrentPage] = useState<number | null>(
    Number(searchParams.get("page")) || null
  );
  const totalArticles = useRef<number>(1);
  useEffect(() => {
    if (currentPage != null) {
      getPageArcitleList(currentPage).then((value) => {
        setCurrentArticles(value.data.rows);
        totalArticles.current = value.data.totalArticles;
      });
    } else {
      setCurrentPage(1);
      navigate("/main?page=1");
    }
  }, [currentPage]);

  return (
    <StyledBoardContainer>
      <StyledBoardTitleWrapper>
        <span style={{ margin: "0 0 0 0.75em" }}>커뮤니티</span>
      </StyledBoardTitleWrapper>
      <StyledBoardArticleWrapper>
        {currentArticles &&
          currentArticles.map((value: ArticleInListType) => {
            return <Article key={value.POST_ID} data={value}></Article>;
          })}
      </StyledBoardArticleWrapper>
      {totalArticles.current && currentPage && (
        <Paging
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalArticles={totalArticles.current}
        ></Paging>
      )}
    </StyledBoardContainer>
  );
};

export default Board;
