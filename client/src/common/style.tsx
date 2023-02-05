import styled, { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`body {

  --border--radius : 4px;
  --color--main : #3382F7;
  --color--main--hover: #d9e9f8;
  --color--shadow:#dee1e7;
  --color--black: #111;
  --color--white: #ddd;
  --color--gray--foucs:#333333;
  --color--gray--middle: #555555;
  --color--gray-outFoucs:#BFBFBF;
  --color--background:#F5F6F7;

  background-color: var(--color--background);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'KoPubWorldDotum';
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
