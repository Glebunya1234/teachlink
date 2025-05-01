/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient, MutationFunction } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";


interface UseAnnouncementMutationParams {
    token?: string;
    user_id?: string;
    successMessage: string;
    errorMessage: string;
}

export function useAnnouncementMutation<TData, TVariables extends object>(
    mutationFn: MutationFunction<TData, TVariables>,
    { user_id, successMessage, errorMessage }: UseAnnouncementMutationParams
) {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["announcementList", user_id] });
            toast({ title: "Success", duration: 2000, description: successMessage });
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                duration: 2000,
                description: error?.response?.data || errorMessage,
                variant: "destructive",
            });
        },
    });
}
