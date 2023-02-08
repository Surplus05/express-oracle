import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  StyledModalInput,
  StyledModalInputWrapper,
  StyledModalWrapper,
  StyledSignInButton,
  StyledSpanText,
} from "../../common/style";
import { login } from "../../redux/user";
import { signInRequest } from "../../service/express";
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

  const onSignIn = async (e: React.BaseSyntheticEvent) => {
    if (!emailRef.current || !pwRef.current) return;
    e.preventDefault();

    signInRequest({
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
        <StyledSpanText>메일</StyledSpanText>
        <StyledModalInputWrapper>
          <StyledModalInput
            ref={emailRef}
            placeholder="이메일을 입력하세요."
            type="email"
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          ></StyledModalInput>
        </StyledModalInputWrapper>
        <StyledSpanText>비밀번호</StyledSpanText>
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
        <StyledSignInButton onClick={onSignIn}>로그인</StyledSignInButton>
      </form>
    </StyledModalWrapper>
  );
};

export default SignInModal;
