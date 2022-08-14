import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px;
    background-color: ${(props) =>
        props.isDragging ? "#273c75" : props.theme.cardColor};
    box-shadow: ${(props) =>
        props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

interface IDragTodo {
    todoID: number;
    todoText: string;
    i: number;
}

const DragabbleCard = ({ todoID, todoText, i }: IDragTodo) => {
    return (
        <>
            <Draggable draggableId={todoID + ""} index={i}>
                {(magic, snapshot) => (
                    <Card
                        isDragging={snapshot.isDragging}
                        ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}
                    >
                        {todoText}
                    </Card>
                )}
            </Draggable>
        </>
    );
};

export default React.memo(DragabbleCard);
