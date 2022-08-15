import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
    categoryState,
    categoryStateNotAll,
    toDoSelector,
    toDoState,
} from "../../atoms";
import CreateCategory from "../../components/CreateCategory";
import CreateToDo from "../../components/CreateToDo";
import ToDoShow from "../../components/ToDoShow";

const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TodoList = () => {
    const toDos = useRecoilValue(toDoState);
    const newToDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const recoilValue = useRecoilValue(categoryStateNotAll);
    const onChange = (e: React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as any);
    };
    return (
        <div style={{ marginTop: "15rem" }}>
            <FlexDiv>
                <h1>Todo List</h1>
            </FlexDiv>
            <hr />
            <FlexDiv>
                <CreateToDo />
            </FlexDiv>
            <FlexDiv>
                <CreateCategory />
            </FlexDiv>
            <FlexDiv>
                <select
                    value={category}
                    onChange={(e) => onChange(e)}
                    style={{ marginTop: "10px" }}
                >
                    {recoilValue?.map((data, i) => {
                        return (
                            <option key={i} value={data}>
                                {data}
                            </option>
                        );
                    })}
                </select>
            </FlexDiv>
            <FlexDiv>
                <ul>
                    {newToDos?.map((data) => {
                        return <ToDoShow key={data.id} {...data} />;
                    })}
                </ul>
            </FlexDiv>
            <hr />
        </div>
    );
};

export default TodoList;
