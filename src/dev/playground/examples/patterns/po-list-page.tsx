import { useMemo, useState } from "react"
import { EyeIcon, PencilIcon, PlusIcon } from "lucide-react"

import { RowActionsMenu } from "@/components/actions/row-actions-menu"
import { SegmentedControl } from "@/components/actions/segmented-control"
import { PoStatusBadge, PO_STATUS, type PoStatus } from "@/components/data-display/po-status-badge"
import { EmptyState } from "@/components/feedback/empty-state"
import { DateRangeInput, type DateRange } from "@/components/forms/date-input"
import { SearchInput } from "@/components/forms/search-input"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { sampleClients, samplePurchaseOrders } from "@/dev/playground/sample-data"
import { formatDate, formatINR } from "@/lib/format"

export default function PoListPage() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"all" | PoStatus>("all")
  const [client, setClient] = useState("all")
  const [range, setRange] = useState<DateRange>({ from: "2026-05-01", to: "2026-08-31" })
  const [view, setView] = useState<"list" | "empty">("list")

  const rows = useMemo(() => {
    if (view === "empty") return []
    const q = query.toLowerCase()
    return samplePurchaseOrders.filter(
      (po) =>
        (status === "all" || po.status === status) &&
        (client === "all" || po.client === client) &&
        (!q || po.number.toLowerCase().includes(q) || po.client.toLowerCase().includes(q)) &&
        po.createdAt >= range.from &&
        po.createdAt <= range.to
    )
  }, [query, status, client, range, view])

  const awaiting = samplePurchaseOrders.filter((po) => po.status === "under_review").length

  return (
    <div className="relative w-full space-y-6 pb-16">
      <PageHeader
        title="Purchase Orders"
        description={`${samplePurchaseOrders.length} orders · ${awaiting} awaiting your review`}
        actions={
          <Button size="lg">
            <PlusIcon /> New PO
          </Button>
        }
      />

      <div className="@container overflow-hidden rounded-lg border bg-card shadow-xs">
        <div className="grid gap-3 border-b p-5 @2xl:grid-cols-2 @5xl:grid-cols-[minmax(0,1fr)_170px_210px_auto]">
          <SearchInput
            placeholder="Search by PO number or client…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            aria-label="Search purchase orders"
          />
          <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <SelectTrigger className="w-full" aria-label="Status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {(Object.keys(PO_STATUS) as PoStatus[]).map((s) => (
                <SelectItem key={s} value={s}>
                  {PO_STATUS[s].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={client} onValueChange={setClient}>
            <SelectTrigger className="w-full" aria-label="Client">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All clients</SelectItem>
              {sampleClients.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DateRangeInput value={range} onValueChange={setRange} aria-label="Created between" />
        </div>

        {rows.length === 0 ? (
          <EmptyState
            title={view === "empty" ? "No purchase orders yet" : "No POs match these filters"}
            description={view === "empty" ? "Create your first PO to get started." : "Try clearing a filter or widening the date range."}
            action={view === "empty" ? <Button><PlusIcon /> New PO</Button> : undefined}
          />
        ) : (
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
              {rows.map((po) => (
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
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <SegmentedControl
          floating
          label="View"
          value={view}
          onValueChange={setView}
          options={[
            { value: "list", label: "PO List" },
            { value: "empty", label: "Empty" },
          ]}
        />
      </div>
    </div>
  )
}
