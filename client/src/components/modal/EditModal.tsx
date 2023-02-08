import React, { useRef, useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyledModalInput,
  StyledModalInputWrapper,
  StyledModalWrapper,
  StyledSignInButton,
  StyledSpanText,
} from "../../common/style";
import { EditPostTypes } from "../../common/types";
import { editPost } from "../../service/express";
import Loadingcircle from "../common/LoadingCircle";

const PostingModal = ({ title, post, postId }: EditPostTypes) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const postRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onFocusInput(e: React.BaseSyntheticEvent) {
    e.target.parentNode.classList.add("focusIn");
  }
  function onBlurInput(e: React.BaseSyntheticEvent) {
    e.target.parentNode.classList.remove("focusIn");
  }

  useEffect(() => {
    if (!titleRef.current || !postRef.current) return;
    titleRef.current.value = title;
    postRef.current.value = post;
  }, []);

  const postWrite = useCallback((e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (!titleRef.current || !postRef.current) return;
    if (!titleRef.current.value || !postRef.current.value) return;
    setIsLoading(true);
    const postData: EditPostTypes = {
      title: titleRef.current.value,
      post: postRef.current.value,
      postId,
    };
    editPost(postData)
      .then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch(() => {
        alert("글 수정 실패");
      });
  }, []);

  return (
    <StyledModalWrapper>
      <form
        onSubmit={() => {}}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <StyledSpanText>제목</StyledSpanText>
        <StyledModalInputWrapper>
          <StyledModalInput
            ref={titleRef}
            type="text"
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          ></StyledModalInput>
        </StyledModalInputWrapper>
        <StyledSpanText>본문</StyledSpanText>
        <StyledModalInputWrapper style={{ height: "100%" }}>
          <textarea
            style={{
              height: "calc(100% - 0.5em)",
              width: "calc(100% - 0.5em)",
              resize: "none",
              border: "none",
              outline: "none",
              fontFamily: "KoPubWorldDotum",
            }}
            ref={postRef}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          ></textarea>
        </StyledModalInputWrapper>
        <StyledSignInButton style={{ marginTop: "0" }} onClick={postWrite}>
          수정
        </StyledSignInButton>
      </form>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "0.5em",
            backgroundColor: "var(--color--transparent)",
          }}
        >
          <Loadingcircle></Loadingcircle>
        </div>
      )}
    </StyledModalWrapper>
  );
};

export default PostingModal;
