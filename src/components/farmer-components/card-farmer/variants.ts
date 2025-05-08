
export const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.2,

        },
    }),
    exit: {
        opacity: 0, scale: 0.8, transition: {
            duration: 0.2,
        },
    },

};