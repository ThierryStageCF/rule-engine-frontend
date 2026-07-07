import type {
    ZoneResults,
} from "../types/presentation/evaluation.model.presentation.ts";


export function zoneCount(zones: ZoneResults[]): number {
    return zones.reduce((s, z) => s + z.results.length, 0)
}

