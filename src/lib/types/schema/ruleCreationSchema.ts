import {z} from "zod";

/**
 * Schéma du formulaire d'édition d'une règle.
 */
export const ruleCreateSchema = z.object({
    semi_formal: z.string("La formalisation de la règle est obligatoire"),
    service: z.string(),
    author: z.string().min(2, "Le nom de l'auteur de la règle est requis"),
    zone: z.enum(["apport", "article", "caracteristiques", "client", "gamme", "nomenclature", "operation"], "Veuillez choisir une zone"),
    criticality: z.enum(["critique", "normal"], "Veuillez choisir une criticité"),
    rule_title: z.string().optional(),
    source_text: z.string().optional(),
    sector: z.string().optional(),
    client: z.array(z.string()).optional(),
    finished_product_only: z.boolean().optional(),
});

export type RuleCreateFormType = z.infer<typeof ruleCreateSchema>;