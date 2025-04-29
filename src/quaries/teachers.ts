import { Teachers } from "@/gen/Teachers"
import { PathPJ } from "@/utils/path"

export const TeacherQuery = () => {
    return new Teachers({
        baseURL: PathPJ.baseURL,
    })
}
export const TeacherAuthQuery = (accessToken: string) => {
    return new Teachers({
        baseURL: PathPJ.baseURL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
}

