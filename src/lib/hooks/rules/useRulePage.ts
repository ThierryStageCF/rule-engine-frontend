import { useMemo, useState } from "react";
import { isHTTPError } from "ky";
import type {RuleServerFiltersFormType} from "../../types/schema/ruleServerFiltersSchema.ts";
import type {RuleLocalFilters} from "../../types/presentation/rule.model.presentation.ts";
import {DEFAULT_RULES_FILTERS} from "../../utils/constands.ts";
import type {ErrorResponse, ResponseEntity} from "../../types/entities/response.entity.ts";
import {normalizeRuleFilters, useAllRulesQuery, useSearchRulesQuery} from "../../queries/useRulesQuery.ts";
import {buildRuleCounts, filterRulesLocally, sortRules} from "../../builder/ruleList.builder.ts";







/**
 * @summary Logique UI de la page de liste des règles : bascule liste complète /
 * recherche selon les filtres appliqués, filtres locaux et pagination client.
 */
export function useRulesPage() {


    /* Filtres serveur et locaux appliqués */
    const [localFilters, setLocalFilters] = useState<RuleLocalFilters>(DEFAULT_RULES_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<RuleServerFiltersFormType>({});
    const isSearching = Object.keys(normalizeRuleFilters(appliedFilters)).length > 0;


    /* Une seule query active à la fois, via enabled opposé. */
    const allRulesQuery = useAllRulesQuery(!isSearching);
    const searchRulesQuery = useSearchRulesQuery(appliedFilters ?? {}, isSearching);
    const activeQuery = isSearching ? searchRulesQuery : allRulesQuery;
    const rules = useMemo(()=> activeQuery.data ?? [], [activeQuery.data]);

    let errors: ErrorResponse[] = []
    if (isHTTPError(activeQuery.error)) {
        const errorData = activeQuery.error?.data as ResponseEntity<null>;
        errors = errorData.errors;
    }

    /* Compteurs de filtres locaux (zone et criticité) */
    const counts = useMemo(() => buildRuleCounts(rules), [rules]);
    /* Liste affinée localement puis ordonnée. */
    const filteredRules = useMemo(
        () => sortRules(filterRulesLocally(rules, localFilters)),
        [rules, localFilters],
    );



    /* Découpe de la page courante + pagination */
    const [pageSize, setPageSize] = useState<number>(20);
    const [page, setPage] = useState<number>(1);
    const total = filteredRules.length;
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(page, pageCount);
    const pagedRules = useMemo(
        () => filteredRules.slice((currentPage - 1) * pageSize, currentPage * pageSize),
        [filteredRules, currentPage, pageSize],
    );

    /* Entonnoir : remplace les champs structurés, conserve le texte de recherche. */
    function handleSubmitFilter(data: RuleServerFiltersFormType) {
        setAppliedFilters((prev) => ({ ...data, text: prev.text }));
        setPage(1);
    }

    /* Barre de recherche : met à jour le seul champ texte, conserve le reste. */
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

    /* Nombre de filtres serveur actifs, hors texte (pour le badge du bouton). */
    const activeFilterCount = Object.keys(normalizeRuleFilters({ ...appliedFilters, text: undefined })).length;


    return {
        ui: {
            localFilters,
            appliedFilters,
            isSearching,
            isLoading: activeQuery.isLoading,
            isError: activeQuery.isError,
            isRefetching: activeQuery.isRefetching,
            page: currentPage,
            pageSize,
            pageCount,
            total,
            activeFilterCount
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
        },
    };
}