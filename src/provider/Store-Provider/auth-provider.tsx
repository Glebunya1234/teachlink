"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";

import { AuthState, AuthStoreApi, createAuthStore } from "@/store/auth-store";

export const AuthStoreContext = createContext<AuthStoreApi | undefined>(
  undefined
);

export const AuthStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AuthStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthState) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext)
    throw new Error(`useAuthStore must be used within AuthStoreProvider`);

  return useStore(authStoreContext, selector);
};
