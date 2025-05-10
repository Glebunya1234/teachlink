import { Students } from "@/gen/Students"
import { PathPJ } from "@/utils/path"

export const StudentQuery = (accessToken?: string): Students => {
    if (accessToken) {
        return new Students({
            baseURL: PathPJ.baseURL,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
    return new Students({
        baseURL: PathPJ.baseURL,
    });
}