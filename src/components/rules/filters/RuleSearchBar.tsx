import { useState, type JSX } from "react";
import { Filter, Search } from "lucide-react";
import type { RuleServerFiltersFormType } from "../../../lib/types/schema/ruleServerFiltersSchema.ts";
import Button from "../../../ui/Button.tsx";
import {RuleServerFilterMenu} from "./RuleServerFilterMenu.tsx";

export type RuleSearchBarProps = {
    onSearch: (text: string) => void;
    onApplyFilters: (filters: RuleServerFiltersFormType) => void;
    onClearFilters: () => void;
    activeFilterCount: number;
};

export function RuleSearchBar(
    {
        onSearch,
        onApplyFilters,
        onClearFilters,
        activeFilterCount,
    }: RuleSearchBarProps): JSX.Element {

    const [text, setText] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="flex items-center gap-3">
            <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <input
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={(event) => { if (event.key === "Enter") onSearch(text); }}
                    placeholder="Rechercher dans le texte des règles…"
                    className="w-full rounded-lg border border-input py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="relative">
                <Button
                    type="button"
                    label="Filtres"
                    variant="ghost"
                    style="outlined"
                    rounded="lg"
                    icon={<Filter className="size-4" />}
                    onClick={() => setOpen(true)}
                />
                {activeFilterCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                        {activeFilterCount}
                    </span>
                )}
            </div>

            <RuleServerFilterMenu
                open={open}
                onClose={() => setOpen(false)}
                onApply={onApplyFilters}
                onClear={onClearFilters}
            />
        </div>
    );
}