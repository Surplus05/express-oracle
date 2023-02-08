import React from "react";
import styled from "styled-components";
import { getDateString } from "../../../common/functions";

const StyledTitleWrapper = styled.div`
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

interface ViewHeaderProps {
  PUBLISHED: string;
  TITLE: string;
  USERNAME: string;
  VIEWS: number;
  COMMENTS: number;
  LIKES: number;
}

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

const StyledStatSpan = styled.span`
  font-size: 0.875em;
  margin-right: 0.75em;
  @media screen and (max-width: 768px) {
    font-size: 0.75em;
  }
`;
const StatIconStyle = { lineHeight: "1.6em", marginRight: "0.5em" };

const StyledStatItemWrapper = styled.div`
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

const StyledSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const StyledStatWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ViewHeader = ({ data }: { data: ViewHeaderProps }) => {
  let date = new Date(data.PUBLISHED);
  return (
    <StyledTitleWrapper>
      <StyledTitleSpan>{data.TITLE}</StyledTitleSpan>
      <StyledSubWrapper>
        <div>
          <StyledStatSpan>
            <i
              className="fa-solid fa-user"
              style={{ marginRight: "0.5em" }}
            ></i>
            <span style={{ fontWeight: "bold" }}>{data.USERNAME}</span>
          </StyledStatSpan>
          <StyledStatSpan>{getDateString(date)}</StyledStatSpan>
        </div>
        <StyledStatWrapper>
          <StyledStatItemWrapper>
            <i className="fa-regular fa-eye" style={StatIconStyle}></i>
            {data.VIEWS}
          </StyledStatItemWrapper>
          <StyledStatItemWrapper>
            <i className="fa-regular fa-comment-dots" style={StatIconStyle}></i>
            {data.COMMENTS}
          </StyledStatItemWrapper>
          <StyledStatItemWrapper>
            <i className="fa-regular fa-thumbs-up" style={StatIconStyle}></i>
            {data.LIKES}
          </StyledStatItemWrapper>
        </StyledStatWrapper>
      </StyledSubWrapper>
    </StyledTitleWrapper>
  );
};

export default ViewHeader;
