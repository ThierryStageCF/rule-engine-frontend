import type {JSX} from "react";
import {Header} from "../components/landingPage/Header.tsx";
import Button from "../ui/Button.tsx";
import {Footer} from "../components/landingPage/Footer.tsx";
import {useRuleDetailsPage} from "../lib/hooks/useRuleDetailsPage.ts";
import RuleDetailsHeader from "../components/ruleDetails/RuleDetailsHeader.tsx";
import RuleMetaData from "../components/ruleDetails/RuleMetaData.tsx";
import RuleFormalization from "../components/ruleDetails/RuleFormalization.tsx";
import DataLoader from "../ui/DataLoader.tsx";


/**
 * Composant fonctionnel qui affiche une règle métier en détail, et qui permet de l'éditer au besoin.
 */
function RuleDetailsPage(): JSX.Element {

    const {form, actions, data, ui} = useRuleDetailsPage();
    return (
        <div className="min-h-screen bg-background">
            <Header/>
            <main className="mx-auto max-w-360.75 min-w-0 flex flex-col flex-1 pb-24 pt-10 px-20">
                {/* Titre de la page */}
                <RuleDetailsHeader ruleId={data.rule.id}/>
                <section>
                    <form className="mt-5 flex gap-2" onSubmit={form.handleSubmit(actions.submitUpdates)}>
                        {/* Métadonnées de la règle*/}
                        <div className="w-1/2  flex flex-col gap-4 border-r-2 px-10">
                            <RuleMetaData
                                form={form}
                                sectionTilte="Métadonnées de la règle"
                            />
                        </div>
                        {/*Formalisation de la règle */}
                        <div className="w-1/2   px-10 ">
                            <RuleFormalization
                                form={form}
                                sectionTilte="Formalisation"
                            />
                            <div className="flex items-end justify-end mt-5">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    rounded="xl"
                                    label="Mettre à jour"
                                />
                            </div>
                        </div>
                    </form>
                </section>
            </main>
            <Footer/>
            <DataLoader isLoading={ui.isPending}/>
        </div>
    );
}

export default RuleDetailsPage;