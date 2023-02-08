import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { StyledMainContainer } from "../../../common/style";
import { getArticle } from "../../../service/express";
import Comments from "./Comments";
import Social from "./Social";
import ViewHeader from "./ViewHeader";

interface PostData {
  COMMENTS: number;
  DISLIKES: number;
  LIKES: number;
  POST: string;
  POST_ID: number;
  PUBLISHED: string;
  TITLE: string;
  USERNAME: string;
  USER_ID: number;
  VIEWS: number;
  WRITER_ID: number;
}

const StyledMainTextWrapper = styled.div`
  margin: 0.75em;
  width: calc(100% - 1.5em);
  min-height: 23em;
`;

const View = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentArticle, setCurrentArticle] = useState<PostData>();

  useEffect(() => {
    const postId = searchParams.get("postId");
    if (postId != null) {
      getArticle(Number(postId)).then((value: any) => {
        setCurrentArticle(value.data);
      });
    }
  }, []);

  if (currentArticle == null) return <></>;
  return (
    <StyledMainContainer style={{ justifyContent: "flex-start" }}>
      <ViewHeader
        data={{
          PUBLISHED: currentArticle.PUBLISHED,
          TITLE: currentArticle.TITLE,
          USERNAME: currentArticle.USERNAME,
          VIEWS: currentArticle.VIEWS,
          COMMENTS: currentArticle.COMMENTS,
          LIKES: currentArticle.LIKES,
        }}
      ></ViewHeader>
      <StyledMainTextWrapper>
        {currentArticle.POST.split("\n").map((line: string, index: number) => {
          return (
            <span key={index}>
              {line}
              <br />
            </span>
          );
        })}
      </StyledMainTextWrapper>
      <Social
        postId={currentArticle.POST_ID}
        like={currentArticle.LIKES}
        dislike={currentArticle.DISLIKES}
      ></Social>
      <Comments postId={currentArticle.POST_ID}></Comments>
    </StyledMainContainer>
  );
};

export default View;
