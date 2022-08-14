import React, { useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, ITodos, toDosState } from "../../atoms";
import DragabbleCard from "../DragabbleCard";

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

const Wrraper = styled.div`
    width: 300px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;
interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${(props) =>
        props.isDraggingOver
            ? "#dfe6e9"
            : props.isDraggingFromThis
            ? "#b2bec3"
            : "transparent"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`;

interface IBoard {
    toDos: ITodos[];
    boardId: string;
    index: number;
}

interface IForm {
    toDo: string;
}

const Board = ({ toDos, boardId, index }: IBoard) => {
    const setToDos = useSetRecoilState(toDosState);
    const { register, setValue, handleSubmit } = useForm<IForm>();

    const onValid = ({ toDo }: IForm) => {
        const newTodo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [newTodo, ...allBoards[boardId]],
            };
        });
        setValue("toDo", "");
    };

    return (
        <Draggable index={index} draggableId={boardId} key={boardId}>
            {(magic) => (
                <Wrraper
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    <Title>{boardId}</Title>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <input
                            {...register("toDo", { required: true })}
                            type="text"
                            placeholder={`Add task on ${boardId}`}
                        />
                    </Form>
                    <Droppable droppableId={boardId}>
                        {(magic, snapshot) => (
                            <Area
                                isDraggingOver={snapshot.isDraggingOver}
                                isDraggingFromThis={Boolean(
                                    snapshot.draggingFromThisWith
                                )}
                                ref={magic.innerRef}
                                {...magic.droppableProps}
                            >
                                {toDos.map((toDo, i) => (
                                    <DragabbleCard
                                        key={toDo.id}
                                        todoID={toDo.id}
                                        todoText={toDo.text}
                                        i={i}
                                    />
                                ))}
                                {magic.placeholder}
                            </Area>
                        )}
                    </Droppable>
                </Wrraper>
            )}
        </Draggable>
    );
};

export default React.memo(Board);
