/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/use-update-announcement.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { AnnouncementsQuery } from "@/quaries";

interface UseUpdateAnnouncementParams {
    token?: string;
    user_id?: string;
    announcement_index: number;
}

export function useUpdateAnnouncement({
    token,
    user_id,
    announcement_index,
}: UseUpdateAnnouncementParams) {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (newData: { id: string; body: any }) => {
            return await AnnouncementsQuery(token).announcementsPartialUpdate(
                newData.id,
                newData.body
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["announcementList", user_id],
            });
            toast({
                title: "Success",
                duration: 2000,
                description: `"Announcement ${announcement_index}" updated successfully.`,
                variant: "default",
            });
        },
        onError: (error: any) => {
            toast({
                title: `Failed to update "Announcement ${announcement_index}".`,
                duration: 2000,
                description: `${error?.response?.data || "Please try again later"}`,
                variant: "destructive",
            });
        },
    });
}
