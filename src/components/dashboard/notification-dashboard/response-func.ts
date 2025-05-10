// import type { Role } from "@/types/store-types";

// import { NotificationQuery } from "@/quaries/notifications";


// export const NotifResponse = (token?: string, userId?: string, role?: Role) => {
//     if (!userId || !token || !role) return;
//     return NotificationQuery(token).notificationsList({
//         id_entity: userId,
//         for_teacher: role === "tutors",
//     });
// };
// export interface NotificationResponseUpdate {
//     ids: string[];
//     is_read: boolean;
//     token?: string;
//     userId?: string; role?: Role;
// }
// export const NotifResponseUpdate = ({ ids, is_read, role, token, userId }: NotificationResponseUpdate) => {
//     if (!userId || !token || !role || ids.length === 0) return;
//     return NotificationQuery(token).notificationsIdsPartialUpdate({
//         ids,
//         is_read,
//     });
// };