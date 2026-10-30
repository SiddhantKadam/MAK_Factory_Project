import { CheckIcon } from "lucide-react"

import { StatusBadge } from "@/components/data-display/status-badge"
import { Stepper, type Step } from "@/components/feedback/stepper"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const steps: Step[] = [
  { label: "Cutting", status: "complete" },
  { label: "Beamline", status: "current" },
  { label: "Fit-Up", status: "locked" },
  { label: "QC", status: "locked" },
  { label: "Dispatch", status: "locked" },
]

export default function PhaseHeaderPattern() {
  return (
    <Card className="w-full border-t-4 border-t-info">
      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-start gap-5">
          <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-info font-mono text-2xl font-semibold text-white">
            2
          </span>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold">Beamline</h2>
              <StatusBadge tone="info">In Progress</StatusBadge>
              <span className="font-mono text-[13px] text-subtle-foreground">Phase 2 of 5</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Structural Beams — Bay 4</span>
              <span aria-hidden>·</span>
              <span>Acme Infrastructure Ltd.</span>
              <span aria-hidden>·</span>
              <span className="font-mono">PO-2026-0042</span>
              <span aria-hidden>·</span>
              <span>
                Target <span className="font-mono font-semibold text-foreground">30 Jun 2026</span>
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl font-semibold text-info">17%</div>
            <div className="font-mono text-xs text-subtle-foreground">1/6 tasks</div>
          </div>
          <div className="space-y-1.5 text-right">
            <Button variant="outline" size="lg" disabled>
              <CheckIcon /> Complete Phase
            </Button>
            <p className="text-xs font-medium text-warning">4 required items remaining</p>
          </div>
        </div>
        <Separator />
        <Stepper steps={steps} />
      </CardContent>
    </Card>
  )
}
