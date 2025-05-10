import { z } from "zod";

import { ProfileTicherSchema, ProfileStudentSchema } from "@/validations/shemas";

export type TeachStudFormType =
    | z.infer<typeof ProfileTicherSchema>
    | z.infer<typeof ProfileStudentSchema>;