import { useEffect } from "react";

export function useAutoResizeTextarea(ref: React.RefObject<HTMLTextAreaElement | null>, value: string | undefined) {
    useEffect(() => {
        const textarea = ref.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value, ref]);
}