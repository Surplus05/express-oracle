import React from "react";
import styled from "styled-components";
import { getDateString } from "../../../common/functions";
import { PostHeader } from "../../../common/types";

const StyledPostHeader = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 6em;
  overflow: hidden;
  width: calc(100% - 1.5em);
  margin: 0 0.75em;
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
`;

const StyledPostInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const StyledTitleSpan = styled.span`
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.25em;
  @media screen and (max-width: 768px) {
    font-size: 1em;
  }
`;

const StyledPostInformationSpan = styled.span`
  font-size: 0.875em;
  margin-right: 0.75em;
  @media screen and (max-width: 768px) {
    font-size: 0.75em;
  }
`;

const StyledStatisticItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  margin-left: 1em;
  @media screen and (max-width: 768px) {
    font-size: 0.75em;
  }
`;

const StyledStatisticWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StatIconStyle = { lineHeight: "1.6em", marginRight: "0.5em" };

const ViewHeader = ({ data }: { data: PostHeader }) => {
  let date = new Date(data.PUBLISHED);
  return (
    <StyledPostHeader>
      <StyledTitleSpan>{data.TITLE}</StyledTitleSpan>
      <StyledPostInfoWrapper>
        <div>
          <StyledPostInformationSpan>
            <i
              className="fa-solid fa-user"
              style={{ marginRight: "0.5em" }}
            ></i>
            <span style={{ fontWeight: "bold" }}>{data.USERNAME}</span>
          </StyledPostInformationSpan>
          <StyledPostInformationSpan>
            {getDateString(date)}
          </StyledPostInformationSpan>
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
    </StyledPostHeader>
  );
};

export default ViewHeader;
