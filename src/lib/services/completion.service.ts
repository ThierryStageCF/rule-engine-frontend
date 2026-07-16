import type { ResponseEntity } from "../types/entities/response.entity.ts";
import type { CompletionDTO, CompletionRequestDTO } from "../types/entities/completion.dto.ts";
import { apiClient } from "../api/apiClient.ts";


export const CompletionService = {

    /**
     * @summary Fonction qui permet d'envoyer la requête au backend pour obtenir
     * les suggestions d'autocomplétion à une position donnée du semi-formel.
     * @param request Texte courant et position du curseur.
     * @param signal Signal d'annulation (requête obsolète abandonnée dès la frappe suivante).
     */
    autocomplete: async (request: CompletionRequestDTO, signal?: AbortSignal): Promise<ResponseEntity<CompletionDTO>> => {
        return await apiClient
            .post<ResponseEntity<CompletionDTO>>("/autocomplete", {
                json: request,
                signal,
            })
            .json();
    },

    /**
     * @summary Fonction qui permet de récupérer la liste des mots-clés du DSL,
     * utilisée pour la coloration syntaxique. Appelée une seule fois.
     */
    getKeywords: async (): Promise<ResponseEntity<string[]>> => {
        return await apiClient
            .get<ResponseEntity<string[]>>("/autocomplete/keywords")
            .json();
    },
}