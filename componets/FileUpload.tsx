// components/FileUpload.tsx
import { useRef } from "react";

export default function FileUpload({
  onFileUpload,
}: {
  onFileUpload: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".zip"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files?.[0]) onFileUpload(e.target.files[0]);
        }}
      />
    </div>
  );
}
