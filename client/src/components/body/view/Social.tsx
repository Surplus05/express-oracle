import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { postLike } from "../../../service/express";

const StyledSocialWrapper = styled.div`
  font-size: 2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 0.5em;
  padding-bottom: 0.5em;
  width: calc(100% - 1em);
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
`;

const StyledSocialButton = styled.div`
  user-select: none;
  font-size: 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  padding: 0.5em;
  cursor: pointer;
  color: #fff;
  @media screen and (max-width: 768px) {
    font-size: 0.5em;
  }

  :hover {
    background-color: var(--color--gray--middle);
  }
`;

const Social = ({
  postId,
  like,
  dislike,
}: {
  postId: number;
  like: number;
  dislike: number;
}) => {
  const [likeState, setLikeState] = useState<number>(like);
  const [dislikeState, setDislikeState] = useState<number>(dislike);
  const onClickLike = useCallback(() => {
    postLike(postId, true).then((value) => {
      setLikeState(value.data.LIKES);
    });
  }, []);
  const onClickDislike = useCallback(() => {
    postLike(postId, false).then((value) => {
      setDislikeState(value.data.DISLIKES);
    });
  }, []);

  return (
    <StyledSocialWrapper>
      <StyledSocialButton
        onClick={onClickLike}
        style={{ backgroundColor: "#4080FF", marginRight: "1em" }}
      >
        {likeState}
      </StyledSocialButton>
      <StyledSocialButton
        onClick={onClickDislike}
        style={{ backgroundColor: "#F25268" }}
      >
        {dislikeState}
      </StyledSocialButton>
    </StyledSocialWrapper>
  );
};

export default Social;
