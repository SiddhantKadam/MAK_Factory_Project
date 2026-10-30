import * as React from "react"
import { cn } from "cn"
import { UploadIcon } from "lucide-react"

type FileDropzoneProps = Omit<React.ComponentProps<"div">, "onDrop"> & {
  onFiles: (files: File[]) => void
  /** Passed to the hidden file input, e.g. ".pdf,.jpg,.png" */
  accept?: string
  multiple?: boolean
  disabled?: boolean
  /** Line under the icon — "PDF, JPG, PNG — max 20 MB" */
  hint?: React.ReactNode
}

/**
 * Dashed drop area with click-to-browse. `children` render below the hint —
 * use it for a document-type Select and an Upload button.
 */
function FileDropzone({
  onFiles,
  accept,
  multiple,
  disabled,
  hint,
  className,
  children,
  ...props
}: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)

  return (
    <div
      data-slot="file-dropzone"
      data-dragging={dragging || undefined}
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        if (!disabled && e.dataTransfer.files.length) onFiles(Array.from(e.dataTransfer.files))
      }}
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-border px-5 py-5 text-center transition-colors",
        dragging && "border-info bg-info-soft",
        disabled && "opacity-60",
        className
      )}
      {...props}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        aria-label="Choose files to upload"
        className="grid size-11 place-items-center rounded-lg bg-info-soft text-info outline-none hover:bg-info-border/50 focus-visible:ring-3 focus-visible:ring-ring/25 disabled:cursor-not-allowed"
      >
        <UploadIcon className="size-5" />
      </button>
      {hint && <p className="text-[13px] text-muted-foreground">{hint}</p>}
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          if (e.target.files?.length) onFiles(Array.from(e.target.files))
          e.target.value = ""
        }}
      />
      {children && <div className="flex w-full items-center gap-2.5">{children}</div>}
    </div>
  )
}

export { FileDropzone }
