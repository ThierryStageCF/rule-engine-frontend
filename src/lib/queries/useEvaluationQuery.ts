import {useQuery} from "@tanstack/react-query";
import {EvaluationService} from "../services/evaluation.service.ts";
import {toEvaluationResultModel} from "../types/mappers/evaluation.mapper.ts";


export const evaluationResultKey = {
    key: (codeArticle: string) => ["evaluation", codeArticle] as const,
}

/**
 *  Hook personnalisé via Ky de demander une évaluation d'article au serveur.
*/
export function useEvaluationQuery(codeArticle: string){

    return useQuery({
        queryKey: evaluationResultKey.key(codeArticle),
        queryFn: ()=> EvaluationService.evaluateArticle(codeArticle),
        select: (response)=> toEvaluationResultModel(response.data),
        enabled: Boolean(codeArticle),
    });
}