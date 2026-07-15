import type { JSX } from "react"
import {useNavigation} from "../router/useNavigation.ts";

/**
 * Page 404 plein écran.
 */
function NotFoundPage(): JSX.Element {

    const navigate = useNavigation()
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-6 text-center">
            {/* Illustration */}
            <svg
                className="mb-4 w-[min(360px,80vw)]"
                viewBox="0 0 400 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <rect x="120" y="46" width="130" height="160" rx="12" fill="#fff" stroke="#100F38" strokeWidth="3" />
                <line x1="140" y1="80" x2="230" y2="80" stroke="#d8d5cc" strokeWidth="6" strokeLinecap="round" />
                <line x1="140" y1="104" x2="230" y2="104" stroke="#d8d5cc" strokeWidth="6" strokeLinecap="round" />
                <line x1="140" y1="128" x2="200" y2="128" stroke="#d8d5cc" strokeWidth="6" strokeLinecap="round" />
                <text x="185" y="182" fontFamily="Fraunces, serif" fontSize="54" fontWeight="600" fill="#c9a24b" textAnchor="middle">?</text>
                <circle cx="270" cy="150" r="42" fill="rgba(16,15,56,.04)" stroke="#100F38" strokeWidth="6" />
                <line x1="300" y1="180" x2="330" y2="210" stroke="#100F38" strokeWidth="10" strokeLinecap="round" />
            </svg>

            {/* Code */}
            <p className="font-display text-[clamp(64px,11vw,120px)] font-semibold leading-none tracking-tight text-primary">
                404
            </p>

            {/* Titre + message */}
            <h1 className="mt-2 font-display text-2xl font-semibold text-foreground">
                Cette page est introuvable
            </h1>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
                La page que vous cherchez n'existe pas ou a été déplacée. Vérifiez
                l'adresse ou revenez à l'accueil pour évaluer un article.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <button
                    onClick={navigate.toHomePage}
                    className="cursor-pointer inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12l9-9 9 9M5 10v10h14V10" />
                    </svg>
                    Retour à l'accueil
                </button>
                <button
                    onClick={navigate.toRulePage}
                    className="cursor-pointer inline-flex items-center rounded-xl border-[1.5px] border-primary/20 px-6 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                    Consulter les règles
                </button>
            </div>
        </div>
    )
}

export default NotFoundPage;