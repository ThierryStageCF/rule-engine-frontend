import type {JSX} from "react";
import {CheckCircle2} from "lucide-react";
import BaseModal from "../../layouts/BaseModal.tsx";

export type SuccessModalProps = {
    open: boolean;
    message: string;
    onClose: () => void;
};

/**
 * Modale de rétroaction de succès : affiche un message unique passé en paramètre.
 */
export default function SuccessModal({open, message, onClose}: SuccessModalProps): JSX.Element {
    return (
        <BaseModal
            open={open}
            title="Succès"
            icon={<CheckCircle2 className="size-5"/>}
            onClose={onClose}
        >
            <div className="flex justify-center items-center py-5 px-4 text-center">
                <p className="text-foreground">{message}</p>
            </div>
        </BaseModal>
    );
}