import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import MobileMenu from "./MobileMenu";

interface MenuLineProps {
  customStyles: string;
}

interface MobileMenuProps {
  isActive: boolean;
}

const MobileMenuFadeIn = keyframes`
  0% {
    transform: translate(100%, 0%);
  }
  100% {
    transform: translate(0%, 0%);
  }
`;
const MobileMenuFadeOut = keyframes`
  0% {
    transform: translate(0%, 0%);
  }
  100% {
    transform: translate(100%, 0%);
  }
`;

const StyledMobileMenu = styled.div<MobileMenuProps>`
  position: absolute;
  width: 100vw;
  top: 3.5em;
  height: calc(100vh - 3.5em);
  left: 0;
  background-color: var(--color--shadow);

  transition: 0.3s;
  @media screen and (min-width: 768px) {
    display: none;
  }
  transform: ${({ isActive }) => {
    return isActive ? "translateX(0%)" : "translateX(100%)";
  }};
`;

const StyledMenuWrapper = styled.div`
  width: 1.5em;
  height: 1.5em;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const StyledMenuLine = styled.span<MenuLineProps>`
  position: absolute;
  transition: 0.15s;
  display: block;
  background-color: black;
  width: calc(100%);
  height: 0.1875em;
  ${({ customStyles }) => `${customStyles}`}
`;

const MenuButton = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  let lineStyles: string[];
  lineStyles = isActive
    ? [
        "top:50%; transform: translateY(-50%) rotate(45deg);",
        "top:50%; transform: translateY(-50%); opacity:0;",
        "top:50%; transform: translateY(-50%) rotate(-45deg);",
      ]
    : [
        "top:0;",
        "top:50%; transform: translateY(-50%);",
        "top:100%; transform: translateY(-0.1875em);",
      ];

  return (
    <>
      <StyledMenuWrapper
        className="MobileMenu"
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        {lineStyles.map((lineStyle, index) => {
          return (
            <StyledMenuLine
              key={index}
              customStyles={lineStyle}
            ></StyledMenuLine>
          );
        })}
      </StyledMenuWrapper>
      <StyledMobileMenu isActive={isActive}>
        <MobileMenu />
      </StyledMobileMenu>
    </>
  );
};

export default MenuButton;
