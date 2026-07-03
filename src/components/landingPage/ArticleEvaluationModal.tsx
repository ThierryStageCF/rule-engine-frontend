import { ScanSearch } from "lucide-react"
import InputField from "../../ui/InputField.tsx";
import BaseModal from "../modals/BaseModal.tsx";
import {useArticleEvaluation} from "../../lib/hooks/useArticleEvaluation.ts";
import Button from "../../ui/Button.tsx";

type EvaluateModalProps = {
    open: boolean
    onClose: () => void
}

export function EvaluateModal({ open, onClose }: EvaluateModalProps) {
    const {zodParams, isLoading, axiosErrors} = useArticleEvaluation();
    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Évaluer un article"
            subtitle="Saisissez le code de l&apos;article à contrôler. Le moteur vérifiera sa conformité au regard des règles métier en vigueur."
            icon={<ScanSearch className="size-5" />}
        >
            <form onSubmit={zodParams.handleSubmit(zodParams.handleEvaluateArticle)}>
                {axiosErrors && <p className="text-red-500 font-semibold text-sm mb-5">{axiosErrors.code_article}</p>}
                <InputField
                    id="code_article"
                    placeholder="ex. 0154685"
                    register={zodParams.register && zodParams.register("article_code")}
                    error={ zodParams.errors?.article_code?.message}
                />
                {/* Actions */}
                <div className="mt-6 flex items-center justify-end gap-3">
                    <Button
                        type="button"
                        color="transparent"
                        textColor="muted-foreground"
                        colorHover="muted"
                        textHoverColor="foreground"
                        label="Annuler"
                        onclick={()=> {
                            zodParams.reset();
                            onClose();
                        }}
                    />
                    <Button
                        type="submit"
                        disabled={isLoading}
                        label="Evaluer"
                    />
                </div>
            </form>
        </BaseModal>
    )
}