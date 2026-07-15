import type {JSX} from "react";
import {AlertTriangle} from "lucide-react";
import BaseModal from "../../layouts/BaseModal.tsx";
import Button from "../../ui/Button.tsx";

export type ConfirmModalProps = {
    open: boolean;
    title?: string;
    message: string;
    /** Libellé du bouton de confirmation. Absent = simple avertissement (bouton unique). */
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
    onClose: () => void;
};

/**
 * Modale d'avertissement ou de confirmation, réutilisable.
 * Sans onConfirm : simple avertissement avec un seul bouton de fermeture.
 * Avec onConfirm : demande une confirmation avant d'exécuter une action.
 */
export default function ConfirmModal(
    {
        open,
        title = "Confirmation",
        message,
        confirmLabel,
        cancelLabel = "Annuler",
        onConfirm,
        onClose,
    }: ConfirmModalProps): JSX.Element {

    const isConfirm = onConfirm !== undefined && confirmLabel !== undefined;

    return (
        <BaseModal
            open={open}
            title={title}
            accent="warning"
            icon={<AlertTriangle className="size-5"/>}
            onClose={onClose}
        >
            <div className="flex flex-col gap-6 py-4 px-2">
                <p className="text-center text-foreground">{message}</p>
                <div className={`flex gap-3 ${isConfirm ? "justify-between" : "justify-center"}`}>
                    {isConfirm ? (
                        <>
                            <Button
                                type="button"
                                label={cancelLabel}
                                variant="ghost"
                                style="solid"
                                rounded="xl"
                                onClick={onClose}
                            />
                            <Button
                                type="button"
                                label={confirmLabel}
                                variant="warning"
                                style="solid"
                                rounded="xl"
                                onClick={() => { onConfirm(); onClose(); }}
                            />
                        </>
                    ) : (
                        <Button
                            type="button"
                            label="Compris"
                            variant="warning"
                            style="solid"
                            rounded="xl"
                            onClick={onClose}
                        />
                    )}
                </div>
            </div>
        </BaseModal>
    );
}