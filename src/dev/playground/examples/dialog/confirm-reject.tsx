import { useState } from "react"
import { XIcon } from "lucide-react"

import { FormField } from "@/components/forms/form-field"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function ConfirmRejectDialog() {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [error, setError] = useState<string>()

  const confirm = () => {
    if (reason.trim().length < 10) return setError("Give a reason of at least 10 characters.")
    setOpen(false)
    setReason("")
    setError(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <XIcon /> Reject PO
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject PO-2026-0042?</DialogTitle>
          <DialogDescription>
            The PO will not proceed to production. The Planning Officer will see your reason in the PO history.
          </DialogDescription>
        </DialogHeader>
        <FormField label="Reason" required error={error}>
          <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Pricing does not match the agreed quotation." />
        </FormField>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={confirm}>
            Reject PO
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
