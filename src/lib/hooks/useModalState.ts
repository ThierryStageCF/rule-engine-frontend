import {useEffect, useState} from "react";


export function useModalState() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!isModalOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isModalOpen]);

    return {
        isModalOpen,
        setIsModalOpen,
    }
}