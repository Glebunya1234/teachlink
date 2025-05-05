"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";

import {
  BarState,
  createNotificationBarStore,
  NotificationBarStoreApi,
} from "@/store/notificate-store";

export const NotificationBarStoreContext = createContext<
  NotificationBarStoreApi | undefined
>(undefined);

export const NotificationStoreProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const storeRef = useRef<NotificationBarStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createNotificationBarStore();
  }

  return (
    <NotificationBarStoreContext.Provider value={storeRef.current}>
      {children}
    </NotificationBarStoreContext.Provider>
  );
};

export const useNotificationBarStore = <T,>(
  selector: (store: BarState) => T
): T => {
  const notificationBarStoreContext = useContext(NotificationBarStoreContext);

  if (!notificationBarStoreContext)
    throw new Error(
      `useNotificationBarStore must be used within NotificationStoreProvider`
    );

  return useStore(notificationBarStoreContext, selector);
};
