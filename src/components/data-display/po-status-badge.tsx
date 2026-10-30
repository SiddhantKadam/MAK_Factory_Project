import { StatusBadge, type StatusBadgeProps } from "@/components/data-display/status-badge"
import type { Tone } from "@/lib/tones"

export type PoStatus =
  | "draft"
  | "under_review"
  | "revision_requested"
  | "approved"
  | "rejected"

/** Single source of truth for how each PO status is labelled and coloured. */
export const PO_STATUS: Record<PoStatus, { label: string; tone: Tone }> = {
  draft: { label: "Draft", tone: "neutral" },
  under_review: { label: "Under Review", tone: "warning" },
  revision_requested: { label: "Revision Requested", tone: "brand" },
  approved: { label: "Approved", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
}

function PoStatusBadge({
  status,
  ...props
}: Omit<StatusBadgeProps, "tone" | "children"> & { status: PoStatus }) {
  const { label, tone } = PO_STATUS[status]
  return (
    <StatusBadge tone={tone} {...props}>
      {label}
    </StatusBadge>
  )
}

export { PoStatusBadge }
