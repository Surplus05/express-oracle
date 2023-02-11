import React, { useRef, useState, useEffect } from "react";
import {
  StyledModalButton,
  StyledModalInput,
  StyledModalInputWrapper,
  StyledModalWrapper,
} from "../../common/style";
import { EditPost } from "../../common/types";
import { editPost } from "../../service/express";
import Loadingcircle from "../common/LoadingCircle";

const PostingModal = ({ title, post, postId }: EditPost) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function postWrite(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    if (!titleRef.current || !postRef.current) return;
    if (!titleRef.current.value || !postRef.current.value) return;
    setIsLoading(true);
    const postData: EditPost = {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

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
        <span style={{ userSelect: "none" }}>제목</span>
        <StyledModalInputWrapper>
          <StyledModalInput
            ref={titleRef}
            type="text"
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          ></StyledModalInput>
        </StyledModalInputWrapper>
        <span style={{ userSelect: "none" }}>본문</span>
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
        <StyledModalButton style={{ marginTop: "0" }} onClick={postWrite}>
          수정
        </StyledModalButton>
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
