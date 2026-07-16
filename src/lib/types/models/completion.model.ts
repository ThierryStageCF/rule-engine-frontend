/**
 * Modèle métier d'une réponse d'autocomplétion, prêt pour l'usage frontend.
 * Dérivé du CompletionDTO via le mapper (snake_case -> camelCase).
 */

import type { SuggestionType } from "../entities/completion.dto.ts";

/** Une suggestion telle que manipulée dans le frontend. */
export interface Suggestion {
    type: SuggestionType;
    /** Texte DSL exact à insérer. */
    value: string;
    /** Libellé lisible affiché. */
    label: string;
    detail: string;
}

/** Résultat d'autocomplétion pour une position donnée. */
export interface Completion {
    /** Mot partiel sous le curseur (préfixe de filtrage). */
    lastWord: string;
    /** Début de l'intervalle à remplacer à l'acceptation. */
    replaceFrom: number;
    /** Fin de l'intervalle à remplacer. */
    replaceTo: number;
    suggestions: Suggestion[];
}