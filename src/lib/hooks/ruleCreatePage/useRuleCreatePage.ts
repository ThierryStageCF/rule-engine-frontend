import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type RuleCreateFormType, ruleCreateSchema} from "../../types/schema/ruleCreationSchema.ts";
import {useCreateRuleMutation} from "../../queries/useRulesQuery.ts";
import {useState} from "react";
import type {ErrorResponse, ResponseEntity} from "../../types/entities/response.entity.ts";
import type {RuleCreatedDto} from "../../types/entities/ruleCreated.dto.ts";
import {isHTTPError} from "ky";

/**
 * Hook custom chargé de la gestion de la page de création d'une règle métier.
 */
export function useRuleCreatePage(){

    /* Gestion de la soumission du formulaire de création et des retours serveur. */
    const {mutate, isPending} = useCreateRuleMutation();
    const [errors, setErrors] = useState<ErrorResponse[]>([]);
    const [canOpenErrorModal, setCanOpenErrorModal] = useState(false);

    /* Résultat de création : présent une fois la règle créée. */
    const [createdRule, setCreatedRule] = useState<RuleCreatedDto | null>(null);
    const [canOpenSuccessModal, setCanOpenSuccessModal] = useState(false);

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
        console.log(data)
        mutate(data, {
            onSuccess: (created) => {
                setCreatedRule(created);
                setCanOpenSuccessModal(true);
            },
            onError: (error) => {
                if (isHTTPError(error)) {
                    const err = error.data as ResponseEntity<null>;
                    setErrors(err.errors);
                    setCanOpenErrorModal(true);
                }
            }
        });
    }

    return {
        form,
        ui: {
            isPending,
            canOpenErrorModal,
            canOpenSuccessModal,
            isCreated: createdRule !== null,
        },
        actions: {
            submitCreate: submitCreateRuleForm,
            setCanOpenErrorModal,
            setCanOpenSuccessModal,
        },
        data: {
            errors,
            createdRule,
        }
    }
}