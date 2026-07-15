import type {JSX} from "react";
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./router/AppRouter.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./lib/api/queryClient.ts";
import {GlobalErrorModal} from "./components/modals/GlobalErrorModal.tsx";
import {NotificationProvider} from "./lib/store/NotificationContext.tsx";
import {NotificationCenter} from "./components/modals/NotificationCenter.tsx";

function App(): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <NotificationProvider>
                <BrowserRouter>
                    <div className="min-h-screen">
                        <AppRouter/>
                    </div>
                </BrowserRouter>
                <GlobalErrorModal/>
                <NotificationCenter/>
            </NotificationProvider>
        </QueryClientProvider>
    )
}
export default App;