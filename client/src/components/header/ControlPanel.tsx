import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import ModalBox from "../modal/ModalBox";
import SignInModal from "../modal/SignInModal";
import SignUpModal from "../modal/SignUpModal";
import MenuButton from "./MenuButton";

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 9em;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const ControlPanel = () => {
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);
  const [showSignUpModal, setshowSignUpModal] = useState<boolean>(false);
  return (
    <>
      <StyledButtonWrapper>
        <Button
          isColor={false}
          text="로그인"
          onClick={() => {
            setShowSignInModal(!showSignInModal);
          }}
        ></Button>
        <Button
          isColor={true}
          text="회원가입"
          onClick={() => {
            setshowSignUpModal(!showSignUpModal);
          }}
        ></Button>
      </StyledButtonWrapper>
      <MenuButton></MenuButton>
      <>
        {showSignInModal && (
          <ModalBox
            title={"로그인"}
            hideModal={() => {
              setShowSignInModal(false);
            }}
          >
            <SignInModal />
          </ModalBox>
        )}
        {showSignUpModal && (
          <ModalBox
            title={"회원가입"}
            hideModal={() => {
              setshowSignUpModal(false);
            }}
          >
            <SignUpModal />
          </ModalBox>
        )}
      </>
    </>
  );
};

export default ControlPanel;
