import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type RuleCreateFormType, ruleCreateSchema} from "../types/schema/ruleCreationSchema.ts";
import {useCreateRuleMutation} from "../queries/useRulesQuery.ts";
import {useState} from "react";
import type {ResponseEntity} from "../types/entities/response.entity.ts";
import type {RuleCreatedDto} from "../types/entities/ruleCreated.dto.ts";
import {isHTTPError} from "ky";
import {useNotification} from "./useNotification.ts";


/**
 * Hook custom chargé de la gestion de la page de création d'une règle métier.
 */
export function useRuleCreatePage(){

    /* Notifications applicatives (succès / erreur) centralisées. */
    const {notifySuccess, notifyError} = useNotification();

    /* Gestion de la soumission du formulaire de création. */
    const {mutate, isPending} = useCreateRuleMutation();

    /* Résultat de création : présent une fois la règle créée. */
    const [createdRule, setCreatedRule] = useState<RuleCreatedDto | null>(null);

    /* Gestion du formulaire */
    const form = useForm<RuleCreateFormType>({
        resolver: zodResolver(ruleCreateSchema),
        defaultValues: {
            rule_title: "",
            author: "",
            service: "",
            sector: "",
            client: [],
            source_text: "",
            semi_formal: "",
        },
    });

    function submitCreateRuleForm(data: RuleCreateFormType){
        mutate(data, {
            onSuccess: (created) => {
                setCreatedRule(created);
                notifySuccess("Nouvelle règle métier enregistrée avec succès, veuillez la consulter !");
            },
            onError: (error) => {
                if (isHTTPError(error)) {
                    const err = error.data as ResponseEntity<null>;
                    notifyError(err.errors);
                }
            }
        });
    }

    return {
        form,
        ui: {
            isPending,
            isCreated: createdRule !== null,
        },
        actions: {
            submitCreate: submitCreateRuleForm,
        },
        data: {
            createdRule,
        }
    }
}