"use client";

import { Trash2 } from "lucide-react";
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

interface DeleteDialogProps {
  onConfirm(): void;
}

export const ConfirmDeleteAnnouncement: FC<DeleteDialogProps> = ({
  onConfirm,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 />
        </Button>
      </DialogTrigger>
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
