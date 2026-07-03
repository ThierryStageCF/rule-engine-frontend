import {z} from 'zod';


export const evaluateArticleSchema = z.object({
    article_code: z.string().min(1, "Le code article est obligatoire !")
});

export type EvaluateArticleFormType = z.infer<typeof evaluateArticleSchema>;