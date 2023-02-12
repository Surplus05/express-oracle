import styled, { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`body {

  --border--radius : 4px;
  --color--main : #3382F7;
  --color--main--hover: #d9e9f8;
  --color--shadow:#dee1e7;
  --color--black: #111;
  --color--white: #ddd;
  --color--gray--foucs:#333333;
  --color--gray--middle: #55555555;
  --color--gray-outFoucs:#BFBFBF;
  --color--background:#F5F6F7;
  --color--transparent: #141414bf;

  background-color: var(--color--background);
  margin: 0;
  padding: 0;
  transition: 0.1s;
  overflow-x: hidden;
  box-sizing: border-box;
  font-family: 'KoPubWorldDotum';

  .focusIn {
    border: 1px solid var(--color--main);
  }

  &::-webkit-scrollbar {
    display: none;
  }

}
`;
export default GlobalStyle;

interface InnerLayoutProps {
  alignItems?: string;
}

export const StyledInnerLayoutWrapper = styled.div<InnerLayoutProps>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
  max-width: 72em;
  margin: 0 1em;
  width: 100%;
  height: 100%;
`;

export const StyledModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0.75em;
  height: calc(100% - 4.55em);
  width: calc(100% - 1.5em);
  overflow: hidden;
  transition: 0.3s;
`;

export const StyledModalInputWrapper = styled.div`
  border: 1px solid var(--color--gray-outFoucs);
  padding: 0.25em;
  box-sizing: border-box;
  width: 100%;
  transition: 0.3s;
  margin-bottom: 1em;
`;

export const StyledModalInput = styled.input`
  width: 100%;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  text-decoration: none;
  border: none;
  outline: none;
  :disabled {
    background-color: transparent;
  }
`;

export const StyledModalButton = styled.button`
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  background: var(--color--main);
  border: none;
  color: #fff;
  width: 100%;
  height: 2.5em;
  margin-top: 2em;
  border-radius: var(--border--radius);
  font-family: "KoPubWorldDotum";
  :disabled {
    background-color: var(--color--gray--middle);
  }
`;

export const StyledMainContainer = styled.div`
  border-radius: var(--border--radius);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  width: calc(100% - 13em);
  min-height: calc(100vh - 5.5em);
  margin: 1em 0em 1em 0;
  box-shadow: 0 0 0.375em var(--color--shadow);

  @media screen and (max-width: 768px) {
    width: calc(100%);
    margin: 1em 0;
  }
`;

export const StyledMainTitleWrapper = styled.div`
  user-select: none;
  display: flex;
  height: 3.05em;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  width: calc(100%);
  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
`;
