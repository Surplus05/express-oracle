import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MAX_COMMENT_LENGTH } from "../../../common/constant";
import { getComments, writeComment } from "../../../service/express";
import Comment from "./Comment";

const StyledCommentListWrapper = styled.div`
  margin: 0.75em;
  width: calc(100% - 1.5em);
  min-height: 14em;
`;

const StyledCommentInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid var(--color--gray-outFoucs);
  padding: 0.25em;
  box-sizing: border-box;
  margin: 0.75em;
  width: calc(100% - 1.5em);
  transition: 0.3s;
  align-items: center;
`;

const StyledCommentWriteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em;
  width: 3em;
  height: 3em;
  border-radius: var(--border--radius);
  cursor: pointer;
  font-size: 1em;
  color: white;
  background-color: var(--color--main);

  @media screen and (max-width: 768px) {
    margin: 0.25em;
    width: 2em;
    height: 2em;
  }
`;

const StyledCommentList = styled.ul`
  display: flex;
  text-decoration: none;
  margin: 0;
  padding: 0;
  list-style-type: none;
  flex-direction: column;
`;

const StyledEmptyComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.75em;
  width: calc(100% - 1.5em);
  min-height: 14em;
`;

const Comments = ({ postId }: { postId: number }) => {
  const uid: number = useSelector((state: any) => state.user.USER_ID);
  const [comments, setComments] = useState<any>();
  const commentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getComments(postId).then((value) => {
      setComments(value.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onFocusInput(e: React.BaseSyntheticEvent) {
    e.target.parentNode.classList.add("focusIn");
  }

  function onBlurInput(e: React.BaseSyntheticEvent) {
    e.target.parentNode.classList.remove("focusIn");
  }

  function onClickWrite() {
    if (
      commentRef.current &&
      commentRef.current.value &&
      commentRef.current.value.length < MAX_COMMENT_LENGTH
    ) {
      const commentText = commentRef.current.value;
      commentRef.current.value = "";
      writeComment({
        postId: postId,
        userId: uid,
        text: commentText,
      }).then(() => {
        getComments(postId).then((value) => {
          setComments(value.data);
        });
      });
    }
  }

  if (comments == null) return <></>;
  return (
    <>
      {comments.length > 0 ? (
        <StyledCommentListWrapper>
          <StyledCommentList>
            {comments.map((comment: any) => {
              return (
                <Comment key={comment.COMMENT_ID} comment={comment}></Comment>
              );
            })}
          </StyledCommentList>
        </StyledCommentListWrapper>
      ) : (
        <StyledEmptyComment>댓글이 존재하지 않습니다.</StyledEmptyComment>
      )}
      {uid > 0 && (
        <StyledCommentInputWrapper>
          <textarea
            style={{
              height: "4.2em",
              flexGrow: "1",
              padding: "0",
              resize: "none",
              border: "none",
              outline: "none",
              fontFamily: "KoPubWorldDotum",
            }}
            ref={commentRef}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          ></textarea>
          <StyledCommentWriteButton onClick={onClickWrite}>
            <i className="fa-solid fa-paper-plane"></i>
          </StyledCommentWriteButton>
        </StyledCommentInputWrapper>
      )}
    </>
  );
};

export default Comments;
