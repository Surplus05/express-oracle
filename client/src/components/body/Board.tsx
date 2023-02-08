import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { StyledMainContainer } from "../../common/style";
import ArticleInListType from "../../common/types";
import { getPageArcitleList } from "../../service/express";
import Article from "./Article";
import BoardHeader from "./BoardHeader";
import Paging from "./Paging";

const StyledBoardArticleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
`;

const Board = () => {
  const navigate = useNavigate();
  const uid = useSelector((state: any) => state.user.USER_ID);

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
    <StyledMainContainer>
      <BoardHeader></BoardHeader>
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
    </StyledMainContainer>
  );
};

export default Board;
