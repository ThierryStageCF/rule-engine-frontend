import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ruleServerFiltersSchema, type RuleServerFiltersFormType } from "../../types/schema/ruleServerFiltersSchema.ts";


/**
 * @summary Formulaire des filtres serveur (menu entonnoir). Valide via Zod, puis
 * remonte les filtres validés à onApply (le handleSubmitFilter du hook de page).
 */
export function useRuleServerFilterForm(onClear: () => void,) {

   const filterForm = useForm<RuleServerFiltersFormType>({
            resolver: zodResolver(ruleServerFiltersSchema),
            defaultValues: {},
        });

    function handleClear() {
        filterForm.reset({
            zone: "",
            criticality: ""
        });
        onClear();
    }

    return {
        filterForm:{
            ...filterForm,
            errors : filterForm.formState.errors,
        },
        actions: {
            handleClear
        },
    };
}