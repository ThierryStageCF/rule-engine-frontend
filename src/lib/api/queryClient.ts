import {QueryClient, QueryCache, MutationCache} from "@tanstack/react-query";
import {isHTTPError, isNetworkError, isTimeoutError} from "ky";
import {globalErrorState} from "../store/globalErrorStore.ts";

/**
 * Instance TanStack configuré pour rattraper certaines erreurs
 * et pour la gestion du cache.
 */
export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error)=> {
            const globalError = toGlobalError(error);
            if (globalError) {
                globalErrorState.setError(globalError);
            }
        }
    }),
    mutationCache: new MutationCache({
        onError: (error)=> {
            const globalError = toGlobalError(error);
            if (globalError) {
                globalErrorState.setError(globalError);
            }
        }
    }),
    defaultOptions: {
        queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
            retry: 1,
            refetchOnWindowFocus: false,
        }
    }
});


export type GlobalError = {
    status?: number;
    title: string
    message: string
}

/**
 * Fonction utilitaire qui permet de renvoyer des erreurs pouvant être gérées plus globalement
 */
function toGlobalError(error: Error): GlobalError | null {
    /* Capture des erreurs HTTP */
    if(isHTTPError(error)){
        const status = error.response.status;
        if(status>500){
            if(status === 503){
                return {
                    status: status,
                    title: "Connexion à la base de données impossible",
                    message: "Veuillez vérifier que vous êtes connectés au réseau privé de l'entreprise ou au VPN du groupe IMI"
                }
            }
            return {
                status: status,
                title: "Erreur interne",
                message: "Une erreur interne au système est survenue, veuillez réessayer ultérieurement ou contacter un membre du service informatique !"
            }
        }
        return null;
    }
    /* Capture des erreurs de timeout et de connexion internet. */
    if(isTimeoutError(error)){
        return {
            title: "Délai dépassé !",
            message: "Le serveur met trop de temps à répondre. Vérifiez votre connexion."
        }
    }
    if (isNetworkError(error)) {
        return {
            title: "Pas de connexion internet",
            message: "Impossible de joindre le serveur. Vérifiez votre connexion internet."
        }
    }
    return null;
}

