import { atom, selector } from "recoil";

export interface IToDo {
    userid: string;
    email: string;
    password: string;
    category: "Done" | "Doing" | "To-Do";
    id: number;
}

export const toDoState = atom<IToDo[]>({
    key: "todo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        return [
            toDos.filter((data) => data.category === "To-Do"),
            toDos.filter((data) => data.category === "Doing"),
            toDos.filter((data) => data.category === "Done"),
        ];
    },
});
