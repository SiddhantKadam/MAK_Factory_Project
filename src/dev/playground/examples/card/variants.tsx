import { PlusIcon } from "lucide-react"

import { CountBadge } from "@/components/data-display/count-badge"
import { Tag } from "@/components/data-display/tag"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CardVariants() {
  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      {/* Title with a tag, divided header */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            Machining Operations <Tag variant="soft">per member</Tag>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">Body content goes here.</CardContent>
      </Card>

      {/* Count + header action */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            Documents <CountBadge>2</CountBadge>
          </CardTitle>
          <CardAction>
            <Button variant="tertiary" size="sm">
              <PlusIcon /> Add
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="text-muted-foreground">Body content goes here.</CardContent>
      </Card>

      {/* Description + footer actions */}
      <Card>
        <CardHeader>
          <CardTitle>Review extracted details</CardTitle>
          <CardDescription>Check every field we pulled from the PDF and correct anything before continuing.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground">Form fields…</CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline">Back</Button>
          <div className="flex gap-3">
            <Button variant="outline">Save as Draft</Button>
            <Button>Continue to review</Button>
          </div>
        </CardFooter>
      </Card>

      {/* Accent bar — the project phase header uses this */}
      <Card className="border-t-4 border-t-info">
        <CardHeader>
          <CardTitle>Accent card</CardTitle>
          <CardDescription>Add a coloured top border to mark the active phase.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
