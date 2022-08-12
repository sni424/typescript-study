import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { GlobalStyle } from "./utils/GlobalStyled";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Main from "./pages/Main";
import TodoList from "./pages/TodoList";
import { darkTheme } from "./utils/theme";
import AtomSet from "./pages/AtomSet";

function App() {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/todo" element={<TodoList />} />
                    <Route path="/atom" element={<AtomSet />} />
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
