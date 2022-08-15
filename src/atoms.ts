import { type } from "os";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface IToDo {
    userid: string;
    // email: string;
    // password: string;
    category: "Done" | "Doing" | "To-Do" | string;
    id: number;
}

type Storage = "Done" | "Doing" | "To-Do" | string;
export const categoryStateNotAll = atom<Storage[]>({
    key: "categorySet",
    default: ["To-Do", "Doing", "Done"],
    effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<Storage>({
    key: "category",
    default: "To-Do",
});

export const toDoState = atom<IToDo[]>({
    key: "todo",
    default: [],
    effects_UNSTABLE: [persistAtom],
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

export interface ITodos {
    id: number;
    text: string;
}

interface ITodoState {
    [key: string]: ITodos[];
}

export const toDosState = atom<ITodoState>({
    key: "dragTodo",
    default: {
        To_Do: [{ id: Date.now() + 1, text: "ToDoList" }],
        Doging: [{ id: Date.now() + 2, text: "DoingList" }],
        Done: [{ id: Date.now() + 3, text: "DoneList" }],
    },
    effects_UNSTABLE: [persistAtom],
});
