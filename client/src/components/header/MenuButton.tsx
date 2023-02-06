import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface MenuLineProps {
  customStyles: string;
}

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
  // isActive에 따라 메뉴를 띄울 필요가 있으므로 Body 에 필요함 -> Redux 에서 쓰자

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
    <StyledMenuWrapper
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      {lineStyles.map((lineStyle, index) => {
        return (
          <StyledMenuLine key={index} customStyles={lineStyle}></StyledMenuLine>
        );
      })}
    </StyledMenuWrapper>
  );
};

export default MenuButton;
