import { Download } from "lucide-react";
import Card from "../../../ui/Card.tsx";
import Stat from "../../../ui/Stat.tsx";
import Button from "../../../ui/Button.tsx";
import type {JSX} from "react";

type SummaryBannerProps = {
    fail: number;
    pass: number;
    incomplete: number;
    criticalFail: number;
};

/**
 * @summary Composant fonctionnel qui affiche le résumé de l'évaluation sous forme de statistiques.
 * @param fail Nomnbre de règles dont le statut est FAIL
 * @param pass Nomnbre de règles dont le statut est PASS
 * @param incomplete Nomnbre de règles dont le statut est INCOMPLETE
 * @param criticalFail Nomnbre de règles dont le statut est FAIL et la criticité est Critique
 */
export function SummaryBanner(
    {
        fail,
        pass,
        incomplete,
        criticalFail,
    }: SummaryBannerProps): JSX.Element {

    const evaluated: number = fail + pass + incomplete;
    const rate: number = evaluated > 0 ? Math.round((pass / evaluated) * 100) : 0;

    return (
        <Card
            aria-label="Synthèse de l'évaluation"
            variant="primary"
            rounded="xl"
            padding="lg"
        >
            <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
                {/* Zone des statistiques */}
                <div className="flex flex-wrap gap-x-10 gap-y-6">
                    <Stat
                        variant="danger"
                        label="Échecs"
                        value={fail}
                        hint={
                            criticalFail > 0
                                ? `dont ${criticalFail} critique${criticalFail > 1 ? "s" : ""}`
                                : "aucun critique"
                        }
                    />
                    <Stat
                        variant="success"
                        label="Conformes"
                        value={pass}
                    />
                    <Stat
                        variant="warning"
                        label="Incomplètes"
                        value={incomplete}
                    />
                    <Stat
                        variant="primary"
                        label="Taux de conformité"
                        value={`${rate}%`}
                    />
                </div>

                {/* Bouton d'export du rapport complet */}
                <Button
                    type="button"
                    variant="secondary"
                    style="dashed"
                    rounded="xl"
                    size="sm"
                    label="Exporter · bientôt disponible"
                    icon={
                        <Download
                            className="size-4"
                            aria-hidden="true"
                        />
                    }
                    disabled={true}
                />
            </div>
        </Card>
    );
}