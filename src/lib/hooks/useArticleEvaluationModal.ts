import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {type EvaluateArticleFormType, evaluateArticleSchema} from "../types/schema/evaluateArticleSchema.ts";


export function useArticleEvaluationModal(onClose:  () => void){
    const navigate = useNavigate();


    const {register, handleSubmit,reset, formState: { errors }} = useForm<EvaluateArticleFormType>
    ({
        resolver: zodResolver(evaluateArticleSchema),
    });


    function handleEvaluateArticle(data: EvaluateArticleFormType){
        navigate("/rule-evaluation-result/" + data.codeArticle, {
            state: {
                codeArticle: data.codeArticle,
            }
        });
        onClose();
    }



    return {
        form: {
            register,
            handleSubmit,
            reset,
            errors,
        },
        actions: {
            handleEvaluateArticle,
        }
    }
}