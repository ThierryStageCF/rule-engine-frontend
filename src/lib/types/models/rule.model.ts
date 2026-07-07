/**
 * Modèle métier d'une règle de contrôle qualité, régulier et prêt pour l'affichage.
 * Dérivé du RuleDTO via le mapper, qui normalise la criticité et la casse.
 */

import type { Criticality, DomainZone } from "./evaluationResult.model.ts";

/** Une règle métier telle que manipulée dans le frontend. */
export interface Rule {
    ruleId: string;
    version: number;
    active: boolean;
    criticality: Criticality;
    semiFormel: string;
    /** Texte source original en langage clair. */
    sourceText?: string;
    author?: string;
    sector?: string;
    client?: string[];
    createdAt: string;
    lastUpdate?: string;
    zone?: DomainZone;
}