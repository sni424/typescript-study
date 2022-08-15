import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryStateNotAll, IToDo, toDoState } from "../../atoms";

const ToDoShow = ({ userid, id, category }: IToDo) => {
    const setTodos = useSetRecoilState(toDoState);
    const cateValue = useRecoilValue(categoryStateNotAll);
    console.log(cateValue);

    const onClick = (
        newCate: IToDo["category"],
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        setTodos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((data) => data.id === id);
            const newToDo = { userid, id, category: newCate };
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
            id : {userid} / category : {category}
            <div style={{ marginLeft: "10px" }}>
                {cateValue?.map((data) => {
                    return (
                        category !== data && (
                            <button
                                key={data}
                                onClick={(e) => onClick(`${data}`, e)}
                            >
                                {data}
                            </button>
                        )
                    );
                })}
                {/* {category !== "Doing" && (
                    <button onClick={(e) => onClick("Doing", e)}>Doing</button>
                )}
                {category !== "To-Do" && (
                    <button onClick={(e) => onClick("To-Do", e)}>To-Do</button>
                )}
                {category !== "Done" && (
                    <button onClick={(e) => onClick("Done", e)}>Done</button>
                )} */}
            </div>
        </li>
    );
};

export default ToDoShow;
