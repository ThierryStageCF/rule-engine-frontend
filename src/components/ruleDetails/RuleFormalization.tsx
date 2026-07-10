import TextAreaField from "../../ui/TextAreaField.tsx";
import type {RuleFormProps} from "./RuleMetaData.tsx";




export default function RuleFormalization({form, sectionTilte}: RuleFormProps){

    return (
        <>
            <h2 className="text-xl text-primary font-semibold mb-4">
                {sectionTilte}
            </h2>

            <div className="mt-6">
                <TextAreaField
                    id=""
                    label="Description de la règle"
                    register={form.register("source_text")}
                    placeholder="Ex. Si l'article est en matériaux précieux, alors son poids doit être non nul"
                    rows={3}
                />

            </div>

            <div className="mt-10">
                <TextAreaField
                    id=""
                    label="Semi-formel"
                    placeholder="Ex. SI famille_article CONTIENT 'OR' ALORS poids_article > 0"
                    register={form.register("semi_formal")}
                    rows={7}
                />

            </div>
        </>
    )
}