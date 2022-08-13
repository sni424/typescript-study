import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDosState } from "../../atoms";
import Board from "../../components/Board";

const Wrapper = styled.div`
    display: flex;
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
`;

const Main = () => {
    const [toDos, setToDos] = useRecoilState(toDosState);

    const onDragEnd = (info: DropResult) => {
        const { destination, draggableId, source } = info;
        if (destination?.droppableId === source?.droppableId) {
            //같은 board안에서만 움직인다면
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                //해당 인덱스 삭제
                boardCopy.splice(source.index, 1);
                //해당부분에 추가
                boardCopy.splice(destination?.index, 0, draggableId);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                };
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(toDos).map((boardId) => (
                        <Board
                            boardId={boardId}
                            key={boardId}
                            toDos={toDos[boardId]}
                        />
                    ))}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
};

export default Main;
