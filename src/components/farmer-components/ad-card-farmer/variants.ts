export const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
        },
    }),
    whileHover: {
        scale: 1.01,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            stiffness: 600,
        },
    },
};