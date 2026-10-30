import { EyeIcon } from "lucide-react"

import { DecisionButton } from "@/components/actions/decision-button"
import { KeyValue, KeyValueGrid } from "@/components/data-display/key-value"
import { LineItemsTable } from "@/components/data-display/line-items-table"
import { Overline } from "@/components/data-display/overline"
import { PoStatusBadge } from "@/components/data-display/po-status-badge"
import { Tag } from "@/components/data-display/tag"
import { FormField } from "@/components/forms/form-field"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { sampleLineItems } from "@/dev/playground/sample-data"
import { formatINR } from "@/lib/format"

export default function PoReviewPattern() {
  return (
    // @container: the rail moves beside the summary once *this area* is wide enough,
    // so the layout also works inside narrower panels, not just on wide screens.
    <div className="@container w-full">
      <div className="grid items-start gap-6 @4xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <Card>
            <CardContent className="space-y-5">
              <Overline>
                <EyeIcon /> Read-only
              </Overline>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-mono text-2xl font-semibold">PO-2026-0042</h2>
                  <PoStatusBadge status="under_review" />
                </div>
                <p className="text-lg font-medium">Structural steel — Warehouse Block B</p>
                <p className="text-muted-foreground">Acme Infrastructure Ltd.</p>
              </div>
              <Separator />
              <KeyValueGrid columns={3}>
                <KeyValue label="Total amount" value={formatINR(788800)} />
                <KeyValue label="Currency" value="INR" />
                <KeyValue label="Required delivery" value="20 Aug 2026" />
                <KeyValue label="Assigned PM" value="R. Okafor" mono={false} />
                <KeyValue label="Submitted by" value="M. Delgado" mono={false} />
                <KeyValue label="Submitted" value="04 Jun 2026" />
              </KeyValueGrid>
            </CardContent>
          </Card>

          <section className="space-y-3">
            <h3 className="text-[17px] font-semibold">Line items</h3>
            <LineItemsTable items={sampleLineItems} />
          </section>
        </div>

        <Card className="@4xl:sticky @4xl:top-6">
          <CardHeader className="border-b">
            <CardTitle>Approval decision</CardTitle>
            <CardDescription>
              Reviewing as <strong className="font-semibold text-foreground">A. Rahman · Director</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="Reviewer notes" tag={<Tag tone="brand" variant="soft" font="sans" size="sm">required</Tag>}>
              <Textarea placeholder="Record the reason for your decision. Visible to the Planning Officer and in the PO history." />
            </FormField>
            <DecisionButton decision="approve" title="Approve PO" description="Releases the PO to production scheduling." />
            <DecisionButton decision="revise" title="Request revision" description="Sends it back to the Planning Officer to edit and resubmit." />
            <DecisionButton decision="reject" title="Reject PO" description="Declines the PO. It will not proceed to production." />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
