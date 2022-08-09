import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TodoList = () => {
    const { register, watch, handleSubmit, formState } = useForm();
    const onValid = (data: any) => {
        console.log(data);
    };
    // const [value, setValue] = useState("");
    // const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    //     const {
    //         currentTarget: { value },
    //     } = e;
    //     setValue(value);
    // };
    // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    // };

    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("value", {
                        required: true,
                        minLength: {
                            value: 5,
                            message: "5자이상 적어주세요.",
                        },
                    })}
                    placeholder="필수입력"
                />
                <input {...register("subValue")} placeholder="선택입력" />
                <button>추가</button>
            </form>
        </div>
    );
};

export default TodoList;
