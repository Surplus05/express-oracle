import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { logout } from "../../redux/user";
import ModalBox from "../modal/ModalBox";
import SignInModal from "../modal/SignInModal";
import SignUpModal from "../modal/SignUpModal";

const StyledMobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
`;

const StyledMobileMenuItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
  background-color: #fff;
  padding: 1em;
  border-radius: var(--border--radius);
  box-shadow: 0 0 0.375em var(--color--shadow);
`;

const MobileMenu = () => {
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);
  const [showSignUpModal, setshowSignUpModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const uid = useSelector((state: any) => state.user.USER_ID);

  return (
    <>
      <StyledMobileMenuWrapper>
        {uid < 0 ? (
          <>
            <StyledMobileMenuItem
              onClick={() => {
                setShowSignInModal(!showSignInModal);
              }}
            >
              로그인
            </StyledMobileMenuItem>
            <StyledMobileMenuItem
              onClick={() => {
                setshowSignUpModal(!showSignUpModal);
              }}
            >
              회원가입
            </StyledMobileMenuItem>
          </>
        ) : (
          <StyledMobileMenuItem
            onClick={() => {
              dispatch(logout());
            }}
          >
            로그아웃
          </StyledMobileMenuItem>
        )}
      </StyledMobileMenuWrapper>
      {showSignInModal && (
        <ModalBox
          top="-3.5em"
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
          top="-3.5em"
          title={"회원가입"}
          hideModal={() => {
            setshowSignUpModal(false);
          }}
        >
          <SignUpModal />
        </ModalBox>
      )}
    </>
  );
};

export default MobileMenu;
