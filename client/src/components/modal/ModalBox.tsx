import React from "react";
import styled from "styled-components";
import IconButton from "../common/IconButton";

interface ModalWrapperProps {
  top?: string;
}

const StyledModalWrapper = styled.div<ModalWrapperProps>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${({ top }) => {
    return top ? top : "0";
  }};
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--color--transparent);
`;

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 24em;
  max-height: 36em;
  width: calc(100% - 2em);
  height: calc(100% - 2em);
  border-radius: var(--border--radius);
  overflow: hidden;
  background: #fff;
  margin: 1em;
`;

const StyledModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.05em;
  margin: 0 0.75em;
  width: calc(100% - 1.5em);
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
`;

const ModalBox = ({
  title,
  children,
  hideModal,
  top,
}: {
  title: string;
  children: React.ReactNode;
  hideModal: Function;
  top?: string;
}) => {
  function onClickOutside(e: React.BaseSyntheticEvent) {
    if (e.target.classList.contains("outside")) {
      hideModal();
    }
  }
  return (
    <StyledModalWrapper
      top={top}
      className="outside"
      onMouseDown={onClickOutside}
    >
      <StyledModal>
        <StyledModalTitle>
          {title}
          <IconButton
            onClick={() => {
              hideModal();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </IconButton>
        </StyledModalTitle>
        {children}
      </StyledModal>
    </StyledModalWrapper>
  );
};

export default ModalBox;
