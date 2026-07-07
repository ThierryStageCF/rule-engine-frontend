import type {GlobalError} from "../api/queryClient.ts";


type ErrorListener = () => void;

let listeners: Array<ErrorListener> = [];
let currentError: GlobalError| null = null;


/**
 * Composant observable, dont des composants écouteurs souscrivent, et le composant observé dépose des informations
 */
export const globalErrorState = {
    subscribe(callback: ErrorListener) {
        listeners.push(callback);
        return () => {
            listeners = listeners.filter((listener) => listener !== callback);
        }
    },

    setError(error: GlobalError | null) {
        currentError = error;
        listeners.forEach(listener=> listener());
    },

    getError(){
        return currentError;
    }
}