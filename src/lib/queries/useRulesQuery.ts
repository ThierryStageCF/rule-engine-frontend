import { useQuery } from "@tanstack/react-query";
import { toRuleModelList } from "../types/mappers/rule.mapper.ts";
import type { RuleServerFiltersFormType } from "../types/schema/ruleServerFiltersSchema.ts";
import {RuleService} from "../services/rule.service.ts";

/**
 * Normalise les filtres : écarte les champs vides (chaînes vides, undefined,
 * tableaux vides) pour que des filtres équivalents produisent une clé identique.
 */
export function normalizeRuleFilters(filters?: RuleServerFiltersFormType): Partial<RuleServerFiltersFormType> {
    if (!filters) return {};
    const clean: Partial<RuleServerFiltersFormType> = {};
    if (filters.zone?.trim() !== undefined && filters.zone?.trim() !== "" ) clean.zone = filters.zone;
    if (filters.criticality?.trim() && filters.criticality?.trim() !== "") clean.criticality = filters.criticality;
    if (filters.active !== undefined) clean.active = filters.active;
    if (filters.author?.trim() !== undefined && filters.author?.trim() !== "") clean.author = filters.author.trim();
    if (filters.sector?.trim() !== undefined && filters.sector?.trim() !== "") clean.sector = filters.sector.trim();
    if (filters.client?.trim() !== undefined && filters.client?.trim() !== "") clean.client = filters.client.trim();
    if (filters.rule_id?.trim() !== undefined &&  filters.rule_id?.trim() !== "") clean.rule_id = filters.rule_id.trim();
    if (filters.text?.trim() !== undefined &&  filters.text?.trim() !== "") clean.text = filters.text.trim();
    if (filters.created_at?.trim() !== undefined && filters.created_at.trim() !== "") clean.created_at = filters.created_at.trim();
    if (filters.updated_at?.trim() !== undefined && filters.updated_at.trim() !== "") clean.updated_at = filters.updated_at.trim();
    return clean;
}

export const rulesKey = {
    root: ["rules"] as const,
    all: () => ["rules", "all"] as const,
    search: (filters: RuleServerFiltersFormType) => ["rules", "search", normalizeRuleFilters(filters)] as const,
};

/**
 * Liste de toutes les règles (route getAllRules), sans filtre serveur.
 */
export function useAllRulesQuery(enabled: boolean = true) {
    return useQuery({
        queryKey: rulesKey.all(),
        queryFn: RuleService.getAllRules,
        select: (response) => toRuleModelList(response.data),
        enabled,
    });
}

/**
 * Recherche filtrée des règles (route searchRules).
 */
export function useSearchRulesQuery(filters: RuleServerFiltersFormType, enabled: boolean = true) {
    return useQuery({
        queryKey: rulesKey.search(filters),
        queryFn: () => RuleService.getFilteredRules(normalizeRuleFilters(filters)),
        select: (response) => toRuleModelList(response.data),
        enabled,
    });
}