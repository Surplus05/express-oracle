import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import IconButton from "../common/IconButton";

const StyledPagingWrapper = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.05em;
  overflow: hidden;
  width: calc(100%);
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 0px 0px inset;
`;

const Paging = ({
  currentPage,
  setCurrentPage,
  totalPosts,
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number | null>>;
  totalPosts: number;
}) => {
  const pages = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];

  const navigate = useNavigate();

  const maxPage = Math.ceil(totalPosts / 24);
  return (
    <StyledPagingWrapper>
      <div style={{ display: "flex" }}>
        {pages.map((page) => {
          const style =
            page === currentPage
              ? {
                  background: "var(--color--main)",
                  color: "#fff",
                }
              : null;

          return page > 0 && page <= maxPage ? (
            <IconButton
              key={page}
              style={style}
              onClick={() => {
                setCurrentPage(page);
                navigate(`/main?page=${page}`);
              }}
            >
              {page}
            </IconButton>
          ) : (
            <React.Fragment key={page}></React.Fragment>
          );
        })}
      </div>
    </StyledPagingWrapper>
  );
};

export default Paging;
