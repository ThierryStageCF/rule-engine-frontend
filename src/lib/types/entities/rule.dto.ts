/**
 *  Réponses renvoyées par le backend pour la gestion des règles métier.
 */

import type {Criticality, DomainZone} from "../models/evaluationResult.model.ts";

/** Une règle telle que sérialisée par le backend (SearchResultResponse). */
export type RuleDTO = {
    rule_id: string;
    rule_title?: string;
    author?: string;
    version: number;
    active: boolean;
    finished_product_only: boolean
    criticality: Criticality;
    zone?: DomainZone;
    semi_formal: string;
    source_text?: string | null;
    sector?: string;
    client?: string[];
    created_at: Date;
    last_update?: Date;
};

/**
 * Réponse d'une recherche / listing de règles (SearchRuleResponse).
 * Les règles arrivent groupées par zone : la clé est la valeur de zone
 * (apport, article, caracteristiques, client, gamme, nomenclature, operation).
 */
export type SearchRuleDTO = {
    rules: Record<string, RuleDTO[]>;
};