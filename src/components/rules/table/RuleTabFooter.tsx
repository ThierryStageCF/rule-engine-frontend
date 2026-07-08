import type { JSX } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../../ui/Button.tsx";

export type RuleTableFooterProps = {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
};

const PAGE_SIZES = [10, 20, 50, 100];

/**
 * @summary Pied du tableau en trois zones : sélecteur par page (gauche),
 * pagination (centre), total des règles (droite).
 */
export function RuleTableFooter(
    {
        page,
        pageCount,
        pageSize,
        total,
        onPageChange,
        onPageSizeChange,
    }: RuleTableFooterProps): JSX.Element {

    const pages = pageWindow(page, pageCount);

    return (
        <div className="flex items-center justify-between gap-4 px-1 py-3 text-sm">
            {/* Gauche : par page */}
            <div className="flex flex-1 items-center gap-2 text-muted-foreground">
                <span className="font-medium">Afficher</span>
                <select
                    value={pageSize}
                    onChange={(event) => onPageSizeChange(Number(event.target.value))}
                    className="rounded-lg border border-input bg-card px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {PAGE_SIZES.map((size) => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                <span className="font-medium">par page</span>
            </div>

            {/* Centre : pagination */}
            <div className="flex items-center gap-1">
                <Button
                    type="button"
                    variant="ghost"
                    style="outlined"
                    size="sm"
                    rounded="md"
                    icon={<ChevronLeft className="size-4" />}
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                />
                {pages.map((entry, index) =>
                    entry === "…" ? (
                        <span key={`gap-${index}`} className="px-2 text-muted-foreground">…</span>
                    ) : (
                        <button
                            key={entry}
                            type="button"
                            onClick={() => onPageChange(entry)}
                            className={`
                                size-9 rounded-md text-sm font-medium transition-colors
                                ${entry === page
                                ? "bg-primary text-primary-foreground"
                                : "text-foreground hover:bg-primary/10"}
                            `}
                        >
                            {entry}
                        </button>
                    ),
                )}
                <Button
                    type="button"
                    variant="ghost"
                    style="outlined"
                    size="sm"
                    rounded="md"
                    icon={<ChevronRight className="size-4" />}
                    disabled={page >= pageCount}
                    onClick={() => onPageChange(page + 1)}
                />
            </div>

            {/* Droite : total */}
            <div className="flex flex-1 justify-end font-semibold">
                {total} règle{total > 1 ? "s" : ""}
            </div>
        </div>
    );
}

/**
 * @summary Fenêtre de numéros de page avec ellipses : toujours la première et la
 * dernière, et un voisinage autour de la page courante.
 */
function pageWindow(page: number, pageCount: number): (number | "…")[] {
    if (pageCount <= 7) {
        return Array.from({ length: pageCount }, (_, index) => index + 1);
    }
    const pages: (number | "…")[] = [1];
    const start = Math.max(2, page - 1);
    const end = Math.min(pageCount - 1, page + 1);
    if (start > 2) pages.push("…");
    for (let current = start; current <= end; current += 1) pages.push(current);
    if (end < pageCount - 1) pages.push("…");
    pages.push(pageCount);
    return pages;
}