import { Loader2, RefreshCw, ScanSearch } from "lucide-react";
import Button from "../../ui/Button.tsx";

type ResultHeaderProps = {
    code: string;
    designation: string;
    reevaluating: boolean;
    onReevaluate: () => void;
    onNewArticle: () => void;
};

export function ResultsHeader({code, designation, reevaluating, onReevaluate, onNewArticle}: ResultHeaderProps) {
    return (
        <div>
            <div className=" flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-4 sm:px-6 lg:px-8">
                <div className="min-w-0">
                    <h1
                        className="font-semibold tracking-wide text-primary text-2xl"
                    >
                        Résultat d&apos;évaluation
                    </h1>
                    <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <h2 className="text-md font-semibold text-muted-foreground text-balance">
                            Article {code} : {designation}
                        </h2>

                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <Button
                        icon = {<ScanSearch className="size-4" aria-hidden="true" />}
                        onClick={onNewArticle}
                        label=" Évaluer un autre article"
                        variant="primary"
                        style="outlined"
                        rounded="xl"
                    >
                    </Button>
                    <Button
                        icon={
                            reevaluating ? (
                                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                                ) : (
                                    <RefreshCw className="size-4" aria-hidden="true" />
                                )
                        }
                        onClick={onReevaluate}
                        disabled={reevaluating}
                        variant="primary"
                        style="solid"
                        rounded="xl"
                        label={reevaluating ? "Réévaluation…" : "Réévaluer"}
                    />
                </div>
            </div>
        </div>
    );
}