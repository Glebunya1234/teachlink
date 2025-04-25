import { User } from "@supabase/supabase-js"

import { FullTeacherTileDTO, StudentDTO } from "@/gen/data-contracts"

export interface IUser {
    role: "tutors" | "student" | null,
    // objec_id: string | null,
    currentUser: FullTeacherTileDTO | StudentDTO | null
    user: User | null
}