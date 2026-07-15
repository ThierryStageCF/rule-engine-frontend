import { useMemo, useState } from "react";
import { isHTTPError } from "ky";
import type {RuleServerFiltersFormType} from "../../types/schema/ruleServerFiltersSchema.ts";
import type {RuleLocalFilters} from "../../types/presentation/rule.model.presentation.ts";
import {DEFAULT_RULES_FILTERS} from "../../utils/constands.ts";
import type {ErrorResponse, ResponseEntity} from "../../types/entities/response.entity.ts";
import {
    normalizeRuleFilters,
    useAllRulesQuery,
    useSearchRulesQuery,
    useUpdateRuleMutation
} from "../../queries/useRulesQuery.ts";
import {buildRuleCounts, filterRulesLocally, sortRulesByZone} from "../../builder/ruleList.builder.ts";
import type {Rule} from "../../types/models/rule.model.ts";
import {useNotification} from "../useNotification.ts";


/**
 * @summary Hook custom assurant la logique UI de la page de liste des règles
 * recherche selon les filtres appliqués, filtres locaux et pagination client.
 */
export function useRulesPage() {

    /* Filtres serveur et locaux appliqués */
    const [localFilters, setLocalFilters] = useState<RuleLocalFilters>(DEFAULT_RULES_FILTERS);
    const [appliedServerFilters, setAppliedFilters] = useState<RuleServerFiltersFormType>({});
    const activeServerFilterCount = Object.keys(normalizeRuleFilters({ ...appliedServerFilters, text: undefined })).length;
    const isSearching = Object.keys(normalizeRuleFilters(appliedServerFilters)).length > 0;

    /* Une seule query active à la fois, via enabled opposé. */
    const allRulesQuery = useAllRulesQuery(!isSearching);
    const searchRulesQuery = useSearchRulesQuery(appliedServerFilters ?? {}, isSearching);
    const activeQuery = isSearching ? searchRulesQuery : allRulesQuery;
    const rules = useMemo(()=> activeQuery.data ?? [], [activeQuery.data]);

    let errors: ErrorResponse[] = []
    if (isHTTPError(activeQuery.error)) {
        const errorData = activeQuery.error?.data as ResponseEntity<null>;
        errors = errorData.errors;
    }

    /* Compteurs de filtres locaux (zone et criticité) et liste filtrée */
    const counts = useMemo(() => buildRuleCounts(rules), [rules]);
    const filteredRules = useMemo(
        () => sortRulesByZone(filterRulesLocally(rules, localFilters)),
        [rules, localFilters],
    );

    /* Découpe de la page courante + pagination */
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const total = filteredRules.length;
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(page, pageCount);
    const pagedRules = useMemo(
        () => filteredRules.slice((currentPage - 1) * pageSize, currentPage * pageSize),
        [filteredRules, currentPage, pageSize],
    );

    /* Gestion des filtres serveurs */
    function handleSubmitFilter(data: RuleServerFiltersFormType) {
        setAppliedFilters(data);
        setPage(1);
    }

    /* Filtre par texte */
    function handleSearch(text: string) {
        setAppliedFilters({
            text: text
        });
        setPage(1);
    }

    async function clearServerFilters() {
        setAppliedFilters({});
        await activeQuery.refetch();
    }


    /* Activation / désactivation d'une règle : demande de confirmation puis envoi. */
    const {notifySuccess, notifyError} = useNotification();
    const {mutate, isPending} = useUpdateRuleMutation();
    const [ruleToToggle, setRuleToToggle] = useState<Rule | null>(null);

    /* Étape 1 : l'utilisateur demande la bascule, on ouvre la confirmation. */
    function requestToggleRuleActive(rule: Rule) {
        setRuleToToggle(rule);
    }

    /* Étape 2 : l'utilisateur confirme, on envoie réellement au backend. */
    function confirmToggleRuleActive() {
        if (!ruleToToggle) {
            return;
        }
        const nextActive = !ruleToToggle.active;
        mutate(
            { ruleId: ruleToToggle.id, rule: { active: nextActive } },
            {
                onSuccess: () => {
                    notifySuccess(`La règle ${ruleToToggle.id} a été ${nextActive ? "activée" : "désactivée"} avec succès.`);
                },
                onError: (error) => {
                    if (isHTTPError(error)) {
                        const err = error.data as ResponseEntity<null>;
                        notifyError(err.errors);
                    }
                },
            },
        );
        setRuleToToggle(null);
    }

    function cancelToggleRuleActive() {
        setRuleToToggle(null);
    }

    return {
        ui: {
            localFilters,
            appliedFilters: appliedServerFilters,
            isSearching,
            isLoading: activeQuery.isLoading,
            isError: activeQuery.isError,
            isRefetching: activeQuery.isRefetching,
            page: currentPage,
            pageSize,
            pageCount,
            total,
            activeServerFilterCount,
            isPending,
            ruleToToggle,
        },
        data: {
            rules: pagedRules,
            counts,
            errors,
        },
        actions: {
            handleSubmitFilter,
            handleSearch,
            clearServerFilters,
            setLocalFilters,
            setPageSize,
            setPage,
            refetch: activeQuery.refetch,
            requestToggleRuleActive,
            confirmToggleRuleActive,
            cancelToggleRuleActive,
        },
    };
}