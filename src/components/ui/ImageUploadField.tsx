import { useRef, useState, type ReactNode } from "react";
import { UploadCloud, X } from "lucide-react";
import { cn, getImageSrc } from "@/lib/utils";

interface ImageUploadFieldProps {
  /** Current image path/URL to preview when no new file has been selected. */
  value?: string;
  /** Called with an object URL immediately after a file is chosen, for live preview + form state. */
  onChange: (previewUrl: string, file: File) => void;
  onClear?: () => void;
  shape?: "square" | "circle" | "wide";
  label?: ReactNode;
  helpText?: string;
  className?: string;
}

const shapeClasses: Record<string, string> = {
  square: "aspect-square rounded-xl",
  circle: "aspect-square rounded-full",
  wide: "aspect-video rounded-xl",
};

export function ImageUploadField({
  value,
  onChange,
  onClear,
  shape = "square",
  label = "Upload Image",
  helpText,
  className,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const previewUrl = URL.createObjectURL(file);
    onChange(previewUrl, file);
  }

  return (
    <div className={className}>
      <div
        className={cn(
          "relative mb-3 overflow-hidden border border-gray-200",
          shapeClasses[shape],
          shape === "circle" ? "mx-auto w-28" : "w-full",
        )}
      >
        <img
          src={value?.startsWith("blob:") ? value : getImageSrc(value)}
          alt="Preview"
          className="size-full object-cover"
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="bg-black/60 absolute top-2 right-2 flex size-6 items-center justify-center rounded-full text-white"
            aria-label="Remove image"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "border-gray-tertiary/32 text-gray-secondary hover:border-primary-main hover:text-primary-main flex w-full items-center justify-center gap-2 rounded-lg border border-dashed py-3 text-sm font-medium transition-colors",
          dragOver && "border-primary-main text-primary-main bg-primary-lighter/20",
        )}
      >
        <UploadCloud className="size-4" /> {label}
      </button>
      {helpText && <p className="text-gray-tertiary mt-1.5 text-xs">{helpText}</p>}
    </div>
  );
}
