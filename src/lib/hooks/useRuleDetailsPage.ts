import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    type RuleUpdateDisplayFormType,
    ruleUpdateSchema
} from "../types/schema/ruleUpdateSchema.ts";
import type {Rule} from "../types/models/rule.model.ts";
import {useLocation} from "react-router-dom";
import {useUpdateRuleMutation} from "../queries/useRulesQuery.ts";
import {useState} from "react";
import type {ResponseEntity} from "../types/entities/response.entity.ts";
import {isHTTPError} from "ky";
import {buildRuleDiffs, toRuleUpdateFormType} from "../types/mappers/ruleUpdate.request.mapper.ts";
import {useNotification} from "./useNotification.ts";



/**
 * Hook custom chargé de la gestion de la page des détails et d'édition d'une règle.
 */
export function useRuleDetailsPage(){

    /* Notifications applicatives (succès / avertissement / erreur) centralisées. */
    const {notifySuccess, notifyWarning, notifyError} = useNotification();

    /* Récupération des détails de la règle depuis l'URL. */
    const location = useLocation();
    const [rule, setRule] =useState<Rule>(location?.state as Rule);


    /* Gestion de la soumission du formulaire de mise à jour. */
    const {mutate, isPending} = useUpdateRuleMutation();


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
        const diffs = buildRuleDiffs(rule, data);
        if (!diffs) {
            notifyWarning("Aucune modification n'a été détectée sur cette règle. Modifiez au moins un champ afin d'effectuer une mise à jour.");
            return;
        }
        const dataToSend = toRuleUpdateFormType(diffs);
        mutate({ruleId: rule.id, rule: dataToSend}, {
            onSuccess: (updated) => {
                setRule(updated);
                form.setValues(updated);
                notifySuccess(`Règle métier ${updated.id} mise à jour avec succès !`);
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
        },
        actions: {
            submitUpdates,
        },
        data: {
            rule,
        }
    }
}