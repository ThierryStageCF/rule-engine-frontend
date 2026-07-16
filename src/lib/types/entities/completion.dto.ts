/**
 *  Réponses renvoyées par le backend pour l'autocomplétion du semi-formel.
 */

/** Type de suggestion, tel que renvoyé par le backend. */
export type SuggestionType = "field" | "collection" | "operator" | "keyword" | "literal";

/** Une suggestion telle que sérialisée par le backend. */
export type SuggestionDTO = {
    type: SuggestionType;
    value: string;
    label: string;
    detail: string;
};

/** Réponse d'autocomplétion (CompletionResponse). */
export type CompletionDTO = {
    last_word: string;
    replace_from: number;
    replace_to: number;
    suggestions: SuggestionDTO[];
};

/** Corps de la requête d'autocomplétion. */
export type CompletionRequestDTO = {
    text: string;
    cursor: number;
};