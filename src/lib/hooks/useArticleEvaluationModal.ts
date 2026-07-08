import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type EvaluateArticleFormType, evaluateArticleSchema} from "../types/schema/evaluateArticleSchema.ts";
import {useNavigation} from "../../router/useNavigation.ts";


export function useArticleEvaluationModal(onClose:  () => void){
    const navigate = useNavigation();


    const {register, handleSubmit,reset, formState: { errors }} = useForm<EvaluateArticleFormType>
    ({
        resolver: zodResolver(evaluateArticleSchema),
    });


    function handleEvaluateArticle(data: EvaluateArticleFormType){
        navigate.toEvaluationResultPage(data.codeArticle,
            {
                codeArticle: data.codeArticle
            }
        );
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