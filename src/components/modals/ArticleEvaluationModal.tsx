import { ScanSearch } from "lucide-react"
import InputField from "../../ui/InputField.tsx";
import Button from "../../ui/Button.tsx";
import {useArticleEvaluationModal} from "../../lib/hooks/useArticleEvaluationModal.ts";
import BaseModal from "../../layouts/BaseModal.tsx";


type EvaluateModalProps = {
    open: boolean
    onClose: () => void
}

export function EvaluateModal({ open, onClose }: EvaluateModalProps) {
    const {form, actions} = useArticleEvaluationModal(onClose);
    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Évaluer un article"
            subtitle="Saisissez le code de l&apos;article à contrôler. Le moteur vérifiera sa conformité au regard des règles métier en vigueur."
            icon={<ScanSearch className="size-5" />}
        >
            <form onSubmit={form.handleSubmit(actions.handleEvaluateArticle)}>
                <div className="mt-1">
                    <InputField
                        id="code_article"
                        placeholder="ex. 0154685"
                        register={form.register && form.register("codeArticle")}
                        error={ form.errors?.codeArticle?.message}
                    />
                </div>
                {/* Actions */}
                <div className="mt-6 flex items-center justify-end gap-3">
                    <Button
                        type="button"
                        label="Annuler"
                        variant="ghost"
                        style="solid"
                        rounded="xl"
                        onClick={()=> {
                            form.reset();
                            onClose();
                        }}
                    />
                    <Button
                        type="submit"
                        label="Evaluer"
                        variant="primary"
                        style="solid"
                        rounded="xl"
                    />
                </div>
            </form>
        </BaseModal>
    )
}