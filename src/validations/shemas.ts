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

export const ProfileTicherSchema = z.object({
    full_name: z.string()
        .min(2)
        .max(50)
        .refine(value => /^[a-zA-Zа-яА-Я\s]+$/.test(value), {
            message: "Username must contain only letters and spaces"
        })
        .optional(),

    phone_number: z.coerce.number()
        .optional(),


    show_info: z.boolean(),
    price: z.coerce.number()

        .optional(),
    experience: z.string().optional(),

    school_subjects: z.array(z.object({ subject: z.string() })),
    educational_institution: z.string().optional(),
    degree: z.string().optional(),

    year_of_end: z.coerce.number()

        .optional()
        .refine(val => val === undefined || val === null || (!isNaN(val) && val >= 1900), {
            message: "Graduation year must be a number from 1900 and only digits"
        }),

    city: z.string().optional(),
    online: z.boolean(),
    mini_description: z.string().max(500).optional(),
    description: z.string().max(10000).optional(),

    age: z.coerce.number()

        .optional()
        .refine(val => val === undefined || val === null || (/^\d+$/.test(String(val)) && Number(val) >= 18), {
            message: "Age must be a number and at least 18"
        }),

    sex: z.string().optional(),
});


export type ProfileTicherSchemaType = z.infer<typeof ProfileTicherSchema>;
export type AuthSchemaType = z.infer<typeof AuthSchema>;