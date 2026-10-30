import { CopyIcon, EyeIcon, PencilIcon, Trash2Icon } from "lucide-react"

import { RowActionsMenu } from "@/components/actions/row-actions-menu"

export default function RowActionsExample() {
  return (
    <RowActionsMenu
      label="Actions for PO-2026-0481"
      actions={[
        { label: "View", icon: EyeIcon, onSelect: () => alert("View") },
        { label: "Edit", icon: PencilIcon, onSelect: () => alert("Edit") },
        { label: "Duplicate", icon: CopyIcon, onSelect: () => alert("Duplicate") },
        { label: "Delete draft", icon: Trash2Icon, destructive: true, onSelect: () => alert("Delete") },
      ]}
    />
  )
}
