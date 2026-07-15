import {QueryClient, QueryCache, MutationCache} from "@tanstack/react-query";
import {globalErrorState} from "../store/globalErrorStore.ts";
import {toGlobalError} from "../utils/functions.ts";

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

