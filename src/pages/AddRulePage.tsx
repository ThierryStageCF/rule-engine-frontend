import type {JSX} from "react";
import {Header} from "../components/landingPage/Header.tsx";
import Button from "../ui/Button.tsx";
import {Footer} from "../components/landingPage/Footer.tsx";
import {useRuleCreatePage} from "../lib/hooks/ruleCreatePage/useRuleCreatePage.ts";
import RuleCreateHeader from "../components/ruleCreate/RuleCreateHeader.tsx";
import RuleCreateMetaData from "../components/ruleCreate/RuleCreateMetaData.tsx";
import RuleCreateFormalization from "../components/ruleCreate/RuleCreateFormalization.tsx";
import BaseModal from "../layouts/BaseModal.tsx";
import SuccessModal from "../components/modals/SuccessModal.tsx";
import DataLoader from "../ui/DataLoader.tsx";

function AddRulePage(): JSX.Element {

    const {form, actions, data, ui} = useRuleCreatePage();
    return (
        <div className="min-h-screen bg-background">
            <Header/>
            <main className="mx-auto max-w-360.75 min-w-0 flex flex-col flex-1 pb-24 pt-10 px-20">
                <RuleCreateHeader/>
                <section>
                    <form className="mt-5 flex gap-2" onSubmit={form.handleSubmit(actions.submitCreate)}>
                        <div className="w-1/2 flex flex-col gap-4 border-r-2 px-10">
                            <RuleCreateMetaData
                                form={form}
                                sectionTilte="Métadonnées de la règle"
                                createdRule={data.createdRule}
                                locked={ui.isCreated}
                            />
                        </div>
                        <div className="w-1/2 px-10">
                            <RuleCreateFormalization
                                form={form}
                                sectionTilte="Formalisation"
                                locked={ui.isCreated}
                            />
                            <div className="flex items-end justify-end mt-5">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    rounded="xl"
                                    label="Créer la règle"
                                    disabled={ui.isCreated}
                                />
                            </div>
                        </div>
                    </form>
                </section>
            </main>
            <Footer/>
            <DataLoader isLoading={ui.isPending}/>
            <SuccessModal
                open={ui.canOpenSuccessModal}
                message="Nouvelle règle métier enregistrée avec succès, veuillez la consulter !"
                onClose={() => actions.setCanOpenSuccessModal(false)}
            />
            <BaseModal
                open={ui.canOpenErrorModal}
                title={"Erreurs"}
                onClose={()=> actions.setCanOpenErrorModal(false)}
            >
                <div className="flex flex-col justify-center items-center py-5 px-4">
                    {data.errors.map((error, index) => (
                        <p key={index}>{error.message}</p>
                    ))}
                </div>
            </BaseModal>
        </div>
    )
}

export default AddRulePage;