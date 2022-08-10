import { useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "../../atoms";
import CreateToDo from "../../components/CreateToDo";
import ToDoShow from "../../components/ToDoShow";

const TodoList = () => {
    const toDos = useRecoilValue(toDoState);
    const [toDo, doing, done] = useRecoilValue(toDoSelector);

    return (
        <div>
            <h1>Todo List</h1>
            <hr />
            <CreateToDo />
            <h1>To Do</h1>
            <ul>
                {toDo?.map((data) => {
                    return <ToDoShow {...data} />;
                })}
            </ul>
            <hr />
            <h1>Doing</h1>
            <ul>
                {doing?.map((data) => {
                    return <ToDoShow {...data} />;
                })}
            </ul>
            <hr />
            <h1>Done</h1>
            <ul>
                {done?.map((data) => {
                    return <ToDoShow {...data} />;
                })}
            </ul>
            <hr />
        </div>
    );
};

export default TodoList;
