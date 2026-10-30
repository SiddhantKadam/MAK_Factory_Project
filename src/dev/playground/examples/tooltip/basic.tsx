import { CheckIcon, InfoIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function TooltipExample() {
  return (
    <div className="flex items-center gap-6">
      <Tooltip>
        <TooltipTrigger asChild>
          {/* Disabled buttons don't fire events; wrap them so the tooltip still shows */}
          <span tabIndex={0}>
            <Button variant="outline" disabled>
              <CheckIcon /> Complete Phase
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>4 required items remaining</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="About auto-fill">
            <InfoIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Values extracted from the uploaded PDF</TooltipContent>
      </Tooltip>
    </div>
  )
}
