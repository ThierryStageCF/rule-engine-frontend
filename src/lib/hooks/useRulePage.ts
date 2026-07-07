import { useMemo, useState } from "react";
import { isHTTPError } from "ky";
import type {RuleServerFiltersFormType} from "../types/schema/ruleServerFiltersSchema.ts";
import type {RuleLocalFilters} from "../types/presentation/rule.model.presentation.ts";
import {DEFAULT_RULES_FILTERS} from "../utils/constands.ts";
import type {ErrorResponse, ResponseEntity} from "../types/entities/response.entity.ts";
import {buildRuleCounts, filterRulesLocally, sortRules} from "../builder/ruleList.builder.ts";
import {normalizeRuleFilters, useAllRulesQuery, useSearchRulesQuery} from "../queries/useRulesQuery.ts";






const EMPTY_FILTERS: RuleServerFiltersFormType = { zones: [], criticalities: [] };

/**
 * @summary Logique UI de la page de liste des règles : bascule liste complète /
 * recherche selon les filtres appliqués, filtres locaux et pagination client.
 */
export function useRulesPage() {


    /* Filtres serveur appliqués, fusionnés depuis l'entonnoir ET la recherche. */
    const [appliedFilters, setAppliedFilters] = useState<RuleServerFiltersFormType>(EMPTY_FILTERS);
    const isSearching = Object.keys(normalizeRuleFilters(appliedFilters)).length > 0;

    /* Filtres locaux : affinent la liste chargée, sans réseau. */
    const [localFilters, setLocalFilters] = useState<RuleLocalFilters>(DEFAULT_RULES_FILTERS);

    /* Pagination client (le backend paginera plus tard). */
    const [pageSize, setPageSize] = useState<number>(20);
    const [page, setPage] = useState<number>(1);

    /* Une seule query active à la fois, via enabled opposé. */
    const allRulesQuery = useAllRulesQuery(!isSearching);
    const searchRulesQuery = useSearchRulesQuery(appliedFilters ?? EMPTY_FILTERS, isSearching);
    const activeQuery = isSearching ? searchRulesQuery : allRulesQuery;

    const rules = activeQuery.data ?? [];

    let errors: ErrorResponse[] = [];
    if (isHTTPError(activeQuery.error)) {
        const errorData = activeQuery.error?.data as ResponseEntity<null>;
        errors = errorData.errors;
    }

    /* Compteurs des filtres de gauche : sur l'ensemble chargé. */
    const counts = useMemo(() => buildRuleCounts(rules), [rules]);

    /* Liste affinée localement puis ordonnée. */
    const filteredRules = useMemo(
        () => sortRules(filterRulesLocally(rules, localFilters)),
        [rules, localFilters],
    );

    /* Découpe de la page courante. */
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
        setAppliedFilters((prev) => ({ ...prev, text }));
        setPage(1);
    }

    function clearServerFilters() {
        setAppliedFilters(EMPTY_FILTERS);
        setPage(1);
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