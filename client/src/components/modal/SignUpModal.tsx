import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import {
  StyledModalButton,
  StyledModalInput,
  StyledModalInputWrapper,
  StyledModalWrapper,
} from "../../common/style";
import { checkDuplicate, signUp } from "../../service/express";
import Loadingcircle from "../common/LoadingCircle";
import Caution from "./Caution";

const StyledModalSubButton = styled.button`
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

  function onFocusInput(e: React.BaseSyntheticEvent) {
    (e.target.parentNode as HTMLDivElement).style.border = "";
    e.target.parentNode.classList.add("focusIn");
  }

  function onBlurInput(e: React.BaseSyntheticEvent) {
    (e.target.parentNode as HTMLDivElement).style.border = "";
    e.target.parentNode.classList.remove("focusIn");
  }

  const dupCheck = useCallback(
    (e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      const isEmail = e.target.parentNode.classList.contains("email");
      const ref = isEmail ? emailRef : usernameRef;
      const setDuplicated = isEmail
        ? setEmailDuplicated
        : setUsernameDuplicated;

      if (!ref.current || ref.current.value === "") {
        return;
      }
      const target = ref.current.parentNode;

      checkDuplicate(isEmail ? "email" : "username", ref.current.value).then(
        (value) => {
          const isDuplicated = value.data["COUNT(*)"] !== 0;
          setDuplicated(isDuplicated);
          if (isDuplicated) {
            (target! as HTMLDivElement).style.border = "1px solid red";
          } else {
            (target! as HTMLDivElement).style.background =
              "var(--color--gray--middle)";
          }
        }
      );
    },
    [emailRef, usernameRef]
  );

  const onPwChange = useCallback(() => {
    if (!pwRef.current) return;
    setPwConstraint(pwRef.current.value.length >= 8);
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
      const alertString = response.data
        ? "????????? ?????????????????????."
        : "????????? ??????????????????.";
      alert(alertString);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    });
  }, []);

  return (
    <StyledModalWrapper>
      <Caution>
        {
          "???????????? ??????????????? ????????? ????????? ??????????????????. ?????? ???????????? ??????????????? ???????????? ?????????."
        }
      </Caution>
      <form style={{ width: "100%" }}>
        <span style={{ userSelect: "none" }}>??????</span>
        <StyledCheckWrapper className="email">
          <StyledModalInputWrapper>
            <StyledModalInput
              ref={emailRef}
              placeholder="???????????? ???????????????."
              type="email"
              onFocus={onFocusInput}
              onBlur={onBlurInput}
              disabled={!emailDuplicated}
            ></StyledModalInput>
          </StyledModalInputWrapper>
          {emailDuplicated ? (
            <StyledModalSubButton onClick={dupCheck}>
              ????????????
            </StyledModalSubButton>
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
        <span style={{ userSelect: "none" }}>????????????</span>
        <StyledCheckWrapper>
          <StyledModalInputWrapper>
            <StyledModalInput
              ref={pwRef}
              placeholder="??????????????? ???????????????."
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
        <span style={{ userSelect: "none" }}>?????????</span>
        <StyledCheckWrapper className="username">
          <StyledModalInputWrapper>
            <StyledModalInput
              ref={usernameRef}
              placeholder="???????????? ???????????????."
              type="text"
              onFocus={onFocusInput}
              onBlur={onBlurInput}
              disabled={!usernameDuplicated}
            ></StyledModalInput>
          </StyledModalInputWrapper>
          {usernameDuplicated ? (
            <StyledModalSubButton onClick={dupCheck}>
              ????????????
            </StyledModalSubButton>
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
        <StyledModalButton
          disabled={emailDuplicated || usernameDuplicated || !pwConstraint}
          onClick={onClickRegister}
        >
          ????????????
        </StyledModalButton>
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
