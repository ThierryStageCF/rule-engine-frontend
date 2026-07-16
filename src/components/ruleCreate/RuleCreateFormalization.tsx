import TextAreaField from "../../ui/TextAreaField.tsx";
import CodeEditorField from "../../ui/CodeEditorField.tsx";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { RuleCreateFormType } from "../../lib/types/schema/ruleCreationSchema.ts";
import {useKeywordsQuery} from "../../lib/queries/useDslKeywordsQuery.ts";

export type RuleCreateFormalizationProps = {
    form: UseFormReturn<RuleCreateFormType>,
    sectionTilte: string,
    locked: boolean,
}

export default function RuleCreateFormalization({form, sectionTilte, locked}: RuleCreateFormalizationProps){

    /* Mots-clés du DSL pour la coloration syntaxique (récupérés une fois, mis en cache). */
    const { data: keywords } = useKeywordsQuery();

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
                <Controller
                    name="semi_formal"
                    control={form.control}
                    render={({ field }) => (
                        <CodeEditorField
                            id="semi-formal"
                            label="Semi-formel"
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={form.formState.errors.semi_formal?.message}
                            placeholder="Ex. SI famille_article CONTIENT 'OR' ALORS poids_article > 0"
                            readonly={locked}
                            keywords={keywords ?? []}
                        />
                    )}
                />
            </div>
        </>
    );
}