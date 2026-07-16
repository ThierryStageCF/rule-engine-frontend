import type { CompletionDTO, SuggestionDTO } from "../entities/completion.dto.ts";
import type { Completion, Suggestion } from "../models/completion.model.ts";

/**
 * Mapper du DTO d'autocomplétion (réponse snake_case du backend) vers le
 * modèle métier du frontend en camelCase.
 */
export function toCompletionModel(dto: CompletionDTO): Completion {
    return {
        lastWord: dto.last_word,
        replaceFrom: dto.replace_from,
        replaceTo: dto.replace_to,
        suggestions: dto.suggestions.map(toSuggestionModel),
    };
}

/** SUGGESTION */
export function toSuggestionModel(dto: SuggestionDTO): Suggestion {
    return {
        type: dto.type,
        value: dto.value,
        label: dto.label,
        detail: dto.detail,
    };
}