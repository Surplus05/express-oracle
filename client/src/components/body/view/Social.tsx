import React, { useState } from "react";
import styled from "styled-components";
import { PostStatistic } from "../../../common/types";
import { postSocial } from "../../../service/express";

const StyledSocialWrapper = styled.div`
  font-size: 2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 0.5em;
  width: calc(100% - 1em);
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
`;

const StyledSocialBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 2em;
  font-size: 0.5em;
`;

const StyledSocialButton = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  padding: 0.5em;
  cursor: pointer;
  color: #fff;
  :hover {
    background-color: var(--color--gray--middle);
  }
`;

const Social = ({
  postId,
  statistic,
}: {
  postId: number;
  statistic: PostStatistic;
}) => {
  const [like, setLike] = useState<number>(statistic.like);
  const [dislike, setDislike] = useState<number>(statistic.dislike);

  function onClickSocial(type: boolean) {
    const setSocial = type ? setLike : setDislike;
    postSocial(postId, type).then((value) => {
      value.data.LIKES
        ? setSocial(value.data.LIKES)
        : setSocial(value.data.DISLIKES);
    });
  }

  return (
    <StyledSocialWrapper>
      <StyledSocialBox>
        {like}
        <StyledSocialButton
          onClick={() => {
            onClickSocial(true);
          }}
          style={{ backgroundColor: "#4080FF", margin: "0 1em" }}
        >
          <i className="fa-regular fa-thumbs-up"></i>
        </StyledSocialButton>
        <StyledSocialButton
          onClick={() => {
            onClickSocial(false);
          }}
          style={{ backgroundColor: "#F25268", marginRight: "1em" }}
        >
          <i className="fa-regular fa-thumbs-down"></i>
        </StyledSocialButton>
        {dislike}
      </StyledSocialBox>
    </StyledSocialWrapper>
  );
};

export default Social;
