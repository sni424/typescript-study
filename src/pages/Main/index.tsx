import React from "react";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
    OnDragEndResponder,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDosState } from "../../atoms";
import DragabbleCard from "../../components/DragabbleCard";

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

const Main = () => {
    const [toDos, setToDos] = useRecoilState(toDosState);

    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;
        setToDos((oldToDos) => {
            const newToDos = [...oldToDos];
            //해당 인덱스 삭제
            newToDos.splice(source.index, 1);
            //해당부분에 추가
            newToDos.splice(destination?.index, 0, draggableId);
            return newToDos;
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId="one">
                        {(magic) => (
                            <Board
                                ref={magic.innerRef}
                                {...magic.droppableProps}
                            >
                                {toDos.map((todo, i) => (
                                    <DragabbleCard
                                        key={todo}
                                        todo={todo}
                                        i={i}
                                    />
                                ))}
                                {magic.placeholder}
                            </Board>
                        )}
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
};

export default Main;
