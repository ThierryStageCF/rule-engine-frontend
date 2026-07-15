import {z} from "zod";

/**
 * Schéma du formulaire d'édition d'une règle.
 */
export const ruleUpdateSchema = z.object({
    semi_formal: z.string().trim().optional(),
    zone: z.enum(["", "apport", "article", "caracteristiques", "client", "gamme", "nomenclature", "operation"])
        .optional(),
    criticality: z
        .enum(["", "critique", "normal"])
        .optional(),
    author: z.string().trim().optional(),
    rule_title: z.string().trim().optional(),
    source_text: z.string().trim().optional(),
    service: z.string().trim().optional(),
    sector: z.string().trim().optional(),
    client: z.array(z.string().trim()).optional(),
    finished_product_only: z.boolean().optional(),
    version: z.int().optional(),
    active: z.boolean().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

/** Type correspondant aux champs du formulaire affiché dans la page des détails d'une règle métier. */
export type RuleUpdateDisplayFormType = z.infer<typeof ruleUpdateSchema>;

/** Type correspondant à la requete réellement entendue par le backend pour une mise à jour de règle. */
export type RuleUpdateFormType = Omit<Partial<RuleUpdateDisplayFormType>, "version" | "created_at" | "updated_at">;