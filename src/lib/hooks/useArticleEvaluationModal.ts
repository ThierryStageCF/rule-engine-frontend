import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {sampleEvaluation} from "../mocks/evaluationResult.ts";
import {type EvaluateArticleFormType, evaluateArticleSchema} from "../types/schema/evaluateArticleSchema.ts";


export interface FieldError {
    code_article: string
}

export function useArticleEvaluationModal(){


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [axiosErrors, setAxiosErrors] = useState<FieldError|null>(null);
    const navigate = useNavigate();


    const {register, handleSubmit,reset, formState: { errors }} = useForm<EvaluateArticleFormType>(
        {
            resolver: zodResolver(evaluateArticleSchema),
        });


    function handleEvaluateArticle(data: EvaluateArticleFormType){
        console.log("handleEvaluateArticle", data)
        setAxiosErrors({code_article: data.article_code})
        navigate("/rule-evaluation-result/" + data.article_code, {
            state: {
                evaluation: sampleEvaluation,
            }
        });
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