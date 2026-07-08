import type {ResponseEntity} from "../types/entities/response.entity.ts";
import type {SearchRuleDTO} from "../types/entities/rule.dto.ts";
import {apiClient} from "../api/apiClient.ts";
import type {RuleServerFiltersFormType} from "../types/schema/ruleServerFiltersSchema.ts";

export const RuleService = {

    getAllRules: async(): Promise<ResponseEntity<SearchRuleDTO>> => {
        return await apiClient
            .get<ResponseEntity<SearchRuleDTO>>("/rule")
            .json();
    },


    getFilteredRules: async(filters: RuleServerFiltersFormType): Promise<ResponseEntity<SearchRuleDTO>> => {
        let query = "";
        for (const [key, value] of Object.entries(filters)) {
            query += `&${key}=${value}`;
        }
        console.warn(filters);
        console.warn(query);
        return await apiClient
            .get<ResponseEntity<SearchRuleDTO>>(`/rule?${query}`)
            .json();
    }
}