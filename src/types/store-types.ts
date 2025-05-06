import { Session, User } from "@supabase/supabase-js"

import { FullTeacherTileDTO, StudentDTO } from "@/gen/data-contracts"
export type Role = "tutors" | "student" | null | undefined;
export interface IUser {
    role: Role
    // objec_id: string | null,
    currentUser: FullTeacherTileDTO | StudentDTO | null
    user: User | null
    session: Session | null
}