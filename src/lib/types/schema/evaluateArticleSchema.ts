import {z} from 'zod';


export const evaluateArticleSchema = z.object({
    codeArticle: z.string("Le code article est obligatoire !").min(5, "Rentrez un code article valide")
});

export type EvaluateArticleFormType = z.infer<typeof evaluateArticleSchema>;