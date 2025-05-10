import { Notifications } from "@/gen/Notifications";
import { PathPJ } from "@/utils/path";

export const NotificationQuery = (accessToken: string): Notifications => {
    return new Notifications({
        baseURL: PathPJ.baseURL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}
