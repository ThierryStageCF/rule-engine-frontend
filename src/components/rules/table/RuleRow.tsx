import type { JSX } from "react";
import { Pencil, Power, PowerOff } from "lucide-react";
import type { Rule } from "../../../lib/types/models/rule.model.ts";
import { CRITICALITY_BADGES } from "../../../lib/utils/constands.ts";
import Badge from "../../../ui/Badge.tsx";

export type RuleRowProps = {
    rule: Rule;
    zebra: boolean;
    onOpen: (ruleId: string) => void;
    onToggleActive: (rule: Rule) => void;
    onEdit: (ruleId: string) => void;
};

/**
 * @summary Ligne de tableau d'une règle. Cliquable (ouvre le détail) ; les actions
 * stoppent la propagation pour ne pas déclencher l'ouverture.
 */
export function RuleRow(
    {
        rule,
        zebra,
        onOpen,
        onToggleActive,
        onEdit,
    }: RuleRowProps): JSX.Element {

    return (
        <tr
            onClick={() => onOpen(rule.ruleId)}
            className={`
                cursor-pointer border-b border-border transition-colors
                ${zebra ? "bg-primary/3" : "bg-background"}
                hover:bg-primary/[0.07]
            `}
        >
            <td className="px-4 py-3 font-mono text-sm text-foreground">{rule.ruleId}</td>

            <td className="px-4 py-3 text-sm text-foreground">{rule.sourceText ?? "—"}</td>

            <td className="px-4 py-3 max-w-xs truncate font-mono text-xs text-muted-foreground">
                {rule.semiFormel}
            </td>

            <td className="px-4 py-3">
                <Badge {...CRITICALITY_BADGES[rule.criticality]} size="sm">
                    {rule.criticality === "critique" ? "Critique" : "Normale"}
                </Badge>
            </td>

            <td className="px-4 py-3">
                <Badge variant={rule.active ? "success" : "neutral"} shape="pill" size="sm">
                    <span className={`size-1.5 rounded-full ${rule.active ? "bg-success" : "bg-muted-foreground"}`} />
                    {rule.active ? "Active" : "Inactive"}
                </Badge>
            </td>

            <td className="px-4 py-3 text-sm text-muted-foreground">{rule.author ?? "—"}</td>

            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                    <button
                        type="button"
                        title="Modifier"
                        onClick={(event) => { event.stopPropagation(); onEdit(rule.ruleId); }}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                    >
                        <Pencil className="size-4" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        title={rule.active ? "Désactiver" : "Activer"}
                        onClick={(event) => { event.stopPropagation(); onToggleActive(rule); }}
                        className={`rounded-md p-1.5 hover:bg-primary/10 ${rule.active ? "text-danger" : "text-success"}`}
                    >
                        {rule.active
                            ? <PowerOff className="size-4" aria-hidden="true" />
                            : <Power className="size-4" aria-hidden="true" />}
                    </button>
                </div>
            </td>
        </tr>
    );
}