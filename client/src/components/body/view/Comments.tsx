import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getComments, writeComment } from "../../../service/express";
import Comment from "./Comment";

const StyledMainTextWrapper = styled.div`
  margin: 0.75em;
  width: calc(100% - 1.5em);
  min-height: 14em;
`;

const StyledInputWrapper = styled.div`
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

const StyledSendButtonWrapper = styled.div`
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

const StyledCommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledEmptyCommentWrapper = styled.div`
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
  }, []);

  function onFocusInput(e: React.BaseSyntheticEvent) {
    e.target.parentNode.classList.add("focusIn");
  }

  function onBlurInput(e: React.BaseSyntheticEvent) {
    e.target.parentNode.classList.remove("focusIn");
  }

  function onClickSend() {
    if (
      commentRef.current &&
      commentRef.current.value &&
      commentRef.current.value.length < 500
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
        <StyledMainTextWrapper>
          <StyledCommentsWrapper>
            {comments.map((comment: any) => {
              return <Comment comment={comment}></Comment>;
            })}
          </StyledCommentsWrapper>
        </StyledMainTextWrapper>
      ) : (
        <StyledEmptyCommentWrapper>
          댓글이 존재하지 않습니다.
        </StyledEmptyCommentWrapper>
      )}
      {uid > 0 && (
        <StyledInputWrapper>
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
          <StyledSendButtonWrapper onClick={onClickSend}>
            <i className="fa-solid fa-paper-plane"></i>
          </StyledSendButtonWrapper>
        </StyledInputWrapper>
      )}
    </>
  );
};

export default Comments;
