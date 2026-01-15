// "use client";
// import {
//   createContext,
//   FC,
//   PropsWithChildren,
//   useContext,
//   useRef,
// } from "react";
// import { useStore } from "zustand";

// import { DialogStoreApi, DialogStore } from "@/store/avatar-dialog-store";

// export const DialogStoreContext = createContext<DialogStoreApi | undefined>(
//   undefined
// );

// export const DialogStoreProvider: FC<PropsWithChildren> = ({ children }) => {
//   const storeRef = useRef<DialogStoreApi | null>(null);

//   if (storeRef.current === null) {
//     storeRef.current = DialogStore();
//   }

//   return (
//     <DialogStoreContext.Provider value={storeRef.current}>
//       {children}
//     </DialogStoreContext.Provider>
//   );
// };

// export const useDialogStore = (
//   key: string
// ): [boolean, (value: boolean) => void] => {
//   const context = useContext(DialogStoreContext);

//   if (!context)
//     throw new Error("useDialogStore must be used within DialogStoreProvider");

//   const isOpen = useStore(context, (state) => state.dialogs[key] ?? false);
//   const setOpen = (value: boolean) => context.getState().setState(key, value);

//   return [isOpen, setOpen];
// };
