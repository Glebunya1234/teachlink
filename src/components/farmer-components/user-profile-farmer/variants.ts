const visible =
    (i: number) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            delay: i * .1,
            duration: .1,
            type: "spring",
            stiffness: 50,
        },
    });


export const variantsUserCard = {
    hidden: { opacity: 0, y: -100 },
    visible: visible
};
export const variantsConnectCard = {
    hidden: { opacity: 0, x: 100 },
    visible: visible,
};
export const variantsSubjectCard = {
    hidden: { opacity: 0, x: -100 },
    visible: visible,
};
export const variantsContentCard = {
    hidden: { opacity: 0, y: 100 },
    visible: visible,
};