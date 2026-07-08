/**
 * Types de présentation propres aux règles : liste prête pour le tableau,
 * compteurs des filtres locaux, et axes de filtres locaux et serveur.
 * Réutilise les briques atomiques existantes (Criticality, DomainZone, CriticalityFilter).
 */

import type { DomainZone } from "../models/evaluationResult.model.ts";
import type { CriticalityFilter } from "./evaluation.model.presentation.ts";


/** Compteurs affichés dans les cartes de filtres locaux (gauche). */
export type RuleCounts = {
    total: number;
    byZone: Record<DomainZone, number>;
    critique: number;
    normal: number;
};



/**
 * Filtres locaux : affinent instantanément la liste déjà chargée, sans réseau.
 * Zones en multi-sélection, criticité en sélection unique (comme l'évaluation).
 */
export type RuleLocalFilters = {
    zones: DomainZone[];
    criticality: CriticalityFilter;
};

