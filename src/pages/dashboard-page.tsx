import { LayoutGridIcon } from "lucide-react"

import { PageHeader } from "@/components/layout/page-header"
import { EmptyState } from "@/components/feedback/empty-state"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/features/auth/auth-context"

function greeting(hour = new Date().getHours()) {
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-8 py-8">
      <PageHeader
        title={user ? `${greeting()}, ${user.name}` : "Dashboard"}
        description="Phase 1 — PO intake, payment milestones and inventory."
      />
      <Card>
        <EmptyState
          icon={LayoutGridIcon}
          title="Nothing here yet"
          description="Dashboard widgets arrive once the PO, payment and inventory modules are built."
        />
      </Card>
    </div>
  )
}
