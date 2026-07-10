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
import {useNavigation} from "../../../router/useNavigation.ts";
import type {Rule} from "../../types/models/rule.model.ts";

/**
 * @summary Logique UI de la page de liste des règles : bascule liste complète /
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

    /* Fonction d'activation, désactivation des règles. */
    const {mutate, isPending} = useUpdateRuleMutation();
    const navigate = useNavigation();
    async function toggleRuleActive(rule: Rule) {
        mutate(
            {
                ruleId: rule.id,
                rule: {
                    active: !rule.active,
                },
            },
            {
                onSuccess: () => {
                    navigate.reload();
                },
            },
        );
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
            isPending
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
            toggleRuleActive,
        },
    };
}