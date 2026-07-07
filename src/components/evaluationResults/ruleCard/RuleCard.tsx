import {type JSX } from "react"
import type { RuleResult } from "../../../lib/types/models/evaluationResult.model.ts";
import RuleCardHeader from "./RuleHeader.tsx";
import RuleExpression from "./RuleExpression.tsx";
import RuleResultCard from "./RuleResult.tsx";


const STRIPE: Record<RuleResult["verdict"], string> = {
    FAIL: "before:bg-danger",
    PASS: "before:bg-success",
    INCOMPLETE: "before:bg-warning",
}


/**
 * @summary Composant fonctionnel qui affiche la règle (énoncé + semi-formel et les rapports d'échec ou incomplete si présent).
 * @param rule résultat d'évaluation d'une règle (métadonnées de la règle + liste d'évidence)
 * */
export function RuleCard({ rule }: { rule: RuleResult }): JSX.Element {

    return (
        <article className={`relative overflow-hidden rounded-2xl border border-border bg-card p-5 pl-6 shadow-sm before:absolute before:inset-y-0 before:left-0 before:w-1 ${STRIPE[rule.verdict]}`}>
            {/* En tête */}
            <RuleCardHeader rule={rule} />

            {/* Énonce de la règle */}
            <RuleExpression rule={rule} />

            {/* Résultats de l'évaluation de l'article sur la règle */}
            <RuleResultCard rule={rule}/>
        </article>
    )
}




