import { useState } from "react"

import { Stepper, type Step } from "@/components/feedback/stepper"
import { Button } from "@/components/ui/button"

const phases = ["Cutting", "Beamline", "Fit-Up", "QC", "Dispatch"]

export default function StepperPhases() {
  const [current, setCurrent] = useState(1)

  const steps: Step[] = phases.map((label, i) => ({
    label,
    status: i < current ? "complete" : i === current ? "current" : "locked",
  }))

  return (
    <div className="w-full space-y-6">
      <Stepper steps={steps} />
      <div className="flex justify-center gap-3">
        <Button variant="outline" size="sm" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
          Previous phase
        </Button>
        <Button size="sm" disabled={current === phases.length} onClick={() => setCurrent((c) => c + 1)}>
          Complete phase
        </Button>
      </div>
    </div>
  )
}
