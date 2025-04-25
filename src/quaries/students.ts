import { Students } from "@/gen/Students"
import { PathPJ } from "@/utils/path"

export const StudentQuery = () => {
    return new Students({
        baseURL: PathPJ.baseURL,
    })
}