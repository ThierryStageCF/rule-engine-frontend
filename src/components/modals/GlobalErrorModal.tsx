import {useGlobalError} from "../../lib/hooks/useGlobalError.ts";
import {globalErrorState} from "../../lib/store/globalErrorStore.ts";
import Button from "../../ui/Button.tsx";
import BaseModal from "../../layouts/BaseModal.tsx";
import {type JSX} from "react";

/**
 * Modal permettant d'afficher des erreurs globales (5XX) et les erreurs réseaux.
 */
export function GlobalErrorModal(): JSX.Element | null {

    const error = useGlobalError();
    if (!error) return null;
    return (
        <BaseModal
            open={true}
            onClose={()=> {globalErrorState.setError(null)}}
            title={error.title}
            subtitle={error.message}
        >
            <div className="w-full flex items-center justify-center">
                <Button
                    variant="danger"
                    rounded="md"
                    label="Fermer"
                    size="md"
                    onClick={()=> {globalErrorState.setError(null)}}
                />
            </div>
        </BaseModal>
    )
}