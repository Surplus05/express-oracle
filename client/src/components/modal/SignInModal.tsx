import React from "react";
import {
  StyledModalInput,
  StyledModalInputWrapper,
  StyledModalWrapper,
  StyledSignInButton,
  StyledSpanText,
} from "../../common/style";

const SignInModal = () => {
  function onFocusInput(e: React.BaseSyntheticEvent) {
    e.target.parentNode.classList.add("focusIn");
  }
  function onBlurInput(e: React.BaseSyntheticEvent) {
    e.target.parentNode.classList.remove("focusIn");
  }

  return (
    <StyledModalWrapper>
      <form style={{ width: "100%" }}>
        <StyledSpanText>메일</StyledSpanText>
        <StyledModalInputWrapper>
          <StyledModalInput
            placeholder="이메일을 입력하세요."
            type="email"
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          ></StyledModalInput>
        </StyledModalInputWrapper>
        <StyledSpanText>비밀번호</StyledSpanText>
        <StyledModalInputWrapper>
          <StyledModalInput
            placeholder="비밀번호를 입력하세요."
            autoComplete="off"
            type="password"
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          ></StyledModalInput>
        </StyledModalInputWrapper>
        <StyledSignInButton>로그인</StyledSignInButton>
      </form>
    </StyledModalWrapper>
  );
};

export default SignInModal;
