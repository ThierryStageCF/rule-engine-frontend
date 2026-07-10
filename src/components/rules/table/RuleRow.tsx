import type { JSX } from "react";
import { Pencil, Power, PowerOff } from "lucide-react";
import type { Rule } from "../../../lib/types/models/rule.model.ts";
import { CRITICALITY_BADGES } from "../../../lib/utils/constands.ts";
import Badge from "../../../ui/Badge.tsx";
import { Tooltip } from "antd";
import Button from "../../../ui/Button.tsx";

export type RuleRowProps = {
    rule: Rule;
    zebra: boolean;
    onOpen: (ruleId: string, rule: Rule) => void;
    onToggleActive: (rule: Rule) => void;
    onEdit: (ruleId: string, rule?: Rule) => void;
};

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
            onClick={() => onOpen(rule.id, rule)}
            className={`
                cursor-pointer
                transition-colors
                hover:bg-secondary/40
                ${zebra ? "bg-blue-100" : "bg-base-color"}
            `}
        >
            {/* Identifiant */}
            <td className="w-32 rounded-l-lg px-4 py-5 text-center align-middle">
                <span className="font-semibold text-blue-700">
                    {rule.id}
                </span>
            </td>

            {/* Auteur */}
            <td className="w-40 px-4 py-5 text-center align-middle text-sm text-muted-foreground">
                {rule.author ?? "—"}
            </td>

            {/* Libellé */}

            <td className="w-80 px-4 py-5 align-middle">
                <Tooltip placement="top" title={rule?.title ? rule.title : rule.sourceText?.trim()}>
                    <div className="line-clamp-2 text-sm text-foreground text-center">
                        {rule?.title ? rule.title?.trim() : rule.sourceText?.trim() ?? "—"}
                    </div>
                </Tooltip>
            </td>


            {/* Formalisation */}
            <td className="w-96 px-4 py-5 align-middle">
                <Tooltip placement="top" title={rule.semiFormel.trim()}>
                    <div className="line-clamp-2 font-mono text-sm text-muted-foreground">
                        {rule.semiFormel.trim()}
                    </div>
                </Tooltip>
            </td>

            {/* Statut */}
            <td className="w-fit px-4 py-5 text-center align-middle">
                <Badge
                    variant={rule.active ? "success" : "neutral"}
                    shape="pill"
                    size="sm"
                >
                    <span
                        className={`size-1.5 rounded-full text-center ${
                            rule.active ? "bg-success" : "bg-muted-foreground"
                        }`}
                    />
                    {rule.active ? "Active" : "Inactive"}
                </Badge>
            </td>

            {/* Criticité */}
            <td className="w-fit px-4 py-5 text-center align-middle">
                <Badge
                    {...CRITICALITY_BADGES[rule.criticality]}
                    size="sm"
                >
                    {rule.criticality === "critique"
                        ? "Critique"
                        : "Normale"}
                </Badge>
            </td>

            {/* Actions */}
            <td className="w-32 rounded-r-lg px-4 py-5 align-middle">
                <div className="flex items-center justify-center gap-2">
                    <Tooltip placement="left" title="Modifier">
                        <Button
                            type="button"
                            variant="ghost"
                            rounded="xl"
                            onClick={(event) => {
                                event.stopPropagation();
                                onEdit(rule.id, rule);
                            }}
                            icon={
                                <Pencil
                                    className="size-4"
                                    aria-hidden="true"
                                />
                            }
                        />
                    </Tooltip>

                    <Tooltip
                        placement="top"
                        title={rule.active ? "Désactiver" : "Activer"}
                    >
                        <Button
                            type="button"
                            variant="ghost"
                            rounded="xl"
                            onClick={(event) => {
                                event.stopPropagation();
                                onToggleActive(rule);
                            }}
                            icon={
                                rule.active ? (
                                    <PowerOff
                                        className="size-4 text-danger"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Power
                                        className="size-4 text-success"
                                        aria-hidden="true"
                                    />
                                )
                            }
                        />
                    </Tooltip>
                </div>
            </td>
        </tr>
    );
}