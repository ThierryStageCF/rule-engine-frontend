import React from "react";
import {Routes, Route} from "react-router-dom";
import {AppRouterPaths} from "./appRouterPaths.ts";
import {LandingPage} from "./routes.lazy.ts";





export function AppRouter() {


    return (
        <React.Suspense fallback={null}>
            <Routes>
                <Route path={AppRouterPaths.landingPage} element={<LandingPage/>} />
            </Routes>
        </React.Suspense>
    )
}