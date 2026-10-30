import { useState } from "react"

import { FormField } from "@/components/forms/form-field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SelectExample() {
  const [status, setStatus] = useState("all")

  return (
    <div className="grid w-full max-w-3xl items-end gap-5 sm:grid-cols-3">
      {/* Filter select, no visible label */}
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full" aria-label="Status filter">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="under_review">Under Review</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      {/* Inside FormField: give the trigger the same id so the label points at it */}
      <FormField label="Assign Project Manager" id="pm">
        <Select>
          <SelectTrigger id="pm" className="w-full">
            <SelectValue placeholder="Choose a PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="okafor">R. Okafor</SelectItem>
            <SelectItem value="sharma">P. Sharma</SelectItem>
            <SelectItem value="iyer">K. Iyer</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Currency" id="currency">
        <Select defaultValue="INR" disabled>
          <SelectTrigger id="currency" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INR">INR</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>
  )
}
