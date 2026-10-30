import { ConstructionIcon } from "lucide-react"
import { Link } from "react-router"

import { EmptyState } from "@/components/feedback/empty-state"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function ComingSoonPage() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-8">
      <Card>
        <EmptyState
          icon={ConstructionIcon}
          title="Not built yet"
          description="This section is on the roadmap."
          action={
            <Button variant="outline" asChild>
              <Link to="/dashboard">Back to dashboard</Link>
            </Button>
          }
        />
      </Card>
    </div>
  )
}
