import {apiClient} from "../api/apiClient.ts";
import type {EvaluationResultDTO} from "../types/entities/evaluation.dto.ts";
import type {ResponseEntity} from "../types/entities/response.entity.ts";



/**
 * @summary Service permettant d'effectuer des requêtes HTTP vers le backend
 * afin d'évaluer un article.
 */
export const EvaluationService = {

    evaluateArticle: async (codeArticle: string): Promise<ResponseEntity<EvaluationResultDTO>> => {
        return await apiClient
            .get<ResponseEntity<EvaluationResultDTO>>(`/evaluation/${codeArticle}`)
            .json();
    }
}


