import InputField from "../../ui/InputField.tsx";
import SelectField from "../../ui/SelectField.tsx";
import {PURE_CRITICALITY_OPTIONS, ZONES_OPTIONS} from "../../lib/utils/constands.ts";
import {Controller, type UseFormReturn} from "react-hook-form";
import ListItem from "../../ui/ListItem.tsx";
import TagInputField from "../../ui/InputTagField.tsx";
import type {RuleCreateFormType} from "../../lib/types/schema/ruleCreationSchema.ts";
import type {RuleCreatedDto} from "../../lib/types/entities/ruleCreated.dto.ts";

export type RuleCreateFormProps = {
    form: UseFormReturn<RuleCreateFormType>,
    sectionTilte: string,
    createdRule: RuleCreatedDto | null,
    locked: boolean,
}

export default function RuleCreateMetaData({form, sectionTilte, createdRule, locked}: RuleCreateFormProps) {
    return (
        <>
            <h2 className="text-xl text-primary font-semibold mb-4">
                {sectionTilte}
            </h2>

            {/* Informations renvoyées par le backend, visibles seulement après création */}
            {createdRule && (
                <div className="grid grid-cols-3 gap-4">
                    <InputField
                        id="rule-id"
                        label="Identifiant"
                        readonly={true}
                        value={createdRule.rule_id}
                    />
                    <InputField
                        id="rule-version"
                        label="Version"
                        type="number"
                        readonly={true}
                        value={String(createdRule.version)}
                    />
                    <InputField
                        id="rule-created-date"
                        label="Date de création"
                        type="date"
                        readonly={true}
                        value={createdRule.created_at}
                    />
                    <fieldset>
                        <legend className="block text-sm font-medium text-primary">Active</legend>
                        <ListItem
                            variant="check"
                            label={createdRule.active ? "Oui" : "Non"}
                            active={createdRule.active}
                            onClick={() => {}}
                        />
                    </fieldset>
                </div>
            )}

            {/* Titre + Auteur */}
            <div className="grid grid-cols-2 gap-4">
                <InputField
                    id="rule-title"
                    label="Titre de la règle"
                    register={form.register("rule_title")}
                    error={form.formState.errors.rule_title?.message}
                    placeholder="ex: Polissage"
                    readonly={locked}
                />
                <InputField
                    id="rule-author"
                    label="Auteur"
                    register={form.register("author")}
                    error={form.formState.errors.author?.message}
                    placeholder="ex. Thierry"
                    readonly={locked}
                />
            </div>

            {/* Zone + criticité */}
            <div className="grid grid-cols-2 gap-4">
                <SelectField
                    id="zone-metier"
                    options={ZONES_OPTIONS}
                    error={form.formState.errors.zone?.message}
                    label="Zone métier de la règle"
                    register={form.register("zone")}
                    disabled={locked}
                />
                <SelectField
                    id="priority"
                    options={PURE_CRITICALITY_OPTIONS}
                    error={form.formState.errors.criticality?.message}
                    label="Priorité de la règle"
                    register={form.register("criticality")}
                    disabled={locked}
                />
            </div>

            {/* Produits finis uniquement */}
            <fieldset className="mt-2">
                <legend className="block text-sm font-medium text-primary">Cette règle s'applique t'elle uniquement aux produits finis ?</legend>
                <Controller
                    control={form.control}
                    name="finished_product_only"
                    render={({ field }) => (
                        <div>
                            <ListItem
                                variant="check"
                                label="Oui"
                                active={field.value === true}
                                onClick={() => { if (!locked) field.onChange(field.value === true ? undefined : true); }}
                            />
                            <ListItem
                                variant="check"
                                label="Non"
                                active={field.value === false}
                                onClick={() => { if (!locked) field.onChange(field.value === false ? undefined : false); }}
                            />
                        </div>
                    )}
                />
            </fieldset>

            {/* Service + secteur */}
            <div className="mt-5 grid grid-cols-2 gap-4">
                <InputField
                    id="service"
                    label="Service"
                    error={form.formState.errors.service?.message}
                    register={form.register("service")}
                    placeholder="ex: Polissage"
                    readonly={locked}
                />
                <InputField
                    id="sector"
                    label="Secteur"
                    error={form.formState.errors.sector?.message}
                    register={form.register("sector")}
                    placeholder="ex: Décolletage"
                    readonly={locked}
                />
            </div>

            {/* Clients concernés */}
            <div>
                <TagInputField
                    id="client"
                    name="client"
                    label="Clients concernés par la règle"
                    placeholder="ex. Louis Vuitton"
                    control={form.control}
                    disabled={locked}
                />
            </div>
        </>
    );
}