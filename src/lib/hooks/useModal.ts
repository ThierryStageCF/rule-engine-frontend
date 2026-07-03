import {useEffect, useRef, useState} from "react";


export function useModal() {

    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!open) return
        // Focus the input once the dialog is shown.
        const id = window.setTimeout(() => inputRef.current?.focus(), 50)
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("keydown", onKeyDown)
        document.body.style.overflow = "hidden"
        return () => {
            window.clearTimeout(id)
            document.removeEventListener("keydown", onKeyDown)
            document.body.style.overflow = ""
        }
    }, [open, setOpen])

    return {
        open,
        setOpen,
    }
}