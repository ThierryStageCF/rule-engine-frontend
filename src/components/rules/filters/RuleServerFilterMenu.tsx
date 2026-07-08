import type { JSX } from "react";
import { Controller } from "react-hook-form";
import { Filter } from "lucide-react";
import type { RuleServerFiltersFormType } from "../../../lib/types/schema/ruleServerFiltersSchema.ts";
import {PURE_CRITICALITY_OPTIONS, ZONE_LABELS} from "../../../lib/utils/constands.ts";
import { useRuleFilterForm } from "../../../lib/hooks/rules/useRuleFilterForm.ts";
import BaseModal from "../../../layouts/BaseModal.tsx";
import InputField from "../../../ui/InputField.tsx";
import ListItem from "../../../ui/ListItem.tsx";
import Button from "../../../ui/Button.tsx";
import SelectField, {type SelectOption} from "../../../ui/SelectField.tsx";
import type {DomainZone} from "../../../lib/types/models/evaluationResult.model.ts";

export type RuleServerFilterModalProps = {
    open: boolean;
    onClose: () => void;
    onApplyFilters: (filters: RuleServerFiltersFormType) => void;
    onClear: () => void;
};

/**
 * @summary Modale permettant d'adresser une requête de filtre directement au serveur backend
 */
export function RuleServerFilterMenu(
    {
        open,
        onClose,
        onApplyFilters,
        onClear,
    }: RuleServerFilterModalProps): JSX.Element {



    const { filterForm, actions } = useRuleFilterForm(
        (filters) => {
            onApplyFilters(filters);
            onClose();
        },
        () => { onClear();  },
    );


    const zonesOptions: SelectOption[] = (Object.entries(ZONE_LABELS) as [DomainZone, string][])
        .map(([key, value]) => (
            {
                label: value,
                value: key,
            }
        ));

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Filtrer les règles"
            subtitle="Composez une recherche : zone, criticité, statut, auteur, secteur, client."
            icon={<Filter className="size-5" />}
            size="xl"
        >
            <form onSubmit={filterForm.handleSubmit(actions.onApply)} className="flex flex-col gap-4 px-4 pb-2">
                {/* Selection d'une zone métier */}
                <div className="flex flex-col gap-2">
                    <legend className="text-sm font-bold uppercase text-primary">Zone</legend>
                    <SelectField
                        id="zone-id"
                        options={zonesOptions}
                        register={filterForm.register("zone")}
                        error={filterForm.errors?.zone?.message}
                    />
                </div>
                {/* Selection d'une priorité */}
                <div className="flex flex-col gap-2">
                    <legend className="mb-2 text-sm font-bold uppercase text-primary">Priorité</legend>
                    <SelectField
                        id="zone-id"
                        options={PURE_CRITICALITY_OPTIONS}
                        register={filterForm.register("criticality")}
                        error={filterForm.errors?.criticality?.message}
                    />
                </div>
                {/* Selection du statut de la règle: active ou inactive */}
                <fieldset>
                    <legend className="mb-2 text-sm font-bold uppercase text-primary">Statut de la règle</legend>
                    <Controller
                        control={filterForm.control}
                        name="active"
                        render={({ field }) => (
                            <div className="grid grid-cols-2 gap-1">
                                <ListItem
                                    variant="check"
                                    label="Actives"
                                    active={field.value === true}
                                    onClick={() => field.onChange(field.value === true ? undefined : true)}
                                />
                                <ListItem
                                    variant="check"
                                    label="Inactives"
                                    active={field.value === false}
                                    onClick={() => field.onChange(field.value === false ? undefined : false)}
                                />
                            </div>
                        )}
                    />
                </fieldset>

                {/* Champs en saisie libre */}
                <div className="mt-6 flex flex-col gap-5">
                    {/* Auteur de la règle */}
                    <div className="flex flex-col gap-1">
                        <legend className="text-sm font-bold uppercase text-primary">Auteur</legend>
                        <InputField
                            id="filter-author"
                            placeholder="ex. Thierry"
                            register={filterForm.register("author")}
                            error={filterForm.errors?.author?.message}
                        />
                    </div>
                    {/* secteur concerné par la règle métier */}
                    <div className="flex flex-col gap-1">
                        <legend className="text-sm font-bold uppercase text-primary">Secteur</legend>
                        <InputField
                            id="filter-sector"
                            placeholder="ex. Décolletage"
                            register={filterForm.register("sector")}
                            error={filterForm.errors?.sector?.message}
                        />
                    </div>
                    {/* clients concernés par la règle métier */}
                    <div className="flex flex-col gap-1">
                        <legend className="text-sm font-bold uppercase text-primary">Client</legend>
                        <InputField
                            id="filter-client"
                            placeholder="ex. Cartier"
                            register={filterForm.register("client")}
                            error={filterForm.errors?.client?.message}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <legend className="text-sm font-bold uppercase text-primary">Date de création</legend>
                        <InputField
                            id="create-date"
                            type="date"
                            register={filterForm.register("created_at")}
                            error={filterForm.errors?.created_at?.message}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <legend className="text-sm font-bold uppercase text-primary">Date de mise à jour</legend>
                        <InputField
                            id="update-date"
                            type="date"
                            register={filterForm.register("updated_at")}
                            error={filterForm.errors?.updated_at?.message}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3 pt-4">
                    <Button
                        type="button"
                        label="Effacer"
                        variant="primary"
                        style="dashed"
                        rounded="xl"
                        onClick={actions.handleClear}
                    />
                    <Button
                        type="submit"
                        label="Appliquer"
                        variant="primary"
                        style="solid"
                        rounded="xl"
                    />
                </div>
            </form>
        </BaseModal>
    );
}