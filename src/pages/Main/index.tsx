import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDosState } from "../../atoms";
import Board from "../../components/Board";
import CreateBoard from "../../components/CreateBoard";

const Wrapper = styled.div`
    display: flex;
    max-width: 900px;
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
        const { destination, source } = info;
        if (!destination) return;
        if (info.type === "board") {
            console.log(info);
            setToDos((allBoards) => {
                const copyAllBoards = Object.entries({ ...allBoards });
                const deleteBoard = [...copyAllBoards.splice(source.index, 1)];
                copyAllBoards.splice(destination.index, 0, ...deleteBoard);
                const checkBoards = Object.fromEntries(copyAllBoards);
                return {
                    ...checkBoards,
                };
            });
        } else if (destination?.droppableId === source?.droppableId) {
            //같은 board안에서만 움직인다면
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                //해당 인덱스 삭제
                boardCopy.splice(source.index, 1);
                //해당부분에 추가
                boardCopy.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                };
            });
        }
        if (destination?.droppableId !== source?.droppableId) {
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const taskObj = sourceBoard[source.index];
                const destinationBoard = [
                    ...allBoards[destination.droppableId],
                ];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                };
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <CreateBoard />
            <Droppable droppableId="boards" direction="horizontal" type="board">
                {(magic) => (
                    <Wrapper>
                        <Boards ref={magic.innerRef} {...magic.droppableProps}>
                            {Object.keys(toDos).map((boardId, i) => (
                                <Board
                                    boardId={boardId}
                                    key={boardId}
                                    toDos={toDos[boardId]}
                                    index={i}
                                />
                            ))}
                        </Boards>
                    </Wrapper>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Main;
