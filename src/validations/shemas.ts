import { z } from "zod";



export const AuthSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8)
        .max(50, "Password must be at most 50 characters")
        // .refine((value) => /[a-zA-Z]/.test(value), {
        //     message: "The password must contain at least one letter.",
        // }),
});
export type AuthSchemaType = z.infer<typeof AuthSchema>;