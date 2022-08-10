import { atom, selector } from "recoil";

export interface IToDo {
    userid: string;
    email: string;
    password: string;
    category: "Done" | "Doing" | "To-Do";
    id: number;
}
export const categoryStateNotAll = atom<"Done" | "Doing" | "To-Do">({
    key: "category",
    default: "To-Do",
});

export const categoryState = atom<"Done" | "Doing" | "To-Do" | "All">({
    key: "category",
    default: "To-Do",
});

export const toDoState = atom<IToDo[]>({
    key: "todo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((data) => data.category === category);
    },
});
