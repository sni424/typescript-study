import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { GlobalStyle } from "./utils/GlobalStyled";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Main from "./pages/Main";
import TodoList from "./pages/TodoList";
import { darkTheme } from "./utils/theme";

function App() {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/todo" element={<TodoList />} />
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
