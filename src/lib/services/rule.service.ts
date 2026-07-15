import type {ResponseEntity} from "../types/entities/response.entity.ts";
import type {RuleDTO, SearchRuleDTO} from "../types/entities/rule.dto.ts";
import {apiClient} from "../api/apiClient.ts";
import type {RuleServerFiltersFormType} from "../types/schema/ruleServerFiltersSchema.ts";
import type {RuleUpdateDisplayFormType} from "../types/schema/ruleUpdateSchema.ts";
import type {RuleCreateFormType} from "../types/schema/ruleCreationSchema.ts";
import type {RuleCreatedDto} from "../types/entities/ruleCreated.dto.ts";


export const RuleService = {

    /**
     * @summary Fonction qui permet d'envoyer la requête au backend permettant récupérer toutes les règles actives
     */
    getAllRules: async(): Promise<ResponseEntity<SearchRuleDTO>> => {
        return await apiClient
            .get<ResponseEntity<SearchRuleDTO>>("/rule")
            .json();
    },

    /**
     * @summary Fonction qui permet d'envoyer la requête au backend permettant récupérer toutes les règles respectant
     * les filtres
     * @param filters Filtres attendus
     */
    getFilteredRules: async(filters: RuleServerFiltersFormType): Promise<ResponseEntity<SearchRuleDTO>> => {
        let query = "";
        for (const [key, value] of Object.entries(filters)) {
            query += `&${key}=${value}`;
        }
        return await apiClient
            .get<ResponseEntity<SearchRuleDTO>>(`/rule?${query}`)
            .json();
    },

    /**
     * @summary Fonction qui permet d'envoyer la requête au backend permettant de mettre à jour une règle métier.
     * les filtres
     * @param id identifiant de la règle à mettre à jour.
     * @param rule Règle métier à mettre à jour
     */
    updateRule: async(id: string, rule: RuleUpdateDisplayFormType): Promise<ResponseEntity<RuleDTO>> => {
        return await apiClient
            .patch<ResponseEntity<RuleDTO>>(`/rule/${id}`,
                {
                    json: rule
                }
            )
            .json();
    },

    /**
     * @summary Fonction qui permet d'envoyer la requête au backend permettant une nouvelle règle métier.
     * les filtres
     * @param rule Règle métier à créer
     */
    createRule: async(rule: RuleCreateFormType): Promise<ResponseEntity<RuleCreatedDto>> => {
        return await apiClient
            .post<ResponseEntity<RuleCreatedDto>>("/rule", { json: rule })
            .json();
    },
}