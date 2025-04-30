import { Announcements } from "@/gen/Announcements"
import { PathPJ } from "@/utils/path"

export const AnnouncementsQuery = (accessToken?: string): Announcements => {
    if (accessToken) {
        return new Announcements({
            baseURL: PathPJ.baseURL,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
    return new Announcements({
        baseURL: PathPJ.baseURL,
    });
}
