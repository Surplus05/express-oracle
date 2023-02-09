import react, { useState } from "react";
import { useSelector } from "react-redux";
import { StyledMainTitleWrapper } from "../../common/style";
import IconButton from "../common/IconButton";
import ModalBox from "../modal/ModalBox";
import PostingModal from "../modal/PostingModal";

const CommunityHeader = () => {
  const [showWriteModal, setShowWriteModal] = useState<boolean>(false);
  const uid = useSelector((state: any) => state.user.USER_ID);

  return (
    <>
      <StyledMainTitleWrapper>
        <span style={{ margin: "0 0 0 0.75em" }}>커뮤니티</span>
        {uid > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            글쓰기
            <IconButton
              style={{ margin: "0 0.75em" }}
              onClick={() => {
                setShowWriteModal(!showWriteModal);
              }}
            >
              <i className="fa-solid fa-pen"></i>
            </IconButton>
          </div>
        )}
      </StyledMainTitleWrapper>
      {showWriteModal && (
        <ModalBox
          title={"글을 작성합니다."}
          hideModal={() => {
            setShowWriteModal(false);
          }}
        >
          <PostingModal />
        </ModalBox>
      )}
    </>
  );
};

export default CommunityHeader;
