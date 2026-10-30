import { StatCard } from "@/components/data-display/stat-card"
import { formatINR } from "@/lib/format"

export default function StatCardOverview() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total amount" value={formatINR(788800)} />
      <StatCard label="Required delivery" value="20 Aug 2026" />
      <StatCard label="Project manager" value="R. Okafor" mono={false} />
      <StatCard label="Line items" value="3 items" hint="2 auto-filled" />
    </div>
  )
}
