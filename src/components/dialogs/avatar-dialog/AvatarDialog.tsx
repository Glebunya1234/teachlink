/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2 } from "lucide-react";
import { Upload, X } from "lucide-react";
import { FC, useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { useDialogStore } from "@/provider/Avatar-Dialog-Provider/avatar-dialog-provider";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { ImagesQuery } from "@/quaries/images";

interface IAvatarEditor {
  uid?: string;
  entity: "student" | "teacher";
  token?: string;
}

export const AvatarDialog: FC<IAvatarEditor> = ({ uid, entity, token }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [avatarDialogOpen, setAvatarDialogOpen] =
    useDialogStore("avatarDialog");
  const [loading, setLoading] = useState(false);
  const updateData = useAuthStore((state) => state.updateData);
  const { toast } = useToast();
  const onUpload = useCallback(
    async (
      files: File[],
      {
        onProgress,
        onSuccess,
        onError,
      }: {
        onProgress: (file: File, progress: number) => void;
        onSuccess: (file: File) => void;
        onError: (file: File, error: Error) => void;
      }
    ) => {
      try {
        setLoading(true);
        const uploadPromises = files.map(async (file) => {
          try {
            const totalChunks = 10;
            let uploadedChunks = 0;

            for (let i = 0; i < totalChunks; i++) {
              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 200 + 100)
              );

              uploadedChunks++;
              const progress = (uploadedChunks / totalChunks) * 100;
              onProgress(file, progress);
            }

            await new Promise((resolve) => setTimeout(resolve, 500));
            onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed")
            );
          } finally {
            setLoading(false);
          }
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Unexpected error during upload:", error);
      }
    },
    []
  );
  const onFileReject = useCallback((file: File, message: string) => {
    toast({
      title: "File rejected",
      description: `File ${file.name} was rejected: ${message}`,
      variant: "destructive",
    });
  }, []);

  const handleUpload = async () => {
    try {
      setLoading(true);
      if (!uid || !token) throw new Error("User ID is missing");

      await ImagesQuery(token).imagesPartialUpdate({
        uid: uid,
        avatarFile: files[0],
        for_teacher: entity === "teacher" ? true : false,
      });
      await updateData();
      setFiles([]);
      setAvatarDialogOpen(false);
      toast({
        title: "Success",
        description: "Avatar updated successfully.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Failed to update avatar.",
        description: `${error?.response?.data || "Please try again later"}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={avatarDialogOpen} onOpenChange={setAvatarDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit avatar</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FileUpload
            value={files}
            onValueChange={setFiles}
            onUpload={onUpload}
            onFileReject={onFileReject}
            maxFiles={1}
            maxSize={8 * 1024 * 1024}
            className="w-full max-w-md"
          >
            <FileUploadDropzone>
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex items-center justify-center rounded-full border p-2.5">
                  <Upload className="size-6 text-muted-foreground" />
                </div>
                <p className="font-medium text-sm">Drag & drop files here</p>
                <p className="text-muted-foreground text-xs">
                  Or click to view (max 1 file, up to 8 MB)
                </p>
              </div>
              <FileUploadTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2 w-fit">
                  Browse files
                </Button>
              </FileUploadTrigger>
            </FileUploadDropzone>
            <FileUploadList>
              {files.map((file, index) => (
                <FileUploadItem key={index} value={file} className="flex-col ">
                  <div className="flex w-full justify-between items-center gap-2">
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata className="max-w-[240px]" />
                    <FileUploadItemDelete asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 ml-auto"
                      >
                        <X />
                      </Button>
                    </FileUploadItemDelete>
                  </div>
                  <FileUploadItemProgress />
                </FileUploadItem>
              ))}
            </FileUploadList>
          </FileUpload>
        </div>
        <DialogFooter>
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Loading...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
