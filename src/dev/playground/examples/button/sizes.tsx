import { BellIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon-sm" variant="outline" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon" variant="outline" aria-label="Notifications">
        <BellIcon />
      </Button>
      <Button size="icon-lg" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  )
}
