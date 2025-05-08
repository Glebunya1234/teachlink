/* eslint-disable @typescript-eslint/no-explicit-any */


import { NotificationDTO } from "@/gen/data-contracts";
import { Role } from "@/types/store-types";

export const getNotificationMessage = (
    role: Role,
    userName: string | undefined,
    notification: NotificationDTO
) => {
    if (role === "student") {
        return `${userName}! \nA teacher named "${notification.id_teacher.full_name}" wants to contact you.\nTo contact him, use his email or phone number.\nEmail: ${notification.id_teacher.email}\nPhone: ${notification.id_teacher.phone_number}`;
    } else if (role === "tutors") {
        return `${userName}! \nA student named "${notification.id_student.full_name}" wants to contact you.\nTo contact him, use his email or phone number.\nEmail: ${notification.id_student.email}\nPhone: ${notification.id_student.phone_number}`;
    }
    return "";
};

export const handleCheckboxChange = (
    checked: boolean,
    id: string,
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
) => {
    setSelectedIds((prev) =>
        checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
};

export const handleSelectAll = (
    notifications: NotificationDTO[] | undefined,
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
) => {
    const allIds = notifications?.map((n) => n.id);
    setSelectedIds(allIds || []);
};

export const handleMarkAll = async (
    selectedIds: string[],
    is_read: boolean,
    NotifResponseUpdate: (ids: string[], is_read: boolean) => any,
    queryClient: any,
    userId: string | undefined,
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>,

) => {

    if (selectedIds.length === 0) return;

    await NotifResponseUpdate(selectedIds, is_read);
    await queryClient.invalidateQueries({
        queryKey: ["notifications", userId],
    });
    setSelectedIds([]);
};
