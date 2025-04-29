import { Degree } from "@/gen/Degree"
import { Degrees } from "@/gen/Degrees"
import { PathPJ } from "@/utils/path"

export const DegreeQuery = () => {
    return new Degrees({
        baseURL: PathPJ.baseURL,
    })
}
export const DegreeDetailQuery = () => {
    return new Degree({
        baseURL: PathPJ.baseURL,

    })
}