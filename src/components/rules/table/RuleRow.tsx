import type { JSX } from "react";
import { Pencil, Power, PowerOff } from "lucide-react";
import type { Rule } from "../../../lib/types/models/rule.model.ts";
import { CRITICALITY_BADGES } from "../../../lib/utils/constands.ts";
import Badge from "../../../ui/Badge.tsx";
import {Tooltip} from "antd";
import Button from "../../../ui/Button.tsx";

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
                cursor-pointer transition-colors
                ${zebra ? "bg-blue-100" : "bg-base-color"}
            `}
        >
            <td className="rounded-l-lg text-center px-4 py-5  text-sm font-semibold text-blue-700">{rule.ruleId}</td>

            <td className=" text-center px-4 py-5 text-sm text-muted-foreground">{rule.author ?? "—"}</td>

            <td className="text-center  px-4 py-5 text-sm text-foreground">{rule.sourceText ?? "—"}</td>

            <td className="text-left px-4 py-5 max-w-xs font-mono text-sm text-muted-foreground">
                {rule.semiFormel}
            </td>


            <td className="px-4 py-3">
                <Badge
                    variant={rule.active ? "success" : "neutral"}
                    shape="pill"
                    size="sm"
                >
                    <span className={`size-1.5 rounded-full ${rule.active ? "bg-success" : "bg-muted-foreground"}`} />
                    {rule.active ? "Active" : "Inactive"}
                </Badge>
            </td>

            <td className="px-4 py-3 ">
                <Badge {...CRITICALITY_BADGES[rule.criticality]}
                       size="sm"
                >
                    {rule.criticality === "critique" ? "Critique" : "Normale"}
                </Badge>
            </td>

            <td className="px-4 py-3 rounded-r-lg">
                <div className="flex items-center justify-ce gap-1">
                    <Tooltip placement="top" title="Modifier">
                        <Button
                            type="button"
                            variant="ghost"
                            rounded="xl"
                            onClick={(event) => { event.stopPropagation(); onEdit(rule.ruleId); }}
                            icon={<Pencil className="size-4" aria-hidden="true" />}

                        />
                    </Tooltip>
                    <Tooltip placement="right" title={rule.active ? "Désactiver" : "Activer"}>
                        <Button
                            type="button"
                            variant="ghost"
                            rounded="xl"
                            onClick={(event) => { event.stopPropagation(); onToggleActive(rule); }}
                            icon={rule.active  ? <PowerOff className="size-4 text-danger" aria-hidden="true" />
                                : <Power className="size-4 text-success" aria-hidden="true" />
                            }

                        />
                    </Tooltip>
                </div>
            </td>
        </tr>
    );
}