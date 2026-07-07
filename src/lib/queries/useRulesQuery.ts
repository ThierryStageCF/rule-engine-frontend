import { useQuery } from "@tanstack/react-query";
import { toRuleModelList } from "../types/mappers/rule.mapper.ts";
import { SAMPLE_SEARCH_RULE_DTO } from "./rules.sample.ts";
import type { RuleServerFiltersFormType } from "../types/schema/ruleServerFiltersSchema.ts";
import type { ResponseEntity } from "../types/entities/response.entity.ts";
import type { SearchRuleDTO } from "../types/entities/rule.dto.ts";

/**
 * Normalise les filtres : écarte les champs vides (chaînes vides, undefined,
 * tableaux vides) pour que des filtres équivalents produisent une clé identique.
 */
export function normalizeRuleFilters(filters?: RuleServerFiltersFormType): Partial<RuleServerFiltersFormType> {
    if (!filters) return {};
    const clean: Partial<RuleServerFiltersFormType> = {};
    if (filters.zones?.length) clean.zones = filters.zones;
    if (filters.criticalities?.length) clean.criticalities = filters.criticalities;
    if (filters.active !== undefined) clean.active = filters.active;
    if (filters.author?.trim()) clean.author = filters.author.trim();
    if (filters.sector?.trim()) clean.sector = filters.sector.trim();
    if (filters.client?.trim()) clean.client = filters.client.trim();
    if (filters.text?.trim()) clean.text = filters.text.trim();
    return clean;
}

export const rulesKey = {
    root: ["rules"] as const,
    all: () => ["rules", "all"] as const,
    search: (filters: RuleServerFiltersFormType) => ["rules", "search", normalizeRuleFilters(filters)] as const,
};

/**
 * Liste de toutes les règles (route getAllRules), sans filtre serveur.
 * Branchement : remplacer le corps du queryFn par RuleService.getAllRules().
 */
export function useAllRulesQuery(enabled: boolean = true) {
    return useQuery({
        queryKey: rulesKey.all(),
        queryFn: async (): Promise<ResponseEntity<SearchRuleDTO>> => {
            return { data: SAMPLE_SEARCH_RULE_DTO, errors: [] };
        },
        select: (response) => toRuleModelList(response.data),
        enabled,
    });
}

/**
 * Recherche filtrée des règles (route searchRules).
 * Branchement : remplacer le corps du queryFn par RuleService.searchRules(filters).
 */
export function useSearchRulesQuery(filters: RuleServerFiltersFormType, enabled: boolean = true) {
    return useQuery({
        queryKey: rulesKey.search(filters),
        queryFn: async (): Promise<ResponseEntity<SearchRuleDTO>> => {
            return { data: SAMPLE_SEARCH_RULE_DTO, errors: [] };
        },
        select: (response) => toRuleModelList(response.data),
        enabled,
    });
}