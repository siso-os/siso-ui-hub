"use client";

import { useState } from "react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/kibo-ui/dropzone";

export const title = "Multiple file upload";

const Example = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Dropzone
      className="w-full max-w-md"
      maxFiles={5}
      multiple
      onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
      src={files}
    >
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
};

export default Example;
