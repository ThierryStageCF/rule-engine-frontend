/**
 *  Réponses renvoyées par le backend pour la gestion des règles métier.
 */


/** Une règle telle que sérialisée par le backend (SearchResultResponse). */
export type RuleDTO = {
    rule_id: string;
    version: number;
    active: boolean;
    criticality: string;
    semi_formal: string;
    source_text?: string | null;
    author?: string | null;
    sector?: string | null;
    client?: string[] | null;
    created_at: string;
    last_update?: string | null;
    zone?: string | null;
};

/**
 * Réponse d'une recherche / listing de règles (SearchRuleResponse).
 * Les règles arrivent groupées par zone : la clé est la valeur de zone
 * (apport, article, caracteristiques, client, gamme, nomenclature, operation).
 */
export type SearchRuleDTO = {
    rules: Record<string, RuleDTO[]>;
};