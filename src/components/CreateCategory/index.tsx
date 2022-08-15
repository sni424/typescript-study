import React, { InputHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoryStateNotAll } from "../../atoms";

const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface IUseForm {
    errors: {
        category: {
            message: string;
        };
    };
    category: string;
}

const CreateCategory = () => {
    const [category, setCategory] = useRecoilState(categoryStateNotAll);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IUseForm>();

    const onValid = (category: IUseForm) => {
        setCategory((prev) => [...prev, category.category]);
        setValue("category", "");
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <div>
                    <input
                        {...register("category", {
                            required: true,
                            minLength: {
                                value: 1,
                                message: "5자이상 적어주세요.",
                            },
                        })}
                        placeholder="카테코리 추가"
                    />
                    <div>
                        <span>{errors?.category?.message}</span>
                    </div>
                </div>
                <FlexDiv>
                    <button>추가</button>
                </FlexDiv>
            </form>
        </div>
    );
};

export default CreateCategory;
