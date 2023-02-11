import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { DAY_TO_MILLISECONDS } from "../../common/constant";
import { PostType } from "../../common/types";

const StyledPostWrapper = styled.div`
  font-size: 0.875em;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: calc(100%- 1.5em);
  overflow: hidden;
  margin: 0 0.75em;
  padding: 0 0.75em;
  border-radius: var(--border--radius);
  min-height: 3.36em;
  cursor: pointer;
  :hover {
    background-color: var(--color--main);
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.75em;
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

const StyledPostTag = styled.div`
  font-weight: bold;
  font-size: 0.75em;
  margin-right: 0.5em;
  border-radius: var(--border--radius);
  display: inline-block;
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
        <div style={{ flexDirection: "row" }}>
          {new Date().getTime() - new Date(data.PUBLISHED).getTime() <
            DAY_TO_MILLISECONDS && (
            <StyledPostTag
              style={{
                padding: "0 0.5em",
                color: "rgb(74, 216, 113)",
                backgroundColor: "rgba(74, 216, 113, 0.15)",
              }}
            >
              NEW
            </StyledPostTag>
          )}
          {data.LIKES >= 10 && (
            <StyledPostTag
              style={{
                padding: "0 0.5em",
                color: "rgb(216, 74, 74)",
                backgroundColor: "rgba(216, 74, 74, 0.15)",
              }}
            >
              HOT
            </StyledPostTag>
          )}
          <StyledTitleSpan>{data.TITLE}</StyledTitleSpan>
        </div>
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
