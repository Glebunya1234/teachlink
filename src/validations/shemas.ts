import { z } from "zod";

const email = () => z.string().email()
const password = () => z.string().min(8).max(50, "Password must be at most 50 characters")
const full_name = () => z.string()
    .min(2)
    .max(50)
    .refine(value => /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]+$/.test(value), {
        message: "Full name must contain only letters and spaces."
    })
    .optional();

const phone_number = () => z.string().regex(/^\+[1-9]\d{1,14}$/,
    'Phone number must be in the format +1234567890').optional()
const defaultStringOptional = () => z.string().optional()



export const BaseProfileSchema = z.object({
    full_name: full_name(),
    phone_number: phone_number(),
    city: defaultStringOptional(),
    sex: defaultStringOptional(),

});

export const ProfileTicherSchema = BaseProfileSchema.extend({
    show_info: z.boolean(),
    price: z.coerce.number()

        .optional(),
    experience: defaultStringOptional(),

    school_subjects: z.array(z.object({ subject: z.string() })),
    educational_institution: defaultStringOptional(),
    degree: defaultStringOptional(),

    year_of_end: z.coerce.number()

        .optional()
        .refine(val => val === undefined || val === null || (!isNaN(val) && val >= 1900), {
            message: "Graduation year must be a number from 1900 and only digits"
        }),

    online: z.boolean(),
    mini_description: z.string().max(500).optional(),
    description: z.string().max(10000).optional(),

    age: z.coerce.number()
        .optional()
        .refine(val => val === undefined || val === null || (/^\d+$/.test(String(val)) && Number(val) >= 18), {
            message: "Age must be a number and at least 18"
        }),

});
export const ProfileStudentSchema = BaseProfileSchema.extend({
    age: z.coerce.number()
        .optional()
        .refine(val => val === undefined || val === null || (/^\d+$/.test(String(val)) && Number(val) > 0), {
            message: "Age must be greater than 0."
        }),
});

export const AuthSchema = z.object({
    username: z.string()
        .min(2)
        .max(50)
        .refine(value => /^[a-zA-Zа-яА-Я\s]+$/.test(value), {
            message: "Full name must contain only letters and spaces."
        })
        .optional(),
    email: email(),
    password: password(),
    isTeacher: z.enum(["teacher", "student"]).optional()
});

export type ProfileStudentSchemaType = z.infer<typeof ProfileStudentSchema>;
export type ProfileTicherSchemaType = z.infer<typeof ProfileTicherSchema>;
export type ProfileBaseSchemaType = z.infer<typeof BaseProfileSchema>;
export type AuthSchemaType = z.infer<typeof AuthSchema>;