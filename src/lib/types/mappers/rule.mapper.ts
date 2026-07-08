import type { RuleDTO, SearchRuleDTO } from "../entities/rule.dto.ts";
import type { Rule } from "../models/rule.model.ts";
import type { Criticality, DomainZone } from "../models/evaluationResult.model.ts";

/**
 * Mapper du DTO des règles (réponse groupée par zone du backend) vers le modèle
 * métier du frontend. Aplatit le groupement en une liste et régularise les valeurs
 * (criticité normalisée en minuscule, null du backend convertis en undefined).
 */
export function toRuleModelList(dto: SearchRuleDTO): Rule[] {
    return Object.values(dto.rules).flat().map(toRuleModel);
}

/**
 * RULE
 */
function toRuleModel(dto: RuleDTO): Rule {
    return {
        ruleId: dto.rule_id,
        version: dto.version,
        active: dto.active,
        criticality: dto.criticality.toLowerCase() as Criticality,
        semiFormel: dto.semi_formal,
        sourceText: dto.source_text ?? undefined,
        author: dto.author ?? undefined,
        sector: dto.sector ?? undefined,
        client: dto.client ?? undefined,
        createdAt: dto.created_at,
        lastUpdate: dto.last_update ?? undefined,
        zone: dto.zone  as DomainZone,
    };
}