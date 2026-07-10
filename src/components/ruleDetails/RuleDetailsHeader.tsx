import {Tooltip} from "antd";
import {ArrowLeftCircle, Plus} from "lucide-react";
import Button from "../../ui/Button.tsx";
import {useNavigation} from "../../router/useNavigation.ts";

export default function RuleDetailsHeader({ruleId}: {ruleId: string}) {
    const navigate = useNavigation();

    return (
        <div className="mb-8 flex  items-end justify-between gap-4">
            <div className="flex gap-5">
                <Tooltip placement="top" title="Page précédente">
                    <button className="cursor-pointer" onClick={navigate.back}>
                        <ArrowLeftCircle className="w-8 h-8"/>
                    </button>
                </Tooltip>
                <div>
                    <h1 className="font-[Fraunces] text-3xl font-semibold text-foreground">Règle {ruleId}</h1>
                    <p className="mt-1 text-muted-foreground">
                        Consultez tous les détails de la règle {ruleId} et éditez la au besoin.
                    </p>
                </div>
            </div>
            <Button
                type="button"
                label="Nouvelle règle"
                variant="primary"
                style="solid"
                rounded="xl"
                icon={<Plus className="size-4" />}
                onClick={() => navigate.toNewRulePage()}
            />
        </div>
    );
}