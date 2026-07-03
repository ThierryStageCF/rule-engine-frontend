import {useState} from "react";
import {useForm} from "react-hook-form";
import {type EvaluateArticleFormType, evaluateArticleSchema} from "../types/schema/evaluateArticleSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export interface FieldError {
    code_article: string
}

export function useArticleEvaluation(){


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [axiosErrors, setAxiosErrors] = useState<FieldError|null>(null);


    const {register, handleSubmit,reset, formState: { errors }} = useForm<EvaluateArticleFormType>(
        {
            resolver: zodResolver(evaluateArticleSchema),
        });


    function handleEvaluateArticle(data: EvaluateArticleFormType){
        console.log("handleEvaluateArticle", data)
        setAxiosErrors({code_article: data.article_code})
    }



    return {
        zodParams: {
            register,
            handleSubmit,
            reset,
            errors,
            handleEvaluateArticle,
        },
        isLoading,
        setIsLoading,
        axiosErrors,
    }
}