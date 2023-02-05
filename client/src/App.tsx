import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./common/style";
import Board from "./components/body/Board";
import Body from "./components/body/Body";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/main" element={<Board />}></Route>
            <Route path="/user" element={<>children2</>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
