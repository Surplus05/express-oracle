import React from "react";
import styled from "styled-components";
import { getDateString } from "../../../common/functions";

const StyledCommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0.5em 0;
`;

const StyledCommentProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background-color: var(--color--gray--middle);
`;

const Comment = ({ comment }: { comment: any }) => {
  return (
    <StyledCommentWrapper>
      <StyledCommentProfileWrapper>
        <i className="fa-solid fa-user"></i>
      </StyledCommentProfileWrapper>
      <div style={{ width: "calc(100% - 3em)" }}>
        <div>
          <span style={{ fontWeight: "bold" }}>{comment.USERNAME}</span>
          <span style={{ fontSize: "0.875em" }}>
            {"ㆍ" + getDateString(new Date(comment.PUBLISHED))}
          </span>
        </div>
        {comment.COMMENT_TEXT}
      </div>
    </StyledCommentWrapper>
  );
};
export default Comment;
