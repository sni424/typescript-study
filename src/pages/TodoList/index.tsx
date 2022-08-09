import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IUseForm {
    errors: {
        password: {
            message: string;
        };
        value: {
            message: string;
        };
        passwordCheck: {
            message: string;
        };
        email: {
            message: string;
        };
    };
    value: string;
    password: string;
    passwordCheck: string;
    email: string;
}

const TodoList = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IUseForm>();
    const onValid = (data: IUseForm) => {
        if (data.password !== data.passwordCheck) {
            setError(
                "passwordCheck",
                { message: "비밀번호가 상이합니다." },
                {
                    shouldFocus: true,
                }
            );
        }
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

    console.log(errors);

    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <div>
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
                    <div>
                        <span>{errors?.value?.message}</span>
                    </div>
                </div>
                <div>
                    <input
                        {...register("password", {
                            required: true,
                            pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                message:
                                    "8자이상 대소문자와 특수문자 1개이상 필요",
                            },
                        })}
                        placeholder="비밀번호"
                    />
                    <div>
                        <span>{errors?.password?.message}</span>
                    </div>
                </div>
                <div>
                    <input
                        {...register("passwordCheck", {
                            required: true,
                        })}
                        placeholder="비밀번호 확인"
                    />
                    <div>
                        <span>{errors?.passwordCheck?.message}</span>
                    </div>
                </div>
                <div>
                    <input
                        {...register("email", {
                            required: "이메일을 한번더 확인해주세요",
                            validate: {
                                noEmailS: (value) =>
                                    !value.includes("@")
                                        ? "이메일을 확인해주세요"
                                        : true,
                                noEmailS1: (value) =>
                                    !value.includes(".")
                                        ? "이메일을 확인해주세요"
                                        : true,
                            },
                        })}
                        placeholder="이메일"
                    />
                    <div>
                        <span>{errors?.email?.message}</span>
                    </div>
                </div>
                <button>추가</button>
            </form>
        </div>
    );
};

export default TodoList;
