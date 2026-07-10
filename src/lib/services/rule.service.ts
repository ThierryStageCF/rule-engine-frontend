import type {ResponseEntity} from "../types/entities/response.entity.ts";
import type {RuleDTO, SearchRuleDTO} from "../types/entities/rule.dto.ts";
import {apiClient} from "../api/apiClient.ts";
import type {RuleServerFiltersFormType} from "../types/schema/ruleServerFiltersSchema.ts";
import type {RuleUpdateDisplayFormType} from "../types/schema/ruleUpdateSchema.ts";


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
        return await apiClient
            .get<ResponseEntity<SearchRuleDTO>>(`/rule?${query}`)
            .json();
    },

    updateRule: async(id: string, rule: RuleUpdateDisplayFormType): Promise<ResponseEntity<RuleDTO>> => {
        return await apiClient
            .patch<ResponseEntity<RuleDTO>>(`/rule/${id}`,
                {
                    json: rule
                }
            )
            .json();
    }
}