"use client";

import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/provider/Avatar-Dialog-Provider/avatar-dialog-provider";

interface DeleteDialogProps {
  onConfirm(): void;
}

export const ConfirmDeleteDialog: FC<DeleteDialogProps> = ({
  onConfirm,
}) => {
  const [open, setOpen] = useDialogStore("deleteDialog");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Removal</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button variant="outline">Сancel</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button variant="destructive" onClick={onConfirm}>
              Remove
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
