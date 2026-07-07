/**
 *  Réponse renvoyée par le backend pour l'évaluation d'un article
 */
export type EvaluationResultDTO =  {
    article_code: string;
    results_by_article: EvaluatedArticleDTO[];
}

export type EvaluatedArticleDTO = {
    article_code: string;
    designation_article: string;
    level: number;
    rules: RuleDTO[];
}

export type RuleDTO = {
    rule_id: string;
    verdict: string;
    rule_label?: string;
    criticality: string;
    semi_formel: string;
    source_text: string;
    zone: string;
    exempted: boolean;
    exemption_uncertain: boolean;
    exempted_reason: string;
    uncertainty_reason: string;
    evidence: EvidenceDTO[];
}

export interface EvidenceDTO {
    subject: string;
    field?: string;
    actual?: string;
    expected: string;
    operator?: string;
    verdict: string;
    explanation?: string;
}