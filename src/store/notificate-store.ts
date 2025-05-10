import { createStore } from "zustand";

export type BarType = "All" | "New" | "Read";

export interface BarState {
    getActiveBar: BarType;
    setActiveBar: (active: BarType) => void;
}

export const createNotificationBarStore = () => {
    return createStore<BarState>()((set) => ({
        getActiveBar: "All",
        setActiveBar: (active: BarType) => set({ getActiveBar: active }),
    }));
}

export type NotificationBarStoreApi = ReturnType<typeof createNotificationBarStore>;
