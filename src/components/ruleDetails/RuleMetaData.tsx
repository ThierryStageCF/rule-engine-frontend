import InputField from "../../ui/InputField.tsx";
import SelectField from "../../ui/SelectField.tsx";
import {PURE_CRITICALITY_OPTIONS, ZONES_OPTIONS} from "../../lib/utils/constands.ts";
import {Controller, type UseFormReturn} from "react-hook-form";
import ListItem from "../../ui/ListItem.tsx";
import TagInputField from "../../ui/InputTagField.tsx";
import type {RuleUpdateDisplayFormType} from "../../lib/types/schema/ruleUpdateSchema.ts";

export type RuleFormProps = {
    form: UseFormReturn<RuleUpdateDisplayFormType>,
    sectionTilte: string
}

export default function RuleMetaData({form, sectionTilte}: RuleFormProps) {
    return (
        <>
            <h2 className="text-xl text-primary font-semibold mb-4">
                {sectionTilte}
            </h2>
            {/* Titre + Auteur*/}
            <div className="grid grid-cols-2 gap-4">
                <InputField
                    id=""
                    label="Titre de la règle"
                    register={form.register("rule_title")}
                    error={form.formState.errors.rule_title?.message}
                    placeholder="ex: Polissage"
                />

                <InputField
                    id=""
                    label="Autheur"
                    register={form.register("author")}
                    error={form.formState.errors.author?.message}
                    placeholder="ex. Thierry"
                />
            </div>
            {/* Version de la règle */}
            <div className="grid grid-cols-6">
                <div className="col-span-1">
                    <InputField
                        id=""
                        label="Version"
                        name="version"
                        readonly={true}
                        register={form.register("version")}
                        placeholder="ex: 1"
                        type="number"
                    />
                </div>
            </div>

            {/*  Zone + priorité de la règle */}
            <div className="grid grid-cols-2 gap-4">
                <SelectField
                    id="zone-metier"
                    options={ZONES_OPTIONS}
                    error={form.formState.errors.zone?.message}
                    label="Zone métier de la règle"
                    register={form.register("zone")}
                />
                <SelectField
                    id="priority"
                    options={PURE_CRITICALITY_OPTIONS}
                    error={form.formState.errors.criticality?.message}
                    label="Priorité de la règle"
                    register={form.register("criticality")}
                />
            </div>


            <fieldset>
                <legend className="block text-sm font-medium text-primary">Cette règle s'applique t'elle uniquement aux produits finis ?</legend>
                <Controller
                    control={form.control}
                    name="finished_product_only"
                    render={({ field }) => (
                        <div className="">
                            <ListItem
                                variant="check"
                                label="Oui"
                                active={field.value === true}
                                onClick={() => field.onChange(field.value === true ? undefined : true)}
                            />
                            <ListItem
                                variant="check"
                                label="Non"
                                active={field.value === false}
                                onClick={() => field.onChange(field.value === false ? undefined : false)}
                            />
                        </div>
                    )}
                />
            </fieldset>


            {/* Service, secteur */}
            <div className="mt-5 grid grid-cols-2 gap-4">
                <InputField
                    id=""
                    label="Service"
                    error={form.formState.errors.service?.message}
                    register={form.register("service")}
                    placeholder="ex: Polissage"
                />

                <InputField
                    id=""
                    label="Secteur"
                    error={form.formState.errors.sector?.message}
                    register={form.register("sector")}
                    placeholder="ex: Décoletage"
                />
            </div>

            {/* clients concernés par la règle. */}
            <div>
                <TagInputField
                    id=""
                    name="client"
                    label="Clients concernés par la règle"
                    placeholder="ex. Louis Vuiton"
                    control={form.control}
                />
            </div>


            {/* Date de création et de dernière mise à jour */}
            <div className="mt-7 grid grid-cols-2 gap-4">
                <InputField
                    id=""
                    type="date"
                    label="Date de création"
                    readonly={true}
                    register={form.register("created_at")}
                    placeholder="ex: Polissage"
                />

                <InputField
                    id=""
                    type="date"
                    label="Date de dernière mise à jour"
                    readonly={true}
                    register={form.register("updated_at")}
                    placeholder="ex: Décoletage"
                />

            </div>
        </>

    );
}