import React from "react";
import {Routes, Route} from "react-router-dom";
import {AppRouterPaths} from "./appRouterPaths.ts";
import {
    DocumentationPage,
    EvaluationResultPage,
    LandingPage,
    NotFoundPage,
    RuleDetailsPage,
    RulePage
} from "./routes.lazy.ts";
import LoadingPage from "../pages/LoadingPage.tsx";






export function AppRouter() {


    return (
        <React.Suspense fallback={<LoadingPage/>}>
            <Routes>
                <Route path={AppRouterPaths.notFoundPage} element={<NotFoundPage/>} />
                <Route path={AppRouterPaths.landingPage} element={<LandingPage/>} />
                <Route path={AppRouterPaths.documentationPage} element={<DocumentationPage/>} />
                <Route path={AppRouterPaths.rulePage} element={<RulePage/>} />
                <Route path={AppRouterPaths.ruleEvaluationResultPage} element={<EvaluationResultPage/>} />
                <Route path={AppRouterPaths.ruleDetailsPage} element={<RuleDetailsPage/>} />
                <Route path={AppRouterPaths.editRulePage} element={<RuleDetailsPage/>} />
                <Route path={AppRouterPaths.addRulePage} element={<RuleDetailsPage/>} />
            </Routes>
        </React.Suspense>
    )
}