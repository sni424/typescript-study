import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, toDoState } from "../../atoms";
import CreateToDo from "../../components/CreateToDo";
import ToDoShow from "../../components/ToDoShow";

const TodoList = () => {
    const toDos = useRecoilValue(toDoState);
    const newToDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);

    const onChange = (e: React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as any);
    };
    return (
        <div>
            <h1>Todo List</h1>
            <hr />
            <CreateToDo />
            <select
                value={category}
                onChange={(e) => onChange(e)}
                style={{ marginTop: "10px" }}
            >
                <option value="All">All</option>
                <option value="To-Do">ToDo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
            </select>
            <ul>
                {category === "All" &&
                    toDos?.map((data) => {
                        return <ToDoShow key={data.id} {...data} />;
                    })}
                {newToDos?.map((data) => {
                    return <ToDoShow key={data.id} {...data} />;
                })}
            </ul>
            <hr />
        </div>
    );
};

export default TodoList;
