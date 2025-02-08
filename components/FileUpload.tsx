"use client";
import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (file: string) => void;
}
const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndPoint}/api/auth/imagekit`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(
        `Authentication failed with status ${response.status} ${error}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication failed ${error.message}`);
  }
};
const {
  env: {
    imagekit: { urlEndpoint, publicKey },
  },
} = config;
const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border ",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };
  const onError = (err: any) => {
    console.log("Error", err);
    toast({
      title: `${type} upload error`,
      description: `${err} uploaded failed`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: `${type} upload completed`,
      description: `${res.filePath} uploaded successfully`,
    });
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "Image upload error",
          description: "File size exceeds 20MB",
          variant: "destructive",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "Video upload error",
          description: "File size exceeds 50MB",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        onError={onError}
        onSuccess={onSuccess}
        fileName="test.png"
        ref={ikUploadRef}
        className="hidden"
        useUniqueFileName
        onUploadStart={() => 0}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        accept={accept}
        folder={folder}
      />
      <Button
        className={cn("upload-btn ", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn("text-base text-light-100", styles.placeholder)}>
          {placeholder}
        </p>
        {file && (
          <p className={cn(styles.text, "upload-filename")}>{file.filePath}</p>
        )}
      </Button>
      {progress > 0 && progress < 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file && type === "image" ? (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={200}
          height={200}
        />
      ) : type === "video" ? (
        <IKVideo
          path={file?.filePath}
          className="w-full h-96 rounded-xl"
          controls
        />
      ) : null}
    </ImageKitProvider>
  );
};

export default FileUpload;
