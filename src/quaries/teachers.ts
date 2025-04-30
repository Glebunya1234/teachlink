import { Teachers } from "@/gen/Teachers"
import { PathPJ } from "@/utils/path"

export const TeacherQuery = (accessToken?: string): Teachers => {
    if (accessToken) {
        return new Teachers({
            baseURL: PathPJ.baseURL,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
    return new Teachers({
        baseURL: PathPJ.baseURL,
    });
};
