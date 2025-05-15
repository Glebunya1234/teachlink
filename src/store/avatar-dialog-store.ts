import { createStore } from "zustand";

export interface dialogState {
  dialogs: Record<string, boolean>;
  setState: (key: string, value: boolean) => void;
}

export const DialogStore = () => {
  return createStore<dialogState>()((set) => ({
    dialogs: {},

    setState: (key: string, value: boolean) =>
      set((state) => ({
        dialogs: {
          ...state.dialogs,
          [key]: value,
        },
      })),
  }));
};

export type DialogStoreApi = ReturnType<typeof DialogStore>;
