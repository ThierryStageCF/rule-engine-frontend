import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ruleServerFiltersSchema, type RuleServerFiltersFormType } from "../../types/schema/ruleServerFiltersSchema.ts";

/**
 * @summary Formulaire des filtres serveur (menu entonnoir). Valide via Zod, puis
 * remonte les filtres validés à onApply (le handleSubmitFilter du hook de page).
 */
export function useRuleFilterForm(
    onApply: (filters: RuleServerFiltersFormType) => void,
    onClear: () => void,
) {
    const { register, handleSubmit, control, reset, formState: { errors } } =
        useForm<RuleServerFiltersFormType>({
            resolver: zodResolver(ruleServerFiltersSchema),
            defaultValues: { zones: [], criticalities: [] },
        });

    function handleClear() {
        reset({ zones: [], criticalities: [], active: undefined, author: "", sector: "", client: "", text: "" });
        onClear();
    }

    return {
        form: { register, handleSubmit, control, reset, errors },
        actions: { handleApply: onApply, handleClear },
    };
}