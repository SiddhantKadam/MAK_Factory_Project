import { useState } from "react"

import { Alert } from "@/components/feedback/alert"
import { Button } from "@/components/ui/button"

export default function AlertTones() {
  const [showReview, setShowReview] = useState(true)

  return (
    <div className="w-full space-y-3">
      {showReview ? (
        <Alert onDismiss={() => setShowReview(false)}>
          This PO is under review. No edits can be made until the approval chain is complete.
        </Alert>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setShowReview(true)}>
          Show dismissed alert
        </Button>
      )}
      <Alert tone="info" title="Payment milestone 2 is due">
        30% (₹2,36,640.00) becomes due on drawing approval.
      </Alert>
      <Alert tone="success" title="PO verified by client">
        Acme Infrastructure Ltd. verified version 2 on 04 Jun 2026.
      </Alert>
      <Alert
        tone="warning"
        title="Material shortfall at Pune"
        actions={<Button size="sm" variant="outline">View shortfall</Button>}
      >
        E350 10mm plate is short by 1,240 kg. Ahmedabad has 2,000 kg free.
      </Alert>
      <Alert tone="danger" title="Couldn't read the PDF">
        The uploaded file looks scanned. Enter the PO details manually.
      </Alert>
    </div>
  )
}
