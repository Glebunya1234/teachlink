import { Experiences } from "@/gen/Experiences"
import { PathPJ } from "@/utils/path"

export const ExperienceQuery = () => {
    return new Experiences({
        baseURL: PathPJ.baseURL,
    })
}