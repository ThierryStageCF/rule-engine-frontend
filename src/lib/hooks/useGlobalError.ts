import {useSyncExternalStore} from "react";
import {globalErrorState} from "../store/globalErrorStore.ts";

/**
 *  Hook qui permet d'observer les status d'erreurs réseau entrant dans l'application et notifier
 *  la modale concernée par l'affichage des erreurs globales.
 */
export function useGlobalError() {
    return useSyncExternalStore(
        globalErrorState.subscribe,
        globalErrorState.getError
    )
}