import { useState } from "react"

import { DecisionButton } from "@/components/actions/decision-button"
import { FormField } from "@/components/forms/form-field"
import { Tag } from "@/components/data-display/tag"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function ApprovalRail() {
  const [notes, setNotes] = useState("")
  const [error, setError] = useState<string>()

  const decide = (decision: string) => {
    if (!notes.trim()) return setError("Add a note before deciding.")
    setError(undefined)
    alert(`${decision}: ${notes}`)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="border-b">
        <CardTitle>Approval decision</CardTitle>
        <CardDescription>
          Reviewing as <strong className="font-semibold text-foreground">A. Rahman · Director</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          label="Reviewer notes"
          tag={<Tag tone="brand" variant="soft" font="sans" size="sm">required</Tag>}
          error={error}
        >
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record the reason for your decision. Visible to the Planning Officer and in the PO history."
          />
        </FormField>
        <DecisionButton
          decision="approve"
          title="Approve PO"
          description="Releases the PO to production scheduling."
          onClick={() => decide("Approved")}
        />
        <DecisionButton
          decision="revise"
          title="Request revision"
          description="Sends it back to the Planning Officer to edit and resubmit."
          onClick={() => decide("Revision requested")}
        />
        <DecisionButton
          decision="reject"
          title="Reject PO"
          description="Declines the PO. It will not proceed to production."
          onClick={() => decide("Rejected")}
        />
      </CardContent>
    </Card>
  )
}
