import TextAreaField from "../../ui/TextAreaField.tsx";
import type {UseFormReturn} from "react-hook-form";
import type {RuleCreateFormType} from "../../lib/types/schema/ruleCreationSchema.ts";

export type RuleCreateFormalizationProps = {
    form: UseFormReturn<RuleCreateFormType>,
    sectionTilte: string,
    locked: boolean,
}

export default function RuleCreateFormalization({form, sectionTilte, locked}: RuleCreateFormalizationProps){
    return (
        <>
            <h2 className="text-xl text-primary font-semibold mb-4">
                {sectionTilte}
            </h2>

            <div className="mt-6">
                <TextAreaField
                    id="rule-description"
                    label="Description de la règle"
                    register={form.register("source_text")}
                    error={form.formState.errors.source_text?.message}
                    placeholder="Ex. Si l'article est en matériaux précieux, alors son poids doit être non nul"
                    rows={3}
                    readonly={locked}
                />
            </div>

            <div className="mt-10">
                <TextAreaField
                    id="semi-formal"
                    label="Semi-formel"
                    register={form.register("semi_formal")}
                    error={form.formState.errors.semi_formal?.message}
                    placeholder="Ex. SI famille_article CONTIENT 'OR' ALORS poids_article > 0"
                    rows={7}
                    readonly={locked}
                />
            </div>
        </>
    );
}