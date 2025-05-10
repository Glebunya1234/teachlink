import { Subjects } from "@/gen/Subjects"
import { PathPJ } from "@/utils/path"

export const SubjectQuery = () => {
    return new Subjects({
        baseURL: PathPJ.baseURL,
    })
}