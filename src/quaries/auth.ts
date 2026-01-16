import { IsChekedRole } from "@/gen/IsChekedRole"
import { PathPJ } from "@/utils/path"



export const AuthQuery = () => {
    return new IsChekedRole({
        baseURL: PathPJ.clientBaseURL,
    })
}