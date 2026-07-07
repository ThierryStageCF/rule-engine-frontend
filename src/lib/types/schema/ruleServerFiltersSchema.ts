import { z } from 'zod';

/**
 * Schéma du formulaire de filtres serveur des règles (menu entonnoir).
 * Les enums portent les valeurs exactes attendues par le backend :
 * les zones, et la criticité dans sa casse d'origine (critique, Normal).
 * À l'ajout d'une criticité côté backend, l'étendre ici.
 */
export const ruleServerFiltersSchema = z.object({
    zones: z
        .array(z.enum(["apport", "article", "caracteristiques", "client", "gamme", "nomenclature", "operation"])),
    criticalities: z
        .array(z.enum(["critique", "normal"])),
    active: z.boolean().optional(),
    author: z.string().trim().optional(),
    sector: z.string().trim().optional(),
    client: z.string().trim().optional(),
    text: z.string().trim().optional(),
});

export type RuleServerFiltersFormType = z.infer<typeof ruleServerFiltersSchema>;