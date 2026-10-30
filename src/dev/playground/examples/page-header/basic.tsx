import { PlusIcon } from "lucide-react"

import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"

export default function PageHeaderExample() {
  return (
    <PageHeader
      className="w-full"
      title="Purchase Orders"
      description="10 orders · 3 awaiting your review"
      actions={
        <Button size="lg">
          <PlusIcon /> New PO
        </Button>
      }
    />
  )
}
