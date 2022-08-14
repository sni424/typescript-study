import React, { InputHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDosState } from "../../atoms";

interface IForm {
    toDo: string;
}

const CreateBoard = () => {
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const setBoards = useSetRecoilState(toDosState);

    const onValid = ({ toDo }: IForm) => {
        setBoards((allBoards) => {
            return {
                ...allBoards,
                [toDo]: [],
            };
        });
        setValue("toDo", "");
    };

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <input
                {...register("toDo", { required: true })}
                type="text"
                placeholder="보드의 이름을 입력해주세요."
            />
        </form>
    );
};

export default CreateBoard;
