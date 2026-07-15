import {z} from "zod";

/**
 * Schéma du formulaire d'édition d'une règle.
 */
export const ruleCreateSchema = z.object({
    semi_formal: z.string().trim().min(1,"La formalisation de la règle est obligatoire"),
    zone: z.enum(["apport", "article", "caracteristiques", "client", "gamme", "nomenclature", "operation"], "Veuillez choisir une zone"),
    criticality: z.enum(["normal", "critique"], "Veuillez choisir une criticité"),
    service: z.string().trim().min(1, "Veuillez renseigner un nom de service valide"),
    author: z.string().trim().min(2, "Le nom de l'auteur de la règle est requis"),
    rule_title: z.string().trim().optional(),
    source_text: z.string().trim().optional(),
    sector: z.string().trim().optional(),
    client: z.array(z.string().trim().min(1, "Veuillez rentrer un nom de client valide !")).optional(),
    finished_product_only: z.boolean().optional(),
});

export type RuleCreateFormType = z.infer<typeof ruleCreateSchema>;