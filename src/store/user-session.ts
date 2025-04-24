import { User, UserResponse } from '@supabase/supabase-js'
import { create } from 'zustand'

import { FullTeacherTileDTO, StudentDTO } from '@/gen/data-contracts'


export interface IUser {
    role: "tutors" | "student" | null,
    // objec_id: string | null,
    currentUser: FullTeacherTileDTO | StudentDTO | null
    user: User | null
}

interface Types {
    getSessionUser: IUser | null
    setSessionUser: (session: IUser | null) => void
}

const useUserSession = create<Types>()((set) => ({
    getSessionUser: null,
    setSessionUser: (session) => set(() => ({ getSessionUser: session })),
}))
export default useUserSession