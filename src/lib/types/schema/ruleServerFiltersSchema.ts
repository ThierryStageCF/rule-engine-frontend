import { z } from 'zod';

/**
 * Schéma du formulaire de filtres serveur des règles (menu entonnoir).
 * Les enums portent les valeurs exactes attendues par le backend :
 * les zones, et la criticité dans sa casse d'origine (critique, Normal).
 * À l'ajout d'une criticité côté backend, l'étendre ici.
 */
export const ruleServerFiltersSchema = z.object({
    zone: z
        .enum(["", "apport", "article", "caracteristiques", "client", "gamme", "nomenclature", "operation"])
        .optional(),
    criticality: z
        .enum(["", "critique", "normal"])
        .optional(),
    rule_id: z.string().optional(),
    active: z.boolean().optional(),
    author: z.string().trim().optional(),
    sector: z.string().trim().optional(),
    client: z.string().trim().optional(),
    text: z.string().trim().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),

});

export type RuleServerFiltersFormType = z.infer<typeof ruleServerFiltersSchema>;