import * as React from "react"
import { cn } from "cn"
import { DownloadIcon, FileTextIcon, FileTypeIcon, ImageIcon, SheetIcon } from "lucide-react"

import { Tag } from "@/components/data-display/tag"
import { Button } from "@/components/ui/button"
import { tones, type Tone } from "@/lib/tones"

type FileKind = "pdf" | "image" | "sheet" | "other"

const kinds: Record<FileKind, { icon: React.ElementType; tone: Tone }> = {
  pdf: { icon: FileTypeIcon, tone: "danger" },
  image: { icon: ImageIcon, tone: "info" },
  sheet: { icon: SheetIcon, tone: "success" },
  other: { icon: FileTextIcon, tone: "neutral" },
}

/** Guess the icon from the file name when `kind` isn't given. */
function kindFromName(name: string): FileKind {
  const ext = name.split(".").pop()?.toLowerCase()
  if (ext === "pdf") return "pdf"
  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext ?? "")) return "image"
  if (["xls", "xlsx", "csv"].includes(ext ?? "")) return "sheet"
  return "other"
}

type FileItemProps = React.ComponentProps<"div"> & {
  name: string
  kind?: FileKind
  /** Document type label, e.g. "WPS", "Setup Photo" */
  tag?: React.ReactNode
  /** Size · uploader · date */
  meta?: React.ReactNode
  onDownload?: () => void
}

/** A document row — icon tile, mono file name, type tag, meta and download. */
function FileItem({ name, kind, tag, meta, onDownload, className, ...props }: FileItemProps) {
  const { icon: Icon, tone } = kinds[kind ?? kindFromName(name)]
  const t = tones[tone]

  return (
    <div data-slot="file-item" className={cn("flex items-start gap-3.5", className)} {...props}>
      <span className={cn("grid size-11 shrink-0 place-items-center rounded-md", t.soft, t.text)}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-mono text-[13px] font-semibold">{name}</span>
          {tag && (
            <Tag variant="soft" shape="square" font="sans" size="sm">
              {tag}
            </Tag>
          )}
        </div>
        {meta && <div className="font-mono text-xs leading-relaxed text-subtle-foreground">{meta}</div>}
      </div>
      {onDownload && (
        <Button variant="ghost" size="icon-sm" onClick={onDownload} aria-label={`Download ${name}`}>
          <DownloadIcon />
        </Button>
      )}
    </div>
  )
}

export { FileItem }
export type { FileKind }
