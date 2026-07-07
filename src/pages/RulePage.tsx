import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Header } from "../components/landingPage/Header.tsx";
import { RuleSearchBar } from "../components/rules/filters/RuleSearchBar.tsx";
import { RuleTable } from "../components/rules/table/RuleTable.tsx";
import LoadingPage from "./LoadingPage.tsx";
import Button from "../ui/Button.tsx";
import type { Rule } from "../lib/types/models/rule.model.ts";
import {useRulesPage} from "../lib/hooks/useRulePage.ts";
import {RuleSideFilters} from "../components/rules/filters/RuleSideFilter.tsx";
import {RuleTableFooter} from "../components/rules/table/RuleTabFooter.tsx";


function RulePage(): JSX.Element {
    const navigate = useNavigate();
    const { ui, data, actions } = useRulesPage();

    if (ui.isLoading) {
        return <LoadingPage
            title="Règles métier"
            message="Chargement des règles de contrôle qualité"
        />;
    }

    const openRule = (ruleId: string) => navigate(`/rule/details/${ruleId}`);
    const editRule = (ruleId: string) => navigate(`/rule/edit/${ruleId}`);
    const toggleActive = (rule: Rule) =>  {console.log(rule)}; // placeholder branché plus tard

    return (
        <>
            <Header />
            <main className="mx-auto max-w-340 px-5 pb-16 sm:px-8">
                {/* Titre + action */}
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <h1 className="font-[Fraunces] text-3xl font-semibold text-foreground">Règles métier</h1>
                        <p className="mt-1 text-muted-foreground">
                            Les règles de contrôle qualité appliquées aux articles.
                        </p>
                    </div>
                    <Button
                        type="button"
                        label="Nouvelle règle"
                        variant="primary"
                        style="solid"
                        rounded="xl"
                        icon={<Plus className="size-4" />}
                        onClick={() => navigate("/rule/new")}
                    />
                </div>

                {/* Deux colonnes : filtres locaux à gauche, contenu à droite */}
                <div className="grid grid-cols-[260px_1fr] gap-6">
                    <aside>
                        <RuleSideFilters
                            filters={ui.localFilters}
                            onFilterChange={actions.setLocalFilters}
                            countPerFilter={data.counts}
                        />
                    </aside>

                    <section className="flex flex-col gap-4">
                        <RuleSearchBar
                            onSearch={actions.handleSearch}
                            onApplyFilters={actions.handleSubmitFilter}
                            onClearFilters={actions.clearServerFilters}
                            activeFilterCount={ui.activeFilterCount}
                        />
                        <RuleTable
                            rules={data.rules}
                            onOpen={openRule}
                            onToggleActive={toggleActive}
                            onEdit={editRule}
                        />
                        <RuleTableFooter
                            page={ui.page}
                            pageCount={ui.pageCount}
                            pageSize={ui.pageSize}
                            total={ui.total}
                            onPageChange={actions.setPage}
                            onPageSizeChange={actions.setPageSize}
                        />
                    </section>
                </div>
            </main>
        </>
    );
}

export default RulePage;