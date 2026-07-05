/**
 * Contrat de données entre le backend (moteur de règles) et le frontend.
 *
 * Répartition des responsabilités :
 *  - Le MOTEUR calcule tous les faits mécaniques et déterministes : verdicts,
 *    zones, criticité, champs contrôlés (field / expected / actual), exemptions.
 *  - Le LLM enrichit ensuite le résultat avec une couche de langage naturel :
 *    `rule_label` lisible et les `phrase` de chaque evidence. Il ne produit
 *    JAMAIS de verdict ni de fait — il ne fait que reformuler en français clair.
 *  - Le FRONTEND transforme ces données brutes pour un affichage digeste.
 */

/** Verdict d'une règle ou d'une evidence. */
export type Verdict = "PASS" | "FAIL" | "INCOMPLETE";

/** Niveau de criticité d'une règle. */
export type Criticality = "normal" | "critique";

/** Zone métier à laquelle une règle appartient. */
export type ZoneKey =
    "caracteristiques"
    | "operations"
    | "gammes"
    | "client"
    | "nomenclature"
    | "article"
    | "apport";


/** Objet représentant le résultat d'évaluation d'une règle. */
export interface EvaluationResult {
    codeArticle: string;
    articles: EvaluatedArticle[];
}

/** Un article (produit fini ou composant) avec ses règles évaluées. */
export interface EvaluatedArticle {
    codeArticle: string;
    designationArticle: string;
    level: number;
    rules: RuleResult[];
}

/**
 * Résultat d'évaluation d'une règle sur un article.
 */
export interface RuleResult {
    rule_id: string;
    rule_label: string;
    verdict: Verdict;
    criticality: Criticality;
    semi_formel: string;
    /** Texte source original de la règle. */
    libelle?: string;
    zone: ZoneKey;
    /** Type de construction (comparaison, existence, for_all, négation…). */
    construction: string;
    exempted: boolean;
    exemption_uncertain: boolean;
    /** Raison d'une exemption en langage humain*/
    exemption_reason?: string;
    /** Raison d'une exemption incertaine */
    uncertainty_reason?: string;
    evidence: Evidence[];
}



/**
 * Une preuve unitaire justifiant le verdict d'une règle. Une même règle peut
 * échouer à plusieurs endroits (boucle sur une collection).
 */
export interface Evidence {
    /** Élément précis concerné */
    subject: string;
    /** Champ / critère contrôlé. */
    field?: string;
    /** Valeur ou condition attendue. */
    expected?: string;
    /** Valeur observée. */
    actual?: string;
    verdict: Verdict;
    /** Phrase en langage clair (enrichie par le LLM) — niveau de lecture principal. */
    phrase: string;
}




