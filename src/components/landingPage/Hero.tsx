import {type JSX} from "react";
import {Sparkles} from "lucide-react";
import hero_image from "../../assets/hero_panel.png";
import {EvaluateModal} from "./ArticleEvaluationModal.tsx";
import {useModal} from "../../lib/hooks/useModal.ts";
import Button from "../../ui/Button.tsx";


export function Hero(): JSX.Element{

    const modalManagement = useModal();


    return (
        <section className="w-full max-w-7xl flex-1  mx-auto grid grid-cols-1 items-center  px-5 py-8 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:py-0">
            <div className="max-w-xl">
                <div className="inline-flex bg-base  items-center px-4 py-2 rounded-2xl gap-2 border">
                    <Sparkles className="size-3.5 text-ring"/>
                    <span className="text-sm font-medium">Contrôle de conformité industrielle</span>
                </div>

                <h1 className="mt-8 font-display text-5xl font-semibold tracking-tight leading-14">
                    Vérifiez vos articles<br/>
                    contre les <em className="italic text-blue-900">règles métier</em>.
                </h1>

                <p className="mt-5 mb-5 text-md font-medium sm:text-lg text-muted-foreground  leading-relaxed">
                    Le moteur de règles métier de Cheval Frères contrôle la conformité de vos articles industriels selon vos référentiels.
                    Un point d'entrée clair, pensé pour les équipes métier !
                </p>

                <Button
                    type="button"
                    variant="primary"
                    style="solid"
                    label="Evaluer un article"
                    size="xl"
                    rounded="xl"
                    onClick={()=> modalManagement.setOpen(true)}
                />


            </div>

            <img src={hero_image} alt="" className="w-full h-auto max-h-[70vh] object-contain animate-float" />
            <EvaluateModal
                open={modalManagement.open}
                onClose={() => modalManagement.setOpen(false)}
            />
        </section>
    )
}