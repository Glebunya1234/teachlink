import { z } from "zod";

const email = () => z.string().email()
const password = () => z.string().min(8).max(50, "Password must be at most 50 characters")
export const AuthSchema = z.object({
    username: z.string()
        .min(2)
        .max(50)
        .refine(value => /^[a-zA-Zа-яА-Я\s]+$/.test(value), {
            message: "Username must contain only letters and spaces"
        })
        .optional(),
    email: email(),
    password: password(),
    isTeacher: z.enum(["teacher", "student"]).optional()
});





export type AuthSchemaType = z.infer<typeof AuthSchema>;