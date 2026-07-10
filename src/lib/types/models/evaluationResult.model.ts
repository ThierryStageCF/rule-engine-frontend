/**
 * Modèle représentant les résultats d'évaluation d'un article.
 *
 */

/** Objet représentant le résultat d'évaluation d'une règle. */
export interface EvaluationResultModel {
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
    ruleId: string;
    ruleTitle?: string;
    verdict: Verdict;
    criticality: Criticality;
    semiFormel: string;
    /** Texte source original de la règle. */
    libelle?: string;
    zone: DomainZone;
    exempted: boolean;
    exemptionUncertain: boolean;
    /** Raison d'une exemption en langage humain*/
    exemptionReason?: string;
    /** Raison d'une exemption incertaine */
    uncertaintyReason?: string;
    evidence: Evidence[];
}

/** Verdict d'une règle ou d'une evidence. */
export type Verdict = "PASS" | "FAIL" | "INCOMPLETE";

/** Niveau de criticité d'une règle. */
export type Criticality = "normal" | "critique";

/** Zone métier à laquelle une règle appartient. */
export type DomainZone =
    "caracteristiques"
    | "operation"
    | "gamme"
    | "client"
    | "nomenclature"
    | "article"
    | "apport";

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
    expected: string;
    /** Valeur observée. */
    actual?: string;
    verdict: Verdict;
    operator?: string;
    /** Phrase en langage clair (enrichie par le LLM) — niveau de lecture principal. */
    phrase?: string;
}












