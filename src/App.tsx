import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { GlobalStyle } from "./utils/GlobalStyled";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";

function App() {
    return (
        <>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </>
    );
}

export default App;
