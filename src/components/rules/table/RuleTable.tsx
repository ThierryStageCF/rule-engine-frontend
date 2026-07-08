import type { JSX } from "react";
import type { Rule } from "../../../lib/types/models/rule.model.ts";
import { RuleRow } from "./RuleRow.tsx";

export type RuleTableProps = {
    rules: Rule[];
    onViewRuleDetails: (ruleId: string) => void;
    onToggleActive: (rule: Rule) => void;
    onEditRule: (ruleId: string) => void;
};

const COLUMNS = ["Identifiant", "Auteur", "Libellé", "Formalisation", "Statut", "Criticité", "Actions"];

/**
 * @summary Tableau des règles. Lignes alternées et cliquables ; l'état vide est géré.
 */
export function RuleTable(
    {
        rules,
        onViewRuleDetails,
        onToggleActive,
        onEditRule,
    }: RuleTableProps): JSX.Element {

    if (rules.length === 0) {
        return (
            <div className="rounded-xl border border-border bg-background px-6 py-16 text-center text-muted-foreground">
                Aucune règle ne correspond à ces critères.
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <table className="w-full border-separate border-spacing-y-2 text-center">
                <thead>
                    <tr className="bg-primary">
                        {COLUMNS.map((column, index) => (
                            <th
                                key={column || `col-${index}`}
                                className={`px-4 py-5 text-sm font-semibold uppercase text-primary-foreground ${index === 0 ? "rounded-l-lg" : index === COLUMNS.length -1 ? "rounded-r-lg" : "" }`}
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {rules.map((rule, index) => (
                    <RuleRow
                        key={rule.ruleId}
                        rule={rule}
                        zebra={index % 2 === 1}
                        onOpen={onViewRuleDetails}
                        onToggleActive={onToggleActive}
                        onEdit={onEditRule}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}