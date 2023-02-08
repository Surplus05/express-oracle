import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import {
  StyledModalInput,
  StyledModalInputWrapper,
  StyledModalWrapper,
  StyledSignInButton,
  StyledSpanText,
} from "../../common/style";
import { checkDuplicate, signUp } from "../../service/express";
import Loadingcircle from "../common/LoadingCircle";

const StyledModalButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: var(--color--main);
  color: #fff;
  width: 7em;
  margin-left: 1em;
  height: 34.4px;
  border-radius: var(--border--radius);
`;

const StyledCheckWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SignUpModal = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [emailDuplicated, setEmailDuplicated] = useState<boolean>(true);
  const [usernameDuplicated, setUsernameDuplicated] = useState<boolean>(true);
  const [pwConstraint, setPwConstraint] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onFocusInput = useCallback((e: React.BaseSyntheticEvent) => {
    (e.target.parentNode as HTMLDivElement).style.border = "";
    e.target.parentNode.classList.add("focusIn");
  }, []);

  const onBlurInput = useCallback((e: React.BaseSyntheticEvent) => {
    (e.target.parentNode as HTMLDivElement).style.border = "";
    e.target.parentNode.classList.remove("focusIn");
  }, []);

  const dupCheck = useCallback(
    (e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      if (e.target.parentNode.classList.contains("email")) {
        if (emailRef.current && emailRef.current.value !== "")
          checkDuplicate("email", emailRef.current.value).then((value) => {
            if (value.data["COUNT(*)"] === 0) {
              setEmailDuplicated(false);
              (
                emailRef.current!.parentNode as HTMLDivElement
              ).style.background = "var(--color--gray--middle)";
            } else {
              setEmailDuplicated(true);
              (emailRef.current!.parentNode as HTMLDivElement).style.border =
                "1px solid red";
            }
          });
      } else if (e.target.parentNode.classList.contains("username")) {
        if (usernameRef.current && usernameRef.current.value !== "")
          checkDuplicate("username", usernameRef.current.value).then(
            (value) => {
              if (value.data["COUNT(*)"] === 0) {
                setUsernameDuplicated(false);
                (
                  usernameRef.current!.parentNode as HTMLDivElement
                ).style.background = "var(--color--gray--middle)";
              } else {
                setUsernameDuplicated(true);
                (
                  usernameRef.current!.parentNode as HTMLDivElement
                ).style.border = "1px solid red";
              }
            }
          );
      } else {
        throw new Error("unknown target error");
      }
    },
    [emailRef, usernameRef]
  );

  const onPwChange = useCallback(() => {
    if (!pwRef.current) return;
    if (pwRef.current.value.length >= 8) {
      setPwConstraint(true);
    }
  }, [pwRef]);

  const onClickRegister = useCallback((e: React.BaseSyntheticEvent) => {
    if (!emailRef.current || !pwRef.current || !usernameRef.current) return;
    e.preventDefault();
    setIsLoading(true);
    signUp({
      mail: emailRef.current.value,
      pw: pwRef.current.value,
      username: usernameRef.current.value,
    }).then((response) => {
      if (response.data) {
        alert("가입이 완료되었습니다.");
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      } else {
        alert("가입이 실패했습니다.");
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    });
  }, []);

  return (
    <StyledModalWrapper>
      <form style={{ width: "100%" }}>
        <StyledSpanText>메일</StyledSpanText>
        <StyledCheckWrapper className="email">
          <StyledModalInputWrapper>
            <StyledModalInput
              ref={emailRef}
              placeholder="이메일을 입력하세요."
              type="email"
              onFocus={onFocusInput}
              onBlur={onBlurInput}
              disabled={!emailDuplicated}
            ></StyledModalInput>
          </StyledModalInputWrapper>
          {emailDuplicated ? (
            <StyledModalButton onClick={dupCheck}>중복확인</StyledModalButton>
          ) : (
            <i
              className="fa-solid fa-check"
              style={{
                width: "34.4px",
                height: "34.4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "green",
              }}
            ></i>
          )}
        </StyledCheckWrapper>
        <StyledSpanText>비밀번호</StyledSpanText>
        <StyledCheckWrapper>
          <StyledModalInputWrapper>
            <StyledModalInput
              ref={pwRef}
              placeholder="비밀번호를 입력하세요."
              autoComplete="off"
              type="password"
              onFocus={onFocusInput}
              onBlur={onBlurInput}
              onChange={onPwChange}
            ></StyledModalInput>
          </StyledModalInputWrapper>
          {pwConstraint ? (
            <i
              className="fa-solid fa-check"
              style={{
                width: "34.4px",
                height: "34.4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "green",
              }}
            ></i>
          ) : (
            <i
              className="fa-solid fa-x"
              style={{
                width: "34.4px",
                height: "34.4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "red",
              }}
            ></i>
          )}
        </StyledCheckWrapper>
        <StyledSpanText>닉네임</StyledSpanText>
        <StyledCheckWrapper className="username">
          <StyledModalInputWrapper>
            <StyledModalInput
              ref={usernameRef}
              placeholder="닉네임을 입력하세요."
              type="text"
              onFocus={onFocusInput}
              onBlur={onBlurInput}
              disabled={!usernameDuplicated}
            ></StyledModalInput>
          </StyledModalInputWrapper>
          {usernameDuplicated ? (
            <StyledModalButton onClick={dupCheck}>중복확인</StyledModalButton>
          ) : (
            <i
              className="fa-solid fa-check"
              style={{
                width: "34.4px",
                height: "34.4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "green",
              }}
            ></i>
          )}
        </StyledCheckWrapper>
        <StyledSignInButton
          disabled={emailDuplicated || usernameDuplicated || !pwConstraint}
          onClick={onClickRegister}
        >
          회원가입
        </StyledSignInButton>
      </form>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "0.5em",
            backgroundColor: "var(--color--transparent)",
          }}
        >
          <Loadingcircle></Loadingcircle>
        </div>
      )}
    </StyledModalWrapper>
  );
};

export default SignUpModal;
