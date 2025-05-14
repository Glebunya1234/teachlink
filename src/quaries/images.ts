import { Images } from "@/gen/Images"
import { PathPJ } from "@/utils/path"


export const ImagesQuery = (accessToken?: string): Images => {
    if (accessToken) {
        return new Images({
            baseURL: PathPJ.baseURL,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
    return new Images({
        baseURL: PathPJ.baseURL,
    });
}
