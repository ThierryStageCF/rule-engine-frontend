import {Tooltip} from "antd";
import {ArrowLeftCircle} from "lucide-react";
import {useNavigation} from "../../router/useNavigation.ts";
import {type JSX} from "react";

export default function RuleCreateHeader(): JSX.Element {
    const navigate = useNavigation();

    return (
        <div className="mb-8 flex items-end justify-between gap-4">
            <div className="flex gap-5">
                <Tooltip placement="top" title="Page précédente">
                    <button className="cursor-pointer" onClick={navigate.back}>
                        <ArrowLeftCircle className="w-8 h-8"/>
                    </button>
                </Tooltip>
                <div>
                    <h1 className="font-[Fraunces] text-3xl font-semibold text-foreground">Nouvelle règle</h1>
                    <p className="mt-1 text-muted-foreground">
                        Renseignez les informations et la formalisation de la nouvelle règle métier.
                    </p>
                </div>
            </div>
        </div>
    );
}