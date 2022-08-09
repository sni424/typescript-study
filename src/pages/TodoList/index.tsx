import { useRecoilValue } from "recoil";
import { toDoState } from "../../atoms";
import CreateToDo from "../../components/CreateToDo";
import ToDoShow from "../../components/ToDoShow";

const TodoList = () => {
    const toDos = useRecoilValue(toDoState);

    return (
        <div>
            <h1>Todo List</h1>
            <hr />
            <CreateToDo />
            <ul>
                {toDos?.map((data) => {
                    return <ToDoShow {...data} />;
                })}
            </ul>
        </div>
    );
};

export default TodoList;
