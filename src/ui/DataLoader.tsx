import {Loader2} from "lucide-react";

export default function DataLoader({isLoading}: {isLoading: boolean}) {
    if(isLoading)
        return (
            <div className="fixed inset-0 z-100 flex flex-col justify-center gap-5 items-center bg-black/40 backdrop-blur-sm">
                <Loader2 className="animate-spin size-14"/>
                <span className="font-semibold text-xl">Veuillez patienter ... !</span>
            </div>
        )
}