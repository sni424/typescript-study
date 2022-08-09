import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../../atoms";

const ToDoShow = ({ userid, id, email, password, category }: IToDo) => {
    const setTodos = useSetRecoilState(toDoState);

    const onClick = (newCate: IToDo["category"]) => {
        console.log(newCate);
    };

    return (
        <li
            style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}
            key={id}
        >
            id : {userid} / email : {email} / category : {category}
            <div style={{ marginLeft: "10px" }}>
                {category !== "Doing" && (
                    <button onClick={() => onClick("Doing")}>Doing</button>
                )}
                {category !== "To-Do" && (
                    <button onClick={() => onClick("To-Do")}>To-Do</button>
                )}
                {category !== "Done" && (
                    <button onClick={() => onClick("Done")}>Done</button>
                )}
            </div>
        </li>
    );
};

export default ToDoShow;
