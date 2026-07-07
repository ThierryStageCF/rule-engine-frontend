/**
 * Types de présentation propres aux règles : liste prête pour le tableau,
 * compteurs des filtres locaux, et axes de filtres locaux et serveur.
 * Réutilise les briques atomiques existantes (Criticality, DomainZone, CriticalityFilter).
 */

import type { DomainZone } from "../models/evaluationResult.model.ts";
import type { CriticalityFilter } from "./evaluation.model.presentation.ts";
import type { Rule } from "../models/rule.model.ts";

/** Compteurs affichés dans les cartes de filtres locaux (gauche). */
export type RuleCounts = {
    total: number;
    byZone: Record<DomainZone, number>;
    critique: number;
    normal: number;
};

/**
 * Vue de liste : la réponse groupée par zone du backend, aplatie en une liste
 * unique pour le tableau, accompagnée des compteurs pour les filtres de gauche.
 */
export type RuleListView = {
    rules: Rule[];
    counts: RuleCounts;
};


/**
 * Filtres locaux : affinent instantanément la liste déjà chargée, sans réseau.
 * Zones en multi-sélection, criticité en sélection unique (comme l'évaluation).
 */
export type RuleLocalFilters = {
    zones: DomainZone[];
    criticality: CriticalityFilter;
};

