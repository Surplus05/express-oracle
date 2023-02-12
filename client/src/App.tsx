import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./common/style";
import Body from "./components/body/Body";
import View from "./components/body/view/View";
import Header from "./components/header/Header";
import Community from "./components/body/Community";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/main" element={<Community />}></Route>
            <Route path="/view" element={<View />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
