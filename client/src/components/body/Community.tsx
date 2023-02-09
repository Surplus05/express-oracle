import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { StyledMainContainer } from "../../common/style";
import { PostType } from "../../common/types";
import { getPostList } from "../../service/express";
import CommunityHeader from "./CommunityHeader";
import Paging from "./Paging";
import Post from "./Post";

const StyledPostList = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
`;

const Community = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<PostType[]>();
  const [currentPage, setCurrentPage] = useState<number | null>(
    Number(searchParams.get("page")) || null
  );
  const totalArticles = useRef<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage != null) {
      getPostList(currentPage).then((value) => {
        setPosts(value.data.rows);
        totalArticles.current = value.data.totalArticles;
      });
    } else {
      setCurrentPage(1);
      navigate("/main?page=1");
    }
  }, [currentPage]);

  return (
    <StyledMainContainer>
      <CommunityHeader></CommunityHeader>
      <StyledPostList>
        {posts &&
          posts.map((value: PostType) => {
            return <Post key={value.POST_ID} data={value}></Post>;
          })}
      </StyledPostList>
      {totalArticles.current && currentPage && (
        <Paging
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalArticles={totalArticles.current}
        ></Paging>
      )}
    </StyledMainContainer>
  );
};

export default Community;
