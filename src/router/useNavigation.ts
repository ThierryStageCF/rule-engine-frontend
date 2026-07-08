import {useNavigate} from "react-router-dom";
import {AppRouterPaths} from "./appRouterPaths.ts";

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
        toEvaluationResultPage: (codeArticle: string, state?: object)=> navigateWithState("/evaluation-result" , codeArticle, state),
        toRulePage: ()=> navigateWithState(AppRouterPaths.rulePage),
        toDocumentationPage:  ()=> navigateWithState(AppRouterPaths.documentationPage),
        toRuleDetailsPage: (ruleId: string)=> navigateWithState("/rule/details", ruleId),
        toNewRulePage: ()=> navigate(AppRouterPaths.addRulePage),
        toUpdateRulePage: (ruleId: string)=> navigateWithState("/rule/details", ruleId),
    }
}