import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    type RuleUpdateDisplayFormType,
    ruleUpdateSchema
} from "../../types/schema/ruleUpdateSchema.ts";
import type {Rule} from "../../types/models/rule.model.ts";
import {useLocation} from "react-router-dom";
import {useUpdateRuleMutation} from "../../queries/useRulesQuery.ts";
import {useState} from "react";
import type {ErrorResponse, ResponseEntity} from "../../types/entities/response.entity.ts";
import {isHTTPError} from "ky";
import {buildRuleDiffs, toRuleUpdateFormType} from "../../types/mappers/ruleUpdate.request.mapper.ts";


/**
 * Hook custom chargé de la gestion de la page des détails et d'édition d'une règle.
 */
export function useRuleDetailsPage(){

    /* Récupération des détails de la règle depuis l'URL. */
    const location = useLocation();
    const [rule, setRule] =useState<Rule>(location?.state as Rule);


    /* Gestion de la soumission du formulaire de mise à jour et des erreurs serveurs. */
    const {mutate, isPending} = useUpdateRuleMutation();
    const [errors, setErrors] = useState<ErrorResponse[]>([]);
    const [canOpenErrorModal, setCanOpenErrorModal] = useState(false);


    /* Gestion du formulaire */
    const form  =  useForm<RuleUpdateDisplayFormType>({
            resolver: zodResolver(ruleUpdateSchema),
            defaultValues:  {
                rule_title: rule.title ?? "",
                author: rule.author ?? "",
                version: rule.version,
                zone: rule.zone,
                criticality: rule.criticality,
                finished_product_only: rule.applyToFinishedProductOnly,
                service: rule.service ?? "",
                sector: rule.sector,
                client: rule.client,
                source_text: rule.sourceText ?? "",
                semi_formal: rule.semiFormel,
                active: rule.active,
                created_at: rule.createdAt.toString(),
                updated_at: rule.lastUpdate?.toString() ?? rule.createdAt.toString()

            },
        });


    function submitUpdates(data: RuleUpdateDisplayFormType){
        console.log(data)
        const diffs = buildRuleDiffs(rule, data);
        if(diffs) {
            const dataToSend = toRuleUpdateFormType(diffs);
            console.log("datatosend", dataToSend);
            mutate({ruleId: rule.id, rule: dataToSend}, {
                onSuccess: data => {
                    setRule(data);
                    form.setValues(data);
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
    }


    return {
        form,
        ui: {
            isPending,
            canOpenErrorModal,
        },
        actions: {
            submitUpdates,
            setCanOpenErrorModal,
        },
        data: {
            rule,
            errors,
        }
    }
}