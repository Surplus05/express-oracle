import React from "react";
import styled from "styled-components";
import ArticleInListType from "../../common/types";

const StyledArticleItemWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100%- 1.5em);
  overflow: hidden;
  margin: 0 0.75em;
  height: 3.36em;
`;

const StyledTitleSpan = styled.span`
  font-size: 1em;
`;
const StyledWriterSpan = styled.span`
  font-size: 1em;
`;

const StyledInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledStatWrapper = styled.div`
  font-size: 0.75em;
  display: flex;
  justify-content: flex-start;
  align-content: center;
`;

const StyledStatItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 2em;
  margin-right: 1.25em;
`;

const StyledUserInfoWrapper = styled.div``;

const Article = ({ data }: { data: ArticleInListType }) => {
  console.log(data);
  return (
    <StyledArticleItemWrapper>
      <StyledInfoWrapper>
        <StyledTitleSpan>{data.TITLE}</StyledTitleSpan>
        <StyledStatWrapper>
          <StyledStatItemWrapper>
            <i
              className="fa-regular fa-eye"
              style={{ lineHeight: "1.4em" }}
            ></i>
            {data.VIEWS}
          </StyledStatItemWrapper>
          <StyledStatItemWrapper>
            <i
              className="fa-regular fa-comment-dots"
              style={{ lineHeight: "1.4em" }}
            ></i>
            {data.COMMENTS}
          </StyledStatItemWrapper>
          <StyledStatItemWrapper>
            <i
              className="fa-regular fa-thumbs-up"
              style={{ lineHeight: "1.4em" }}
            ></i>
            {data.LIKES}
          </StyledStatItemWrapper>
        </StyledStatWrapper>
      </StyledInfoWrapper>
      <StyledUserInfoWrapper>
        <i className="fa-solid fa-user"></i> {data.USERNAME}
      </StyledUserInfoWrapper>
    </StyledArticleItemWrapper>
  );
};

export default Article;
