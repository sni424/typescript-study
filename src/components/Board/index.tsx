import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "../DragabbleCard";

const Wrraper = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

interface IBoard {
    toDos: string[];
    boardId: string;
}

const Board = ({ toDos, boardId }: IBoard) => {
    return (
        <Droppable droppableId={boardId}>
            {(magic) => (
                <Wrraper ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((todo, i) => (
                        <DragabbleCard key={todo} todo={todo} i={i} />
                    ))}
                    {magic.placeholder}
                </Wrraper>
            )}
        </Droppable>
    );
};

export default Board;
