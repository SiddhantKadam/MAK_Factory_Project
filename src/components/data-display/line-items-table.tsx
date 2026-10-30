import { cn } from "cn"
import { Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatINR } from "@/lib/format"

export type LineItem = {
  id: string
  description: string
  qty: number
  unitPrice: number
}

type LineItemsTableProps = {
  items: LineItem[]
  /** When set, cells become inline inputs and rows can be deleted. */
  onChange?: (items: LineItem[]) => void
  className?: string
}

/** Sum of qty × unit price. Exported so forms can show the same total. */
export function lineItemsTotal(items: LineItem[]) {
  return items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
}

const cellInput =
  "h-9 w-full rounded-sm border border-transparent bg-transparent px-2 outline-none hover:border-input focus-visible:border-ring focus-visible:bg-card focus-visible:ring-3 focus-visible:ring-ring/15"

/**
 * PO line items with a total row. Read-only by default (review screens);
 * pass `onChange` for the editable version used in Create / Edit PO.
 */
function LineItemsTable({ items, onChange, className }: LineItemsTableProps) {
  const editable = Boolean(onChange)

  const update = (id: string, patch: Partial<LineItem>) =>
    onChange?.(items.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  const remove = (id: string) => onChange?.(items.filter((item) => item.id !== id))

  return (
    <div className={cn("overflow-hidden rounded-lg border bg-card", className)}>
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="w-24 text-right">Qty</TableHead>
            <TableHead className="w-36 text-right">Unit price</TableHead>
            <TableHead className="w-40 text-right">Amount</TableHead>
            {editable && <TableHead className="w-12" aria-label="Actions" />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className={cn("min-w-48 whitespace-normal", editable && "py-1 pl-3")}>
                {editable ? (
                  <input
                    aria-label="Description"
                    className={cellInput}
                    value={item.description}
                    onChange={(e) => update(item.id, { description: e.target.value })}
                  />
                ) : (
                  item.description
                )}
              </TableCell>
              <TableCell className={cn("text-right font-mono", editable && "py-1")}>
                {editable ? (
                  <input
                    aria-label="Quantity"
                    inputMode="numeric"
                    className={cn(cellInput, "text-right font-mono")}
                    value={item.qty}
                    onChange={(e) => update(item.id, { qty: Number(e.target.value) || 0 })}
                  />
                ) : (
                  item.qty
                )}
              </TableCell>
              <TableCell className={cn("text-right font-mono text-muted-foreground", editable && "py-1")}>
                {editable ? (
                  <input
                    aria-label="Unit price"
                    inputMode="decimal"
                    className={cn(cellInput, "text-right font-mono text-foreground")}
                    value={item.unitPrice}
                    onChange={(e) => update(item.id, { unitPrice: Number(e.target.value) || 0 })}
                  />
                ) : (
                  formatINR(item.unitPrice)
                )}
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatINR(item.qty * item.unitPrice)}
              </TableCell>
              {editable && (
                <TableCell className="pr-3 text-center">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-subtle-foreground hover:text-destructive"
                    aria-label={`Remove ${item.description || "line item"}`}
                    onClick={() => remove(item.id)}
                  >
                    <Trash2Icon />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              Total
            </TableCell>
            <TableCell className="text-right font-mono text-lg font-semibold">
              {formatINR(lineItemsTotal(items))}
            </TableCell>
            {editable && <TableCell />}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export { LineItemsTable }
