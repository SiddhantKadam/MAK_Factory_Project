import type { LineItem } from "@/components/data-display/line-items-table"
import type { PoStatus } from "@/components/data-display/po-status-badge"

/** Demo data for playground examples only — mirrors the UX screens. */

export type SamplePo = {
  number: string
  title: string
  client: string
  total: number
  requiredBy: string
  status: PoStatus
  createdAt: string
}

export const samplePurchaseOrders: SamplePo[] = [
  { number: "PO-2026-0481", title: "Structural beams — Bay 4", client: "Acme Infrastructure Ltd.", total: 1849200, requiredBy: "2026-07-15", status: "under_review", createdAt: "2026-06-02" },
  { number: "PO-2026-0479", title: "Crane runway girders", client: "Meridian Construction Co.", total: 624000, requiredBy: "2026-07-02", status: "under_review", createdAt: "2026-06-04" },
  { number: "PO-2026-0477", title: "Mezzanine floor framing", client: "Sterling Steel Projects", total: 918050, requiredBy: "2026-06-28", status: "approved", createdAt: "2026-06-01" },
  { number: "PO-2026-0474", title: "Transfer girders — Bay 7", client: "Vertex Engineering Pvt Ltd", total: 2417750, requiredBy: "2026-08-10", status: "revision_requested", createdAt: "2026-05-28" },
  { number: "PO-2026-0470", title: "Loading dock frame", client: "Orient Structurals", total: 336400, requiredBy: "2026-07-20", status: "rejected", createdAt: "2026-05-26" },
  { number: "PO-2026-0468", title: "Roof truss assembly — Shed 2", client: "Larsen Build Group", total: 1126500, requiredBy: "2026-08-01", status: "draft", createdAt: "2026-06-09" },
]

export const sampleLineItems: LineItem[] = [
  { id: "1", description: "ISMB 300 primary beams — fabricated & shot-blasted", qty: 24, unitPrice: 18500 },
  { id: "2", description: "ISMC 150 channel bracing", qty: 60, unitPrice: 4200 },
  { id: "3", description: "Base plates 400×400×20mm w/ anchor assembly", qty: 16, unitPrice: 5800 },
]

export const sampleClients = [
  "Acme Infrastructure Ltd.",
  "Meridian Construction Co.",
  "Sterling Steel Projects",
  "Vertex Engineering Pvt Ltd",
]
