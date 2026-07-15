import type {JSX} from "react";
import {AlertTriangle, CheckCircle2, XCircle} from "lucide-react";
import BaseModal from "../../layouts/BaseModal.tsx";
import Button from "../../ui/Button.tsx";
import {useNotification} from "../../lib/hooks/useNotification.ts";

/**
 * Afficheur global et unique des notifications applicatives : succès (vert),
 * avertissement (orange) et erreur (rouge). Monté une seule fois près de la racine.
 */
export function NotificationCenter(): JSX.Element {

    const {successMessage, warningMessage, errors, dismissSuccess, dismissWarning, dismissError} = useNotification();

    return (
        <>
            {/* Succès : vert, fermé automatiquement après un délai ou via OK / croix. */}
            <BaseModal
                open={successMessage !== null}
                title="Succès"
                accent="success"
                icon={<CheckCircle2 className="size-5"/>}
                onClose={dismissSuccess}
            >
                <div className="flex flex-col items-center gap-6 py-4 px-2 text-center">
                    <p className="text-foreground">{successMessage}</p>
                    <Button
                        type="button"
                        label="OK"
                        variant="success"
                        style="solid"
                        rounded="xl"
                        onClick={dismissSuccess}
                    />
                </div>
            </BaseModal>

            {/* Avertissement : orange, fermé automatiquement après un délai ou via Compris / croix. */}
            <BaseModal
                open={warningMessage !== null}
                title="Avertissement"
                accent="warning"
                icon={<AlertTriangle className="size-5"/>}
                onClose={dismissWarning}
            >
                <div className="flex flex-col items-center gap-6 py-4 px-2 text-center">
                    <p className="text-foreground">{warningMessage}</p>
                    <Button
                        type="button"
                        label="Compris"
                        variant="warning"
                        style="solid"
                        rounded="xl"
                        onClick={dismissWarning}
                    />
                </div>
            </BaseModal>

            {/* Erreur : rouge, bloquante, fermée via Fermer / croix. */}
            <BaseModal
                open={errors !== null}
                title="Une erreur est survenue"
                accent="danger"
                icon={<XCircle className="size-5"/>}
                onClose={dismissError}
            >
                <div className="flex flex-col items-center gap-6 py-4 px-2">
                    <div className="flex flex-col items-center gap-1 text-center">
                        {(errors ?? []).map((error, index) => (
                            <p key={index} className="text-foreground">{error.message}</p>
                        ))}
                    </div>
                    <Button
                        type="button"
                        label="Fermer"
                        variant="danger"
                        style="solid"
                        rounded="xl"
                        onClick={dismissError}
                    />
                </div>
            </BaseModal>
        </>
    );
}