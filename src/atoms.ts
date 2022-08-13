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

export const minuteState = atom<number>({
    key: "minutes",
    default: 0,
});

export const hourSelector = selector<number>({
    key: "hours",
    get: ({ get }) => {
        const minutes = get(minuteState);
        return minutes / 60;
    },
    set: ({ set }, setValue) => {
        const minutes = Number(setValue) * 60;
        set(minuteState, minutes);
    },
});

interface ITodoState {
    [key: string]: string[];
}

export const toDosState = atom<ITodoState>({
    key: "dragTodo",
    default: {
        To_Do: ["a", "b", "c"],
        Dogin: ["d", "e"],
        Done: ["f"],
    },
});
