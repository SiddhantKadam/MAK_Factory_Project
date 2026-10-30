import { FileItem } from "@/components/data-display/file-item"

export default function FileItemExample() {
  const download = (name: string) => () => alert(`Download ${name}`)

  return (
    <div className="w-full max-w-sm space-y-5">
      <FileItem
        name="WPS-2026-04.pdf"
        tag="WPS"
        meta="890 KB · Priya Sharma · 13 Jun 2026"
        onDownload={download("WPS-2026-04.pdf")}
      />
      <FileItem
        name="beamline-setup-photo.jpg"
        tag="Setup Photo"
        meta="1.1 MB · Priya Sharma · 13 Jun 2026"
        onDownload={download("beamline-setup-photo.jpg")}
      />
      <FileItem name="opening-stock-PUN.xlsx" meta="42 KB · Stores · 01 Jun 2026" />
    </div>
  )
}
