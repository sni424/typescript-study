import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, categoryStateNotAll, toDoState } from "../../atoms";

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

const CreateToDo = () => {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryStateNotAll);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
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
        setToDos((prev) => [
            {
                userid: data.value,
                email: data.email,
                password: data.passwordCheck,
                id: Date.now(),
                category,
            },
            ...prev,
        ]);
        // setValue("password","");
        // reset({password:""})
        reset();
    };

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

export default CreateToDo;
