import { PoStatusBadge, PO_STATUS, type PoStatus } from "@/components/data-display/po-status-badge"
import { StatusBadge } from "@/components/data-display/status-badge"

export default function StatusBadgeVariants() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">PO statuses — use PoStatusBadge so labels stay consistent</p>
        <div className="flex flex-wrap gap-3">
          {(Object.keys(PO_STATUS) as PoStatus[]).map((status) => (
            <PoStatusBadge key={status} status={status} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Generic tones</p>
        <div className="flex flex-wrap gap-3">
          <StatusBadge tone="info">In Progress</StatusBadge>
          <StatusBadge tone="success">Received</StatusBadge>
          <StatusBadge tone="warning">Due</StatusBadge>
          <StatusBadge tone="danger">Overdue</StatusBadge>
          <StatusBadge tone="neutral" dot={false}>No dot</StatusBadge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Outline — role chips</p>
        <div className="flex flex-wrap gap-3">
          <StatusBadge appearance="outline" tone="info">Finance Officer</StatusBadge>
          <StatusBadge appearance="outline" tone="success">General Manager</StatusBadge>
          <StatusBadge appearance="outline" tone="brand">Admin</StatusBadge>
        </div>
      </div>
    </div>
  )
}
