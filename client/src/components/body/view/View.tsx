import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { StyledMainContainer } from "../../../common/style";
import { PostType } from "../../../common/types";
import { deletePost, getPost } from "../../../service/express";
import EditModal from "../../modal/EditModal";
import ModalBox from "../../modal/ModalBox";
import Comments from "./Comments";
import Social from "./Social";
import ViewHeader from "./ViewHeader";

const StyledMainTextWrapper = styled.div`
  margin: 0.75em;
  width: calc(100% - 1.5em);
  min-height: 20em;
`;

const StyledButtonList = styled.div`
  margin: 0 0.75em 0.75em 0.75em;
  width: calc(100% - 1.5em);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledControlButton = styled.div`
  user-select: none;
  background-color: var(--color--main);
  padding: 0.25em 0.75em;
  border-radius: var(--border--radius);
  color: white;
  cursor: pointer;
`;

const View = () => {
  const uid = useSelector((state: any) => state.user.USER_ID);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<PostType>();

  useEffect(() => {
    const postId = searchParams.get("postId");
    if (postId != null) {
      getPost(Number(postId)).then((value: any) => {
        setCurrentPost(value.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onClickDelete() {
    if (currentPost != null)
      deletePost(currentPost.POST_ID).then(() => {
        navigate("/main?page=1");
      });
  }

  if (currentPost == null) return <StyledMainContainer></StyledMainContainer>;
  return (
    <>
      <StyledMainContainer>
        <ViewHeader
          data={{
            PUBLISHED: currentPost.PUBLISHED,
            TITLE: currentPost.TITLE,
            USERNAME: currentPost.USERNAME,
            VIEWS: currentPost.VIEWS,
            COMMENTS: currentPost.COMMENTS,
            LIKES: currentPost.LIKES,
          }}
        ></ViewHeader>
        <StyledMainTextWrapper>
          {currentPost.POST.split("\n").map((line: string, index: number) => {
            return (
              <span key={index}>
                {line}
                <br />
              </span>
            );
          })}
        </StyledMainTextWrapper>
        <Social
          postId={currentPost.POST_ID}
          statistic={{
            like: currentPost.LIKES,
            dislike: currentPost.DISLIKES,
          }}
        ></Social>
        <Comments postId={currentPost.POST_ID}></Comments>
        <StyledButtonList>
          <StyledControlButton
            onClick={() => {
              navigate("/main?page=1");
            }}
          >
            목록 보기
          </StyledControlButton>
          {uid === currentPost.USER_ID && (
            <div style={{ display: "flex" }}>
              <StyledControlButton
                style={{ marginRight: "1em" }}
                onClick={() => {
                  setShowEditModal(true);
                }}
              >
                수정
              </StyledControlButton>
              <StyledControlButton
                style={{ backgroundColor: "rgb(242, 82, 104)" }}
                onClick={onClickDelete}
              >
                삭제
              </StyledControlButton>
            </div>
          )}
        </StyledButtonList>
      </StyledMainContainer>
      {showEditModal && (
        <ModalBox
          title={"글을 수정합니다."}
          hideModal={() => {
            setShowEditModal(false);
          }}
        >
          <EditModal
            title={currentPost.TITLE}
            post={currentPost.POST}
            postId={currentPost.POST_ID}
          />
        </ModalBox>
      )}
    </>
  );
};

export default View;
