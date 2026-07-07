import type {
    EvaluatedArticleDTO,
    RuleDTO,
    EvidenceDTO, EvaluationResultDTO,
} from "../entities/evaluation.dto";

import type {
    EvaluatedArticle,
    RuleResult,
    Evidence,
    Verdict,
    Criticality,
    DomainZone, EvaluationResultModel,
} from "../models/evaluationResult.model.ts";

/**
 * Mapper du DTO du result de l'évaluation d'un article vers le model metier du frontend
 */
export function toEvaluationResultModel(dto: EvaluationResultDTO): EvaluationResultModel {
    return {
        codeArticle: dto.article_code,
        articles: dto.results_by_article.map(mapArticle),
    };
}

/**
 * ARTICLE
 */
function mapArticle(dto: EvaluatedArticleDTO): EvaluatedArticle {
    return {
        codeArticle: dto.article_code,
        designationArticle: dto.designation_article,
        level: dto.level,
        rules: dto.rules.map(mapRule),
    };
}

/**
 * RULE
 */
function mapRule(dto: RuleDTO): RuleResult {
    return {
        ruleId: dto.rule_id,
        ruleLabel: dto.rule_label,
        verdict: dto.verdict as Verdict,
        criticality: dto.criticality as Criticality,
        semiFormel: dto.semi_formel,
        libelle: dto.source_text,
        zone: dto.zone as DomainZone,
        exempted: dto.exempted,
        exemptionUncertain: dto.exemption_uncertain,
        exemptionReason: dto.exempted_reason,
        uncertaintyReason: dto.uncertainty_reason,
        evidence: dto.evidence.map(mapEvidence),
    };
}

/**
 * EVIDENCE
 */
function mapEvidence(dto: EvidenceDTO): Evidence {
    return {
        subject: dto.subject,
        field: dto.field,
        expected: dto.expected,
        actual: dto.actual,
        verdict: dto.verdict as Verdict,
        operator: dto.operator,
        phrase: dto.explanation,
    };
}