import { useMemo } from "react";
import { autocompletion, type CompletionContext, type CompletionResult } from "@codemirror/autocomplete";
import type { Extension } from "@codemirror/state";
import { CompletionService } from "../services/completion.service.ts";
import { toCompletionModel } from "../types/mappers/completion.mapper.ts";

/** Délai (ms) après la frappe avant de déclencher une requête d'autocomplétion. */
const COMPLETION_DELAY_MS = 200;

/**
 * @summary Produit l'extension d'autocomplétion CodeMirror branchée sur la route
 * DSL du backend. Le debounce et l'annulation des requêtes obsolètes sont gérés
 * nativement par CodeMirror (activateOnTypingDelay + signal du contexte).
 */
export function useDslCompletion(): Extension {

    return useMemo(() => {

        /* Source de complétion : CodeMirror l'appelle, elle interroge le backend. */
        const source = async (context: CompletionContext): Promise<CompletionResult | null> => {
            const text = context.state.doc.toString();
            const cursor = context.pos;

            try {
                const response = await CompletionService.autocomplete(
                    { text, cursor },
                    context.aborted ? undefined : (context as unknown as { signal?: AbortSignal }).signal,
                );
                const completion = toCompletionModel(response.data);

                /* Aucune suggestion : on ferme la popup proprement. */
                if (completion.suggestions.length === 0) {
                    return null;
                }

                return {
                    from: completion.replaceFrom,
                    to: completion.replaceTo,
                    options: completion.suggestions.map((s) => ({
                        label: s.value,        /* ce qui est inséré + filtré */
                        displayLabel: s.label, /* ce qui est affiché */
                        detail: s.detail,
                        type: s.type,          /* pilote l'icône/couleur CodeMirror */
                    })),
                    /* Tant que l'utilisateur tape des lettres du mot, on filtre en
                       local sans rappeler le backend. */
                    validFor: /^[A-Za-z0-9_]*$/,
                };
            } catch {
                /* Requête annulée (obsolète) ou erreur réseau : pas de suggestion. */
                return null;
            }
        };

        return autocompletion({
            override: [source],
            activateOnTyping: true,
            activateOnTypingDelay: COMPLETION_DELAY_MS,
        });
    }, []);
}