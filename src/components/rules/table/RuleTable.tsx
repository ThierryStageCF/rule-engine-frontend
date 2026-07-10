import type { JSX } from "react";
import type { Rule } from "../../../lib/types/models/rule.model.ts";
import { RuleRow } from "./RuleRow.tsx";
import Card from "../../../ui/Card.tsx";

type RuleTableProps = {
    rules: Rule[];
    onViewRuleDetails: (ruleId: string, rule?: Rule) => void;
    onToggleActive: (rule: Rule) => void;
    onEditRule: (ruleId: string, rule?: Rule) => void;
};

const COLUMNS = [
    "Identifiant",
    "Auteur",
    "Libellé",
    "Formalisation",
    "Statut",
    "Criticité",
    "Actions",
];

export function RuleTable(
    {
        rules,
        onViewRuleDetails,
        onToggleActive,
        onEditRule
    }: RuleTableProps): JSX.Element {

    if (rules.length === 0) {
        return (
            <div className="mt-10">
                <Card variant="outlined">
                    <div className="px-6 py-16 text-center text-muted-foreground">
                        Aucune règle ne correspond trouvée ou ne correspondant aux critères de filtre.
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-300 w-full border-separate border-spacing-y-2">
                <thead>
                <tr className="bg-primary">
                    {COLUMNS.map((column, index) => (
                        <th
                            key={column}
                            className={`px-4 py-5 text-center text-sm font-semibold uppercase text-primary-foreground whitespace-nowrap
                                ${index === 0 ? "rounded-l-lg" : ""}
                                ${index === COLUMNS.length - 1 ? "rounded-r-lg" : ""}
                            `}
                        >
                            {column}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {rules.map((rule, index) => (
                    <RuleRow
                        key={rule.id}
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