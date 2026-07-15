import {createContext, useContext} from "react";
import type {ErrorResponse} from "../types/entities/response.entity.ts";



type NotificationContextValue = {
    successMessage: string | null;
    warningMessage: string | null;
    errors: ErrorResponse[] | null;
    notifySuccess: (message: string) => void;
    notifyWarning: (message: string) => void;
    notifyError: (errors: ErrorResponse[]) => void;
    dismissSuccess: () => void;
    dismissWarning: () => void;
    dismissError: () => void;
};

export const NotificationContext = createContext<NotificationContextValue | null>(null);

/**
 * Hook custom donnant accès au contexte de notification.
 * Il doit être utilisé sous un NotificationProvider.
 */
export function useNotification(): NotificationContextValue {
    const context = useContext(NotificationContext);
    if (context === null) {
        throw new Error("useNotification doit être utilisé à l'intérieur d'un NotificationProvider.");
    }
    return context;
}