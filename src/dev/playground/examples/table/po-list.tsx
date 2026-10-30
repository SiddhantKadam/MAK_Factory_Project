import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react"

import { RowActionsMenu } from "@/components/actions/row-actions-menu"
import { PoStatusBadge } from "@/components/data-display/po-status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { samplePurchaseOrders } from "@/dev/playground/sample-data"
import { formatDate, formatINR } from "@/lib/format"

export default function PoListTable() {
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>PO Number</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Client / Vendor</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
            <TableHead>Required Delivery</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {samplePurchaseOrders.map((po) => (
            <TableRow key={po.number}>
              <TableCell className="font-mono text-sm font-semibold">{po.number}</TableCell>
              <TableCell className="font-medium">{po.title}</TableCell>
              <TableCell className="text-muted-foreground">{po.client}</TableCell>
              <TableCell className="text-right font-mono text-sm">{formatINR(po.total)}</TableCell>
              <TableCell className="font-mono text-[13px] text-muted-foreground">{formatDate(po.requiredBy)}</TableCell>
              <TableCell>
                <PoStatusBadge status={po.status} />
              </TableCell>
              <TableCell className="font-mono text-[13px] text-subtle-foreground">{formatDate(po.createdAt)}</TableCell>
              <TableCell className="text-right">
                <RowActionsMenu
                  label={`Actions for ${po.number}`}
                  actions={[
                    { label: "View", icon: EyeIcon, onSelect: () => {} },
                    { label: "Edit", icon: PencilIcon, onSelect: () => {}, disabled: po.status !== "draft" },
                    { label: "Delete", icon: Trash2Icon, onSelect: () => {}, destructive: true, disabled: po.status !== "draft" },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
