import type {RuleUpdateDisplayFormType, RuleUpdateFormType} from "../schema/ruleUpdateSchema.ts";
import type {Rule} from "../models/rule.model.ts";
import {isEmpty} from "../../utils/functions.ts";

export function toRuleUpdateFormType(data: RuleUpdateDisplayFormType): RuleUpdateFormType {

    const dto: RuleUpdateFormType = {};
    if ("semi_formal" in data) {
        dto.semi_formal = data.semi_formal;
    }

    if ("rule_title" in data) {
        dto.rule_title = data.rule_title;
    }

    if ("zone" in data) {
        dto.zone = data.zone;
    }

    if ("criticality" in data) {
        dto.criticality = data.criticality;
    }

    if ("source_text" in data) {
        dto.source_text = data.source_text;
    }

    if ("author" in data) {
        dto.author = data.author;
    }

    if ("service" in data) {
        dto.service = data.service;
    }

    if ("sector" in data) {
        dto.sector = data.sector;
    }

    if ("client" in data) {
        dto.client = data.client;
    }

    if ("finished_product_only" in data) {
        dto.finished_product_only = data.finished_product_only;
    }

    if ("active" in data) {
        dto.active = data.active;
    }
    return dto;
}


export function buildRuleDiffs(original: Rule, data: RuleUpdateDisplayFormType): Partial<RuleUpdateDisplayFormType>|null {

    const patch: Partial<RuleUpdateFormType> = {};

    if (original.semiFormel !== data.semi_formal) {
        patch.semi_formal = data.semi_formal;
    }

    if ((original.title ?? "") !== data.rule_title) {
        patch.rule_title = data.rule_title;
    }

    if (original.zone !== data.zone) {
        patch.zone = data.zone;
    }

    if (original.criticality !== data.criticality) {
        patch.criticality = data.criticality;
    }

    if ((original.sourceText ?? "") !== data.source_text) {
        patch.source_text = data.source_text;
    }

    if ((original.author ?? "") !== data.author) {
        patch.author = data.author;
    }

    if ((original.service ?? "") !== data.service) {
        patch.service = data.service;
    }

    if ((original.sector ?? "") !== data.sector) {
        console.log(original.sector);
        patch.sector = data.sector;
    }

    if (JSON.stringify(original.client) !== JSON.stringify(data.client)) {
        patch.client = data.client;
    }

    if (original.applyToFinishedProductOnly !== data.finished_product_only) {
        patch.finished_product_only = data.finished_product_only;
    }

    if (original.active !== data.active) {
        patch.active = data.active;
    }
    return isEmpty(patch) ? null : patch;
}