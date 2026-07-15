import {useCallback, useEffect, useRef, useState, type JSX, type ReactNode} from "react";
import type {ErrorResponse} from "../types/entities/response.entity.ts";
import { NotificationContext } from "../hooks/useNotification.ts";

/** Durée d'affichage d'un succès ou d'un avertissement avant fermeture automatique (en millisecondes). */
const AUTO_DISMISS_MS = 10_000;


/**
 * Fournit un point unique de notification applicative : un succès et un avertissement
 * courants (fermés automatiquement après un délai, ou manuellement) et une erreur
 * courante (bloquante, fermée manuellement). À monter au-dessus du routeur.
 */
export function NotificationProvider({children}: {children: ReactNode}): JSX.Element {

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [warningMessage, setWarningMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<ErrorResponse[] | null>(null);

    const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const warningTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearSuccessTimer = useCallback(() => {
        if (successTimer.current !== null) {
            clearTimeout(successTimer.current);
            successTimer.current = null;
        }
    }, []);


    const clearWarningTimer = useCallback(() => {
        if (warningTimer.current !== null) {
            clearTimeout(warningTimer.current);
            warningTimer.current = null;
        }
    }, []);

    const dismissSuccess = useCallback(() => {
        clearSuccessTimer();
        setSuccessMessage(null);
    }, [clearSuccessTimer]);

    const dismissWarning = useCallback(() => {
        clearWarningTimer();
        setWarningMessage(null);
    }, [clearWarningTimer]);

    const dismissError = useCallback(() => {
        setErrors(null);
    }, []);

    const notifySuccess = useCallback((message: string) => {
        clearSuccessTimer();
        setSuccessMessage(message);
        successTimer.current = setTimeout(() => {
            setSuccessMessage(null);
            successTimer.current = null;
        }, AUTO_DISMISS_MS);
    }, [clearSuccessTimer]);

    const notifyWarning = useCallback((message: string) => {
        clearWarningTimer();
        setWarningMessage(message);
        warningTimer.current = setTimeout(() => {
            setWarningMessage(null);
            warningTimer.current = null;
        }, AUTO_DISMISS_MS);
    }, [clearWarningTimer]);

    const notifyError = useCallback((nextErrors: ErrorResponse[]) => {
        setErrors(nextErrors);
    }, []);

    /* Nettoyage des minuteurs au démontage du fournisseur. */
    useEffect(() => {
        return () => {
            clearSuccessTimer();
            clearWarningTimer();
        };
    }, [clearSuccessTimer, clearWarningTimer]);

    return (
        <NotificationContext.Provider
            value={{
                successMessage,
                warningMessage,
                errors,
                notifySuccess,
                notifyWarning,
                notifyError,
                dismissSuccess,
                dismissWarning,
                dismissError,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

