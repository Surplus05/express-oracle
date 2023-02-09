import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { PostType } from "../../common/types";

const StyledPostWrapper = styled.div`
  font-size: 0.75em;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: calc(100%- 1.5em);
  overflow: hidden;
  margin: 0 0.75em;
  padding: 0 0.75em;
  border-radius: var(--border--radius);
  height: 3.36em;
  cursor: pointer;
  :hover {
    background-color: var(--color--main);
    color: #fff;
  }
`;

const StyledTitleSpan = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledPostInfoWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 0;
  flex-direction: column;
`;

const StyledStatisticWrapper = styled.div`
  font-size: 0.75em;
  user-select: none;
  display: flex;
  justify-content: flex-start;
  align-content: center;
`;

const StyledStatisticItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  margin-right: 1.5em;
`;

const StyledUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StatIconStyle = { lineHeight: "1.6em", marginRight: "0.5em" };

const Post = ({ data }: { data: PostType }) => {
  const navigate = useNavigate();

  function onClickPost() {
    navigate(`/view?postId=${data.POST_ID}`);
  }

  return (
    <StyledPostWrapper onClick={onClickPost}>
      <StyledPostInfoWrapper>
        <StyledTitleSpan>{data.TITLE}</StyledTitleSpan>
        <StyledStatisticWrapper>
          <StyledStatisticItem>
            <i className="fa-regular fa-eye" style={StatIconStyle}></i>
            {data.VIEWS}
          </StyledStatisticItem>
          <StyledStatisticItem>
            <i className="fa-regular fa-comment-dots" style={StatIconStyle}></i>
            {data.COMMENTS}
          </StyledStatisticItem>
          <StyledStatisticItem>
            <i className="fa-regular fa-thumbs-up" style={StatIconStyle}></i>
            {data.LIKES}
          </StyledStatisticItem>
        </StyledStatisticWrapper>
      </StyledPostInfoWrapper>
      <StyledUserInfoWrapper>
        <i className="fa-solid fa-user" style={{ marginRight: "0.5em" }}></i>
        <span style={{ whiteSpace: "nowrap" }}>{data.USERNAME}</span>
      </StyledUserInfoWrapper>
    </StyledPostWrapper>
  );
};

export default Post;
