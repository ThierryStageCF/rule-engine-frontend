import type { SearchRuleDTO } from "../types/entities/rule.dto.ts";

/**
 * Données d'exemple, au format EXACT du backend (SearchRuleResponse groupé par zone,
 * criticité dans sa casse d'origine). Sert uniquement tant que la couche API n'est
 * pas branchée ; à supprimer le jour où RuleService fait le vrai appel.
 */
export const SAMPLE_SEARCH_RULE_DTO: SearchRuleDTO = {
    rules: {
        operation: [
            {
                rule_id: "R-OP0006", version: 3, active: true, criticality: "critique",
                semi_formal: "POUR CHAQUE operation DANS gammes DONT ressource = 501, IL FAUT UNE operation JUSTE APRES DONT code_operation = 01505010",
                source_text: "Toute opération de traitement thermique doit être suivie d'un contrôle dimensionnel.",
                author: "T. Ngoupaye", sector: "Décolletage", client: null,
                created_at: "2026-01-12", last_update: "2026-01-20", zone: "operation",
            },
            {
                rule_id: "R-OP0014", version: 1, active: false, criticality: "Normal",
                semi_formal: "TOUTES LES operations DANS gammes DOIVENT AVOIR un temps_operation RENSEIGNE",
                source_text: "Chaque opération de gamme doit renseigner son temps.",
                author: "M. Perret", sector: "Méthodes", client: null,
                created_at: "2025-11-03", last_update: null, zone: "operation",
            },
        ],
        caracteristiques: [
            {
                rule_id: "R-CA0011", version: 2, active: true, criticality: "critique",
                semi_formal: "SI matiere_article CONTIENT \"OR\" ALORS titre_matiere DOIT ETRE RENSEIGNE",
                source_text: "Un article en or doit porter son titre (750, 916...).",
                author: "T. Ngoupaye", sector: "Joaillerie", client: ["Cartier"],
                created_at: "2026-01-05", last_update: "2026-01-18", zone: "caracteristiques",
            },
            {
                rule_id: "R-CA0027", version: 1, active: true, criticality: "Normal",
                semi_formal: "poids_piece EST INFERIEUR A 40",
                source_text: "Le poids d'une pièce doit rester sous le seuil de 40 g.",
                author: "L. Girard", sector: "Contrôle", client: null,
                created_at: "2025-12-15", last_update: null, zone: "caracteristiques",
            },
        ],
        gamme: [
            {
                rule_id: "R-GA0003", version: 1, active: true, criticality: "Normal",
                semi_formal: "IL EXISTE UNE gamme DANS gammes DONT statut_gamme = \"validee\"",
                source_text: "Au moins une gamme validée doit exister pour l'article.",
                author: "M. Perret", sector: "Méthodes", client: null,
                created_at: "2025-10-22", last_update: "2026-01-09", zone: "gamme",
            },
        ],
        nomenclature: [
            {
                rule_id: "R-NO0009", version: 4, active: false, criticality: "critique",
                semi_formal: "TOUS LES composants DANS nomenclature DOIVENT AVOIR un code_article RENSEIGNE",
                source_text: "Chaque composant de la nomenclature doit référencer un code article.",
                author: "T. Ngoupaye", sector: "Bureau d'études", client: null,
                created_at: "2025-09-30", last_update: "2026-01-02", zone: "nomenclature",
            },
        ],
        client: [
            {
                rule_id: "R-CL0002", version: 1, active: true, criticality: "critique",
                semi_formal: "SI client = \"Cartier\" ALORS finition_article DOIT ETRE RENSEIGNE",
                source_text: "Les articles Cartier exigent une finition renseignée.",
                author: "L. Girard", sector: "Qualité", client: ["Cartier"],
                created_at: "2026-01-14", last_update: null, zone: "client",
            },
        ],
        apport: [
            {
                rule_id: "R-AP0001", version: 2, active: true, criticality: "Normal",
                semi_formal: "matiere_apport DOIT ETRE RENSEIGNE",
                source_text: "La matière d'apport doit être renseignée.",
                author: "M. Perret", sector: "Soudure", client: null,
                created_at: "2025-11-28", last_update: "2026-01-11", zone: "apport",
            },
        ],
    },
};