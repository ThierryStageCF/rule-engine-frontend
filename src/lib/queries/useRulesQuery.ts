import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toRuleModel, toRuleModelList} from "../types/mappers/rule.mapper.ts";
import type { RuleServerFiltersFormType } from "../types/schema/ruleServerFiltersSchema.ts";
import {RuleService} from "../services/rule.service.ts";
import type {RuleUpdateFormType} from "../types/schema/ruleUpdateSchema.ts";
import type {Rule} from "../types/models/rule.model.ts";
import type {RuleCreateFormType} from "../types/schema/ruleCreationSchema.ts";
import type {RuleCreatedDto} from "../types/entities/ruleCreated.dto.ts";

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

/** Objet qui permet de construire la clé de cache pour une requête de lecture d'une règle avec ou sans filtre serveur
 *  Garantit que deux requêtes aux paramètres identiques ont toujours la même la clé de cache.
 */
export const rulesKey = {
    root: ["rules"] as const,
    all: () => ["rules", "all"] as const,
    search: (filters: RuleServerFiltersFormType) => ["rules", "search", normalizeRuleFilters(filters)] as const,
};

/**
 * Hook dérivé de UseQuery permettant de lister toutes les règles métier.
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
 * Hook dérivé de UseQuery permettant la recherche filtrée des règles.
 */
export function useSearchRulesQuery(filters: RuleServerFiltersFormType, enabled: boolean = true) {
    return useQuery({
        queryKey: rulesKey.search(filters),
        queryFn: () => RuleService.getFilteredRules(normalizeRuleFilters(filters)),
        select: (response) => toRuleModelList(response.data),
        enabled,
    });
}


/**
 * Hook dérivé de UseMutation permettant la mise à jour d'une règle métier
 */
export function useUpdateRuleMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ ruleId, rule }: { ruleId: string; rule: RuleUpdateFormType }): Promise<Rule> => {
            const response = await RuleService.updateRule(ruleId, rule);
            return toRuleModel(response.data);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: rulesKey.root });
        },
    });
}


/**
 * Hook dérivé de UseMutation permettant la création d'une règle métier.
 */
export function useCreateRuleMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (rule: RuleCreateFormType): Promise<RuleCreatedDto> => {
            const response = await RuleService.createRule(rule);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: rulesKey.root });
        },
    });
}