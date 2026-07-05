/**
 * Jeu de données d'exemple pour développer et tester l'affichage des résultats
 * avant que la route backend + le LLM ne soient branchés. À retirer une fois
 * l'intégration réelle en place.
 */
import type { EvaluationResult } from "../types/models/EvaluationResult";

export const sampleEvaluation: EvaluationResult = {

    codeArticle: "4501278",
    designation: "Platine principale — laiton nickelé",
    evaluatedAt: "2 juillet 2026 à 10:42",
    articles: [
        {
            codeArticle: "4501278",
            designationArticle: "Platine principale — laiton nickelé",
            level: 0,
            rules: [
                {
                    rule_id: "R-CA0001",
                    rule_label: "Poids article renseigné pour la famille 007",
                    verdict: "FAIL",
                    criticality: "normal",
                    semi_formel: 'SI famille_article = "007" ALORS poids_article > 0',
                    libelle:
                        "Tout article de la famille 007 doit avoir un poids renseigné et strictement positif.",
                    zone: "caracteristiques",
                    construction: "comparaison simple",
                    exempted: false,
                    exemption_uncertain: false,
                    evidence: [
                        {
                            subject: "Article 4501278",
                            field: "poids_article",
                            expected: "> 0",
                            actual: "0",
                            verdict: "FAIL",
                            phrase:
                                "Le poids de l'article est nul alors qu'il devrait être strictement positif pour cette famille.",
                        },
                    ],
                },
                {
                    rule_id: "R-OP0001",
                    rule_label: "Présence d'une fit BC",
                    verdict: "FAIL",
                    criticality: "critique",
                    semi_formel:
                        'IL FAUT UNE fit_article AVEC libelle_fit COMMENCE PAR "BC"',
                    libelle:
                        'L\'article doit comporter au moins une fit dont le libellé commence par "BC".',
                    zone: "operations",
                    construction: "existence",
                    exempted: false,
                    exemption_uncertain: false,
                    evidence: [
                        {
                            subject: "fits_article",
                            field: 'libelle_fit COMMENCE PAR "BC"',
                            expected: "au moins un élément correspondant",
                            actual: "aucun élément trouvé",
                            verdict: "FAIL",
                            phrase:
                                'Aucune fit dont le libellé commence par "BC" n\'a été trouvée sur cet article.',
                        },
                    ],
                },
                {
                    rule_id: "R-AR0001",
                    rule_label: "Pas de polissage vibrant après une opération de frappe",
                    verdict: "FAIL",
                    criticality: "critique",
                    semi_formel:
                        'AUCUNE operation DONT libelle_operation CONTIENT "POLISSAGE" ET APRES operation DONT libelle_operation CONTIENT "FRAPPE"',
                    libelle:
                        "Aucune opération de polissage vibrant ne doit être placée après une opération de frappe dans la gamme.",
                    zone: "operations",
                    construction: "négation",
                    exempted: false,
                    exemption_uncertain: false,
                    evidence: [
                        {
                            subject: "Opération 01708200 — POLISSAGE VIBRANT",
                            field: "position relative",
                            expected: "absente après une opération de frappe",
                            actual: "trouvée après l'opération 01708050 (FRAPPE)",
                            verdict: "FAIL",
                            phrase:
                                "Un polissage vibrant a été trouvé après une opération de frappe, ce qui est interdit.",
                        },
                    ],
                },
                {
                    rule_id: "R-CA0011",
                    rule_label: "Temps d'immobilisation cumulé sur la ressource S07",
                    verdict: "FAIL",
                    criticality: "normal",
                    semi_formel:
                        'LA SOMME DES temps_immo DES operations CONSECUTIVES DONT ressource = "S07" DOIT ETRE EGALE A 120',
                    libelle:
                        "Le temps d'immobilisation cumulé des opérations consécutives sur la ressource S07 doit être exactement de 120 minutes.",
                    zone: "operations",
                    construction: "agrégation",
                    exempted: false,
                    exemption_uncertain: false,
                    evidence: [
                        {
                            subject: "Opérations consécutives, ressource S07",
                            field: "somme(temps_immo)",
                            expected: "= 120",
                            actual: "95",
                            verdict: "FAIL",
                            phrase:
                                "Le temps d'immobilisation cumulé sur la ressource S07 est de 95, alors que 120 est attendu.",
                        },
                    ],
                },
                {
                    rule_id: "R-GA0002",
                    rule_label:
                        "Présence d'une opération de gravure sur toutes les gammes",
                    verdict: "FAIL",
                    criticality: "critique",
                    semi_formel:
                        'TOUTES LES gammes DOIVENT AVOIR UNE operation AVEC code_operation = "01708080" SAUF SI famille_article = "000"',
                    libelle:
                        "Chaque gamme doit comporter une opération de gravure (code 01708080), sauf pour les articles de la famille 000.",
                    zone: "gammes",
                    construction: "for_all",
                    exempted: false,
                    exemption_uncertain: true,
                    uncertainty_reason:
                        "Le champ famille_article n'est pas renseigné pour cet article : impossible de vérifier si l'exception s'applique. La règle a été évaluée par précaution.",
                    evidence: [
                        {
                            subject: "Gamme G-004512",
                            field: "operations",
                            expected: "une opération code_operation = 01708080",
                            actual: "aucune opération correspondante trouvée",
                            verdict: "FAIL",
                            phrase:
                                "Aucune opération de gravure (code 01708080) n'a été trouvée sur cette gamme.",
                        },
                    ],
                },
                {
                    rule_id: "R-CA0003",
                    rule_label: "Matière principale renseignée",
                    verdict: "PASS",
                    criticality: "normal",
                    semi_formel: "matiere_principale EST RENSEIGNE",
                    libelle: "La matière principale de l'article doit être renseignée.",
                    zone: "caracteristiques",
                    construction: "comparaison simple",
                    exempted: false,
                    exemption_uncertain: false,
                    evidence: [],
                },
                {
                    rule_id: "R-OP0010",
                    rule_label: "Opération de contrôle final présente",
                    verdict: "PASS",
                    criticality: "critique",
                    semi_formel:
                        'IL FAUT UNE operation AVEC code_operation = "01900010"',
                    libelle:
                        "La gamme doit comporter une opération de contrôle final (code 01900010).",
                    zone: "operations",
                    construction: "existence",
                    exempted: false,
                    exemption_uncertain: false,
                    evidence: [],
                },
                {
                    rule_id: "R-GA0007",
                    rule_label: "Gravure du logo dispensée pour la famille 000",
                    verdict: "PASS",
                    criticality: "critique",
                    semi_formel:
                        'TOUTES LES gammes DOIVENT AVOIR UNE operation logo SAUF SI famille_article = "000"',
                    libelle:
                        "Chaque gamme doit comporter une opération de gravure du logo, sauf pour les articles de la famille 000.",
                    zone: "gammes",
                    construction: "for_all",
                    exempted: true,
                    exemption_uncertain: false,
                    exemption_reason:
                        "Cet article appartient à la famille 000, explicitement dispensée de cette règle.",
                    evidence: [],
                },
                {
                    rule_id: "R-CL0003",
                    rule_label: "Délai de livraison pour le client X",
                    verdict: "INCOMPLETE",
                    criticality: "normal",
                    semi_formel: 'SI client = "X" ALORS delai_livraison < 30',
                    libelle:
                        'Pour le client "X", le délai de livraison doit être inférieur à 30 jours.',
                    zone: "client",
                    construction: "incomplète",
                    exempted: false,
                    exemption_uncertain: false,
                    evidence: [
                        {
                            subject: "Article 4501278",
                            field: "client",
                            expected: "valeur renseignée pour évaluer la condition",
                            actual: "champ absent de la fiche article",
                            verdict: "INCOMPLETE",
                            phrase:
                                "Le champ client n'est pas renseigné, impossible de vérifier si cette règle s'applique.",
                        },
                    ],
                },
            ],
        },
        {
            codeArticle: "4501320",
            designationArticle: "Vis de fixation M1.4 — acier inoxydable",
            level: 1,
            rules: [
                {
                    rule_id: "R-OP0006",
                    rule_label: "Durée renseignée sur toutes les opérations",
                    verdict: "FAIL",
                    criticality: "normal",
                    semi_formel: "TOUTES LES operations DOIVENT AVOIR duree EST RENSEIGNE",
                    libelle: "Toutes les opérations de la gamme doivent avoir une durée renseignée.",
                    zone: "operations",
                    construction: "for_all",
                    exempted: false,
                    exemption_uncertain: false,
                    evidence: [
                        {
                            subject: "Opération 01708080",
                            field: "duree",
                            expected: "renseigné",
                            actual: "vide",
                            verdict: "FAIL",
                            phrase: "La durée de l'opération 01708080 n'est pas renseignée.",
                        },
                        {
                            subject: "Opération 01708090",
                            field: "duree",
                            expected: "renseigné",
                            actual: "vide",
                            verdict: "FAIL",
                            phrase: "La durée de l'opération 01708090 n'est pas renseignée.",
                        },
                        {
                            subject: "Opération 01708150",
                            field: "duree",
                            expected: "renseigné",
                            actual: "vide",
                            verdict: "FAIL",
                            phrase: "La durée de l'opération 01708150 n'est pas renseignée.",
                        },
                    ],
                },
                {
                    rule_id: "R-OP0006b",
                    rule_label: "Opération de contrôle juste après la ressource 501",
                    verdict: "FAIL",
                    criticality: "normal",
                    semi_formel:
                        'POUR CHAQUE operation DANS gammes DONT ressource = "501", IL FAUT UNE operation JUSTE APRES DONT code_operation = "01505010"',
                    libelle:
                        "Chaque opération réalisée sur la ressource 501 doit être immédiatement suivie d'une opération de contrôle (code 01505010).",
                    zone: "operations",
                    construction: "positionnel",
                    exempted: false,
                    exemption_uncertain: false,
                    evidence: [
                        {
                            subject: "Opération 04501020 (ressource 501)",
                            field: "opération suivante",
                            expected: "code_operation = 01505010 juste après",
                            actual: "aucune opération correspondante trouvée immédiatement après",
                            verdict: "FAIL",
                            phrase:
                                "Aucune opération de code 01505010 ne suit immédiatement l'opération sur ressource 501.",
                        },
                    ],
                },
                {
                    rule_id: "R-CA0002",
                    rule_label: "Diamètre nominal renseigné",
                    verdict: "PASS",
                    criticality: "normal",
                    semi_formel: "diametre_nominal > 0",
                    libelle: "Le diamètre nominal de l'article doit être renseigné et strictement positif.",
                    zone: "caracteristiques",
                    construction: "comparaison simple",
                    exempted: false,
                    exemption_uncertain: false,
                    evidence: [],
                },
            ],
        },
    ],
}