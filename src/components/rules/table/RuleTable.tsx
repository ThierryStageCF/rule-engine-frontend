import type { JSX } from "react";
import type { Rule } from "../../../lib/types/models/rule.model.ts";
import { RuleRow } from "./RuleRow.tsx";

export type RuleTableProps = {
    rules: Rule[];
    onOpen: (ruleId: string) => void;
    onToggleActive: (rule: Rule) => void;
    onEdit: (ruleId: string) => void;
};

const COLUMNS = ["Identifiant", "Libellé", "Semi-formel", "Criticité", "Statut", "Auteur", ""];

/**
 * @summary Tableau des règles. Lignes alternées et cliquables ; l'état vide est géré.
 */
export function RuleTable(
    {
        rules,
        onOpen,
        onToggleActive,
        onEdit,
    }: RuleTableProps): JSX.Element {

    if (rules.length === 0) {
        return (
            <div className="rounded-xl border border-border bg-background px-6 py-16 text-center text-muted-foreground">
                Aucune règle ne correspond à ces critères.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-border bg-background">
            <table className="w-full border-collapse text-left">
                <thead>
                <tr className="border-b border-border bg-primary/4">
                    {COLUMNS.map((column, index) => (
                        <th
                            key={column || `col-${index}`}
                            className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground ${index === COLUMNS.length - 1 ? "text-right" : ""}`}
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
                        onOpen={onOpen}
                        onToggleActive={onToggleActive}
                        onEdit={onEdit}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}