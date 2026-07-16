import { useQuery } from "@tanstack/react-query";
import { CompletionService } from "../services/completion.service.ts";

/** Clé de cache des mots-clés du DSL. */
const DSL_KEYWORDS_KEY = ["dsl-keywords"] as const;

/**
 * @summary Récupère une seule fois la liste des mots-clés du DSL et la met en
 * cache. Sert d'alimentation à la coloration syntaxique de l'éditeur.
 */
export function useKeywordsQuery() {
    return useQuery({
        queryKey: DSL_KEYWORDS_KEY,
        queryFn: async (): Promise<string[]> => {
            const response = await CompletionService.getKeywords();
            return response.data;
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}