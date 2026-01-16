import { Reviews } from "@/gen/Reviews";
import { PathPJ } from "@/utils/path"

export const ReviewQuery = (accessToken?: string): Reviews => {
    if (accessToken) {
        return new Reviews({
            baseURL: PathPJ.clientBaseURL,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
    return new Reviews({
        baseURL: PathPJ.clientBaseURL,
    });
}
