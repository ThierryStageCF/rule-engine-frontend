import type {
    ZoneResults,
} from "../types/presentation/evaluation.model.presentation.ts";
import {isHTTPError, isNetworkError, isTimeoutError} from "ky";
import type {GlobalError} from "../types/entities/response.entity.ts";



export function zoneCount(zones: ZoneResults[]): number {
    return zones.reduce((s, z) => s + z.results.length, 0)
}

export function isEmpty(object: object): boolean {
    return Object.keys(object).length === 0;
}

/**
 * Fonction utilitaire qui permet de renvoyer des erreurs pouvant être gérées plus globalement
 */
export function toGlobalError(error: Error): GlobalError | null {
    /* Capture des erreurs HTTP */
    if(isHTTPError(error)){
        const status = error.response.status;
        if(status>=500){
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
    else if(isTimeoutError(error)){
        return {
            title: "Délai dépassé !",
            message: "Le serveur met trop de temps à répondre. Vérifiez votre connexion."
        }
    }
    else if (isNetworkError(error)) {
        return {
            title: "Pas de connexion internet",
            message: "Impossible de joindre le serveur. Vérifiez votre connexion internet."
        }
    }
    return null;
}
