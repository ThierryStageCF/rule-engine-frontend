import type {DomainZone} from "../models/evaluationResult.model.ts";

export interface RuleCreatedDto {
    rule_id: string
    version: number
    zone: DomainZone
    active: boolean
    semi_formal: string
}