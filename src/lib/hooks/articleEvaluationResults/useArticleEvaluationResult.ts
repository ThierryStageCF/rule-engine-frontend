import {type Location, useLocation} from "react-router-dom";
import type {EvaluationResult, ZoneKey} from "../../types/models/EvaluationResult.ts";
import {useMemo, useState} from "react";
import type {FilterCounts, Filters} from "../../types/presentation/evaluationPresentation.ts";
import {DEFAULT_FILTERS, VERDICT_SECTION_ORDER} from "../../utils/constands.ts";
import {buildLevelGroups} from "../../utils/functions.ts";

export function useArticleEvaluationResult() {

    const location: Location = useLocation();
    const evaluation: EvaluationResult = location.state?.evaluation;

    const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const allEvaluatedRules = useMemo(() =>
            evaluation?.articles.flatMap((a) => a.rules) ?? [], [evaluation]
    );

    const counts: FilterCounts & { criticalFail: number } = useMemo(() => {
        const byZone: Record<ZoneKey, number> = {
            caracteristiques: 0,
            operations: 0,
            gammes: 0,
            client: 0,
            nomenclature: 0,
            article: 0,
            apport: 0
        }
        let fail = 0
        let pass = 0
        let incomplete = 0
        let exempted = 0
        let criticalFail = 0
        for (const r of allEvaluatedRules) {
            if (r.verdict === "FAIL") fail++
            if (r.verdict === "PASS") pass++
            if (r.verdict === "INCOMPLETE") incomplete++
            if (r.exempted) exempted++
            if (r.verdict === "FAIL" && r.criticality === "critique") criticalFail++
            byZone[r.zone]++
        }
        return {
            total: allEvaluatedRules.length,
            fail,
            pass,
            incomplete,
            exempted,
            criticalFail,
            byZone,
        }
    }, [allEvaluatedRules])

    const resultByVerdict = useMemo(() => {
        if (!evaluation) return []
        return VERDICT_SECTION_ORDER.filter((verdict) => filters.verdict === "all" || filters.verdict === verdict)
            .map((verdict) => (
                    {
                        verdict,
                        resultsByLevel: buildLevelGroups(evaluation, verdict, filters)
                    }
                )
            )
    }, [evaluation, filters])



    return {
        management: {
            filters,
            setFilters,
            modalOpen,
            setModalOpen,

        }

    };
}