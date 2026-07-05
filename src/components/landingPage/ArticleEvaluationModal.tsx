import { ScanSearch } from "lucide-react"
import InputField from "../../ui/InputField.tsx";
import BaseModal from "../modals/BaseModal.tsx";
import Button from "../../ui/Button.tsx";
import {useArticleEvaluationModal} from "../../lib/hooks/useArticleEvaluationModal.ts";


type EvaluateModalProps = {
    open: boolean
    onClose: () => void
}

export function EvaluateModal({ open, onClose }: EvaluateModalProps) {
    const {zodParams, isLoading, axiosErrors} = useArticleEvaluationModal();
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
                        label="Annuler"
                        variant="ghost"
                        style="solid"
                        rounded="xl"
                        onClick={()=> {
                            zodParams.reset();
                            onClose();
                        }}
                    />
                    <Button
                        type="submit"
                        label="Evaluer"
                        variant="primary"
                        style="solid"
                        rounded="xl"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </BaseModal>
    )
}