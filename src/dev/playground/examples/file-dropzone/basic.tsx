import { useState } from "react"

import { FileDropzone } from "@/components/feedback/file-dropzone"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FileDropzoneExample() {
  const [files, setFiles] = useState<File[]>([])
  const [docType, setDocType] = useState("wps")

  return (
    <div className="w-full max-w-sm space-y-3">
      <FileDropzone
        accept=".pdf,.jpg,.jpeg,.png"
        multiple
        hint="PDF, JPG, PNG — max 20 MB"
        onFiles={(picked) => setFiles((prev) => [...prev, ...picked])}
      >
        <Select value={docType} onValueChange={setDocType}>
          <SelectTrigger className="flex-1" aria-label="Document type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wps">WPS</SelectItem>
            <SelectItem value="photo">Setup Photo</SelectItem>
            <SelectItem value="mtc">Mill Test Certificate</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="info" disabled={files.length === 0} onClick={() => setFiles([])}>
          Upload
        </Button>
      </FileDropzone>
      {files.length > 0 && (
        <ul className="space-y-1 font-mono text-xs text-muted-foreground">
          {files.map((f, i) => (
            <li key={i}>
              {f.name} · {(f.size / 1024).toFixed(0)} KB
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
