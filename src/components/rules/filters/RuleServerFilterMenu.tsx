import type { JSX } from "react";
import { Controller } from "react-hook-form";
import { Filter } from "lucide-react";
import type { RuleServerFiltersFormType } from "../../../lib/types/schema/ruleServerFiltersSchema.ts";
import {PURE_CRITICALITY_OPTIONS, ZONE_LABELS, ZONE_ORDER} from "../../../lib/utils/constands.ts";
import { useRuleFilterForm } from "../../../lib/hooks/rules/useRuleFilterForm.ts";
import BaseModal from "../../../layouts/BaseModal.tsx";
import InputField from "../../../ui/InputField.tsx";
import ListItem from "../../../ui/ListItem.tsx";
import Button from "../../../ui/Button.tsx";

export type RuleServerFilterModalProps = {
    open: boolean;
    onClose: () => void;
    onApply: (filters: RuleServerFiltersFormType) => void;
    onClear: () => void;
};

/**
 * @summary Modale centrée et scrollable des filtres serveur. Formulaire validé par Zod ;
 * ListItem reste une brique pure, câblée au formulaire via Controller.
 */
export function RuleServerFilterMenu(
    {
        open,
        onClose,
        onApply,
        onClear,
    }: RuleServerFilterModalProps): JSX.Element {

    const { form, actions } = useRuleFilterForm(
        (filters) => { onApply(filters); onClose(); },
        () => { onClear(); onClose(); },
    );

    const toggle = (list: string[], value: string): string[] =>
        list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Filtrer les règles"
            subtitle="Composez une recherche : zone, criticité, statut, auteur, secteur, client."
            icon={<Filter className="size-5" />}
            size="lg"
        >
            <form onSubmit={form.handleSubmit(actions.handleApply)} className="flex flex-col gap-5">
                {/* Zone (multi, deux colonnes) */}
                <fieldset>
                    <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Zone</legend>
                    <Controller
                        control={form.control}
                        name="zones"
                        render={({ field }) => (
                            <div className="grid grid-cols-2 gap-1">
                                {ZONE_ORDER.map((zone) => (
                                    <ListItem
                                        key={zone}
                                        variant="check"
                                        label={ZONE_LABELS[zone]}
                                        active={(field.value ?? []).includes(zone)}
                                        onClick={() => field.onChange(toggle(field.value ?? [], zone))}
                                    />
                                ))}
                            </div>
                        )}
                    />
                </fieldset>

                {/* Criticité + statut, côte à côte */}
                <div className="grid grid-cols-2 gap-5">
                    <fieldset>
                        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Criticité</legend>
                        <Controller
                            control={form.control}
                            name="criticalities"
                            render={({ field }) => (
                                <div className="flex flex-col gap-1">
                                    {PURE_CRITICALITY_OPTIONS.map((option) => (
                                        <ListItem
                                            key={option.value}
                                            variant="check"
                                            label={option.label}
                                            active={(field.value ?? []).includes(option.value)}
                                            onClick={() => field.onChange(toggle(field.value ?? [], option.value))}
                                        />
                                    ))}
                                </div>
                            )}
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Statut</legend>
                        <Controller
                            control={form.control}
                            name="active"
                            render={({ field }) => (
                                <div className="flex flex-col gap-1">
                                    <ListItem variant="check" label="Actives" active={field.value === true}
                                              onClick={() => field.onChange(field.value === true ? undefined : true)} />
                                    <ListItem variant="check" label="Inactives" active={field.value === false}
                                              onClick={() => field.onChange(field.value === false ? undefined : false)} />
                                </div>
                            )}
                        />
                    </fieldset>
                </div>

                {/* Champs texte */}
                <div className="flex flex-col gap-3">
                    <InputField id="filter-author" label="Auteur" placeholder="ex. Thierry" register={form.register("author")} error={form.errors?.author?.message} />
                    <InputField id="filter-sector" label="Secteur" placeholder="ex. Décolletage" register={form.register("sector")} error={form.errors?.sector?.message} />
                    <InputField id="filter-client" label="Client" placeholder="ex. Cartier" register={form.register("client")} error={form.errors?.client?.message} />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                    <Button type="button" label="Effacer" variant="ghost" style="solid" rounded="xl" onClick={actions.handleClear} />
                    <Button type="submit" label="Appliquer" variant="primary" style="solid" rounded="xl" />
                </div>
            </form>
        </BaseModal>
    );
}