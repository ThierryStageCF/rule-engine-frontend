import type { JSX } from "react"

interface LoadingScreenProps {
    /** Titre principal — défaut : "Chargement". */
    title?: string
    /** Sous-texte optionnel sous le titre. */
    message?: string
}

/**
 * Écran de chargement plein écran, centré, dans la charte Cheval Frères.
 * Un anneau qui tourne autour d'un bouclier (rappel du hero), avec un
 * titre et des points animés.
 */
export default function LoadingScreen(
    {
      title = "Chargement",
      message = "Veuillez patienter nous chargons la page ....",
    }: LoadingScreenProps): JSX.Element
{
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-9 bg-background">
            {/* Spinner + bouclier */}
            <div className="relative h-24 w-24">
                {/* anneau de fond */}
                <div className="absolute inset-0 rounded-full border-[6px] border-primary/10" />
                {/* anneau animé */}
                <div className="absolute inset-0 animate-spin rounded-full border-[6px] border-transparent border-r-primary border-t-primary" />
                {/* bouclier au centre */}
                <div className="absolute inset-0 grid place-items-center">
                    <svg
                        className="h-9 w-9"
                        viewBox="0 0 128 160"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M64 8 C64 8 100 24 116 28 C116 28 120 84 116 104 C110 130 88 146 64 156 C40 146 18 130 12 104 C8 84 12 28 12 28 C28 24 64 8 64 8 Z"
                            stroke="#100F38"
                            strokeWidth="7"
                            strokeLinejoin="round"
                            fill="none"
                        />
                        <path
                            d="M44 78 L58 94 L86 58"
                            stroke="#100F38"
                            strokeWidth="7.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </svg>
                </div>
            </div>

            {/* Texte */}
            <div className="text-center">
                <p className="font-display text-2xl font-semibold text-primary">
                    {title}
                    <span className="loading-dots" />
                </p>
                {message && (
                    <p className="mt-1.5 text-sm text-muted-foreground">{message}</p>
                )}
            </div>

            {/* points animés — style inline, pas de fichier CSS externe requis */}
            <style>
                {`
                    @keyframes loading-dots {
                      0%   { content: ""; }
                      25%  { content: "."; }
                      50%  { content: ".."; }
                      75%  { content: "..."; }
                      100% { content: ""; }
                    }
                    .loading-dots::after {
                      content: "";
                      animation: loading-dots 1.4s steps(4, end) infinite;
                    }
                `}
            </style>
        </div>
    )
}