"use client";
import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

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
const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filepath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const { toast } = useToast();

  const onError = (err: any) => {
    console.log("Error", err);
    toast({
      title: "image upload error",
      description: `${err} uploaded failed`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "image upload completed",
      description: `${res.filePath} uploaded successfully`,
    });
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
      />
      <Button
        className="upload-btn bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
        {file && <p className="upload-filename">{file.filePath}</p>}
      </Button>
      <p className="text-base text-light-100">upload a file</p>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={200}
          height={200}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
