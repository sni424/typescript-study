import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

interface IDragTodo {
    todo: string;
    i: number;
}

const DragabbleCard = ({ todo, i }: IDragTodo) => {
    return (
        <>
            <Draggable key={todo} draggableId={todo} index={i}>
                {(magic) => (
                    <Card
                        ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}
                    >
                        {todo}
                    </Card>
                )}
            </Draggable>
        </>
    );
};

export default React.memo(DragabbleCard);
