import { atom } from "recoil";

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
