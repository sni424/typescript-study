import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../../atoms";

const ToDoShow = ({ userid, id, email, password, category }: IToDo) => {
    const setTodos = useSetRecoilState(toDoState);

    const onClick = (
        newCate: IToDo["category"],
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        setTodos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((data) => data.id === id);
            const newToDo = { userid, id, email, category: newCate, password };
            return [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1),
            ];
        });
    };

    return (
        <li
            style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}
        >
            id : {userid} / email : {email} / category : {category}
            <div style={{ marginLeft: "10px" }}>
                {category !== "Doing" && (
                    <button onClick={(e) => onClick("Doing", e)}>Doing</button>
                )}
                {category !== "To-Do" && (
                    <button onClick={(e) => onClick("To-Do", e)}>To-Do</button>
                )}
                {category !== "Done" && (
                    <button onClick={(e) => onClick("Done", e)}>Done</button>
                )}
            </div>
        </li>
    );
};

export default ToDoShow;
