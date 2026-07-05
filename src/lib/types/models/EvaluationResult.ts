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

/**
 * Une preuve unitaire justifiant le verdict d'une règle. Une même règle peut
 * échouer à plusieurs endroits (boucle sur une collection), d'où une liste.
 * `subject` est le seul champ toujours présent : il distingue les evidences
 * entre elles. Les autres champs ne sont rendus que lorsqu'ils sont fournis.
 */
export interface Evidence {
    /** Élément précis concerné — toujours affiché en premier. */
    subject: string;
    /** Champ / critère contrôlé, quand applicable. */
    field?: string;
    /** Valeur ou condition attendue, quand applicable. */
    expected?: string;
    /** Valeur observée, quand applicable. */
    actual?: string;
    verdict: Verdict;
    /** Phrase en langage clair (enrichie par le LLM) — niveau de lecture principal. */
    phrase: string;
}

/**
 * Résultat d'évaluation d'une règle sur un article. Correspond au `RuleResult`
 * du moteur, enrichi par le LLM (`rule_label`, `phrase` des evidences).
 */
export interface RuleResult {
    rule_id: string;
    /** Explication en langage clair de ce que vérifie la règle (enrichie LLM). */
    rule_label: string;
    verdict: Verdict;
    criticality: Criticality;
    /** Expression semi-formelle de la règle. */
    semi_formel: string;
    /** Texte source original (énoncé humain) de la règle. */
    libelle?: string;
    zone: ZoneKey;
    /** Type de construction (comparaison, existence, for_all, négation…). */
    construction: string;
    /** Vrai quand l'article est dispensé de cette règle par une clause d'exception. */
    exempted: boolean;
    /** Vrai quand le moteur n'a pas pu confirmer l'exception et a évalué par précaution. */
    exemption_uncertain: boolean;
    exemption_reason?: string;
    uncertainty_reason?: string;
    evidence: Evidence[];
}

/** Un article (produit fini ou composant) avec ses règles évaluées. */
export interface EvaluatedArticle {
    code: string;
    designation: string;
    /** 0 = produit fini, puis descente dans la nomenclature. */
    level: number;
    rules: RuleResult[];
}

/** Réponse complète renvoyée par la route d'évaluation du backend. */
export interface EvaluationResult {
    code: string;
    designation: string;
    evaluatedAt: string;
    articles: EvaluatedArticle[];
}