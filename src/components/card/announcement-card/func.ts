import { CreateAnnouncementDTO, UpdateAnnouncementDTO } from "@/gen/data-contracts";
import { useAnnouncementMutation } from "@/hooks/use-announcement-mutations";
import { AnnouncementsQuery } from "@/quaries";


export const useCreateAnnouncement = ({ token, user_id }: { token?: string; user_id?: string }) => {
    return useAnnouncementMutation(
        (data: { body: CreateAnnouncementDTO }) => AnnouncementsQuery(token).announcementsCreate(data.body),
        {
            token,
            user_id,
            successMessage: "Announcement created successfully.",
            errorMessage: "Failed to create announcement.",
        }
    );
};


export const useUpdateAnnouncement = ({
    token,
    user_id,
    announcement_index,
}: {
    token?: string;
    user_id?: string;
    announcement_index: number;
}) => {
    return useAnnouncementMutation(
        (data: { id: string; body: UpdateAnnouncementDTO }) =>
            AnnouncementsQuery(token).announcementsPartialUpdate(data.id, data.body),
        {
            token,
            user_id,
            successMessage: `Announcement ${announcement_index} updated successfully.`,
            errorMessage: `Failed to update Announcement ${announcement_index}.`,
        }
    );
};


export const useRemoveAnnouncement = ({ token, user_id }: { token?: string; user_id?: string }) => {
    return useAnnouncementMutation(
        (data: { id: string }) => AnnouncementsQuery(token).announcementsDelete(data.id),
        {
            token,
            user_id,
            successMessage: "Announcement removed successfully.",
            errorMessage: "Failed to delete announcement.",
        }
    );
};
