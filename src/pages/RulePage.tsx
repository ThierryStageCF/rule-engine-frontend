import type { JSX } from "react";
import {Filter, Plus} from "lucide-react";
import { Header } from "../components/landingPage/Header.tsx";
import { RuleSearchBar } from "../components/rules/filters/RuleSearchBar.tsx";
import { RuleTable } from "../components/rules/table/RuleTable.tsx";
import LoadingPage from "./LoadingPage.tsx";
import Button from "../ui/Button.tsx";
import type { Rule } from "../lib/types/models/rule.model.ts";
import {RuleSideFilters} from "../components/rules/filters/RuleSideFilter.tsx";
import {RuleTableFooter} from "../components/rules/table/RuleTabFooter.tsx";
import {useRulesPage} from "../lib/hooks/rules/useRulePage.ts";
import {useNavigation} from "../router/useNavigation.ts";


function RulePage(): JSX.Element {
    const navigate = useNavigation();
    const { ui, data, actions } = useRulesPage();

    if (ui.isLoading) {
        return <LoadingPage
            title="Règles métier"
            message="Chargement des règles de contrôle qualité"
        />;
    }

    const toggleActive = (rule: Rule) =>  {console.log(rule)}; // placeholder branché plus tard

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="mx-auto flex w-full max-w-440 gap-10 pb-24 pt-4 px-20">
               <aside className="sticky top-28 hidden w-64 shrink-0 self-start lg:block">
                   <span className="flex gap-2 mt-2  font-semibold mb-4 ">
                        <Filter className="w-6 h-6 mt-1 "/>
                        <p className="text-xl ">Filtres Locaux</p>
                    </span>
                   <RuleSideFilters
                       filters={ui.localFilters}
                       onFilterChange={actions.setLocalFilters}
                       countPerFilter={data.counts}
                   />
               </aside>
               <main className="min-w-0 flex-1 mt-4">
                   {/* Titre de la page */}
                   <div className="mb-8 flex items-end justify-between gap-4">
                       <div>
                           <h1 className="font-[Fraunces] text-3xl font-semibold text-foreground">Règles métier</h1>
                           <p className="mt-1 text-muted-foreground">
                               Consultez toutes les règles métiers écrites par les équipes de Cheval Frères.
                           </p>
                       </div>
                       <Button
                           type="button"
                           label="Nouvelle règle"
                           variant="primary"
                           style="solid"
                           rounded="xl"
                           icon={<Plus className="size-4" />}
                           onClick={() => navigate.toNewRulePage()}
                       />
                   </div>
                   {/* Affichage de la liste des règles*/}
                   <section className="flex flex-col gap-4">
                       <RuleSearchBar
                           onSearch={actions.handleSearch}
                           onApplyFilters={actions.handleSubmitFilter}
                           onClearFilters={actions.clearServerFilters}
                           activeFilterCount={ui.activeFilterCount}
                       />
                       <RuleTable
                           rules={data.rules}
                           onViewRuleDetails={navigate.toRuleDetailsPage}
                           onToggleActive={toggleActive}
                           onEditRule={navigate.toUpdateRulePage}
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
               </main>
            </div>

        </div>
    );
}

export default RulePage;