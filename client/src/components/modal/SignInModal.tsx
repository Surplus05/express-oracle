import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyledModalButton,
  StyledModalInput,
  StyledModalInputWrapper,
  StyledModalWrapper,
} from "../../common/style";
import { login } from "../../redux/user";
import { signIn } from "../../service/express";
import Caution from "./Caution";

const SignInModal = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  function onFocusInput(e: React.BaseSyntheticEvent) {
    e.target.parentNode.classList.add("focusIn");
  }
  function onBlurInput(e: React.BaseSyntheticEvent) {
    e.target.parentNode.classList.remove("focusIn");
  }

  const onClickSignIn = async (e: React.BaseSyntheticEvent) => {
    if (!emailRef.current || !pwRef.current) return;
    e.preventDefault();

    signIn({
      mail: emailRef.current.value,
      pw: pwRef.current.value,
    })
      .then((value) => {
        dispatch(login(value.data.rows[0]));
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((error) => {
        setIsError(true);
        throw new Error(error);
      });
  };

  return (
    <StyledModalWrapper>
      {isError && <Caution>{"잘못된 이메일 또는 비밀번호입니다"}</Caution>}
      <form onSubmit={() => {}} style={{ width: "100%" }}>
        <span style={{ userSelect: "none" }}>메일</span>
        <StyledModalInputWrapper>
          <StyledModalInput
            ref={emailRef}
            placeholder="이메일을 입력하세요."
            type="email"
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          ></StyledModalInput>
        </StyledModalInputWrapper>
        <span style={{ userSelect: "none" }}>비밀번호</span>
        <StyledModalInputWrapper>
          <StyledModalInput
            ref={pwRef}
            placeholder="비밀번호를 입력하세요."
            autoComplete="off"
            type="password"
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          ></StyledModalInput>
        </StyledModalInputWrapper>
        <StyledModalButton onClick={onClickSignIn}>로그인</StyledModalButton>
      </form>
    </StyledModalWrapper>
  );
};

export default SignInModal;
