import {useNavigate} from "react-router-dom";
import {AppRouterPaths} from "./appRouterPaths.ts";
import type {Rule} from "../lib/types/models/rule.model.ts";

/**
 * Hook custom, chargé de la gestion de la navigation au sein de l'application de façon centralisée.
 */
export function useNavigation() {

    const navigate = useNavigate();

    function navigateWithState(url:string, params?: string, state?: object){
        let finalUrl = url;
        if(params)
            finalUrl = `${finalUrl}/${params}`;
        return navigate(finalUrl, {
            state: state,
        });
    }
    return {
        toHomePage: ()=>  navigateWithState(AppRouterPaths.landingPage),
        toRulePage: ()=> navigateWithState(AppRouterPaths.rulePage),
        toDocumentationPage:  ()=> navigateWithState(AppRouterPaths.documentationPage),
        toEvaluationResultPage: (codeArticle: string, state?: object)=> navigateWithState("/evaluation-result" , codeArticle, state),
        toRuleDetailsPage: (ruleId: string, rule?: Rule)=> navigateWithState("/rule/details", ruleId, rule),
        toNewRulePage: ()=> navigate(AppRouterPaths.addRulePage),
        toUpdateRulePage: (ruleId: string, rule?: Rule)=> navigateWithState("/rule/edit", ruleId, rule),
        back: ()=> navigate(-1),
        reload: ()=> window.location.reload(),
    }
}