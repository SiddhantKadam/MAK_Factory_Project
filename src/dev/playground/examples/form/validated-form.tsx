import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { CurrencyInput } from "@/components/forms/currency-input"
import { DateInput } from "@/components/forms/date-input"
import { FormField } from "@/components/forms/form-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { sampleClients } from "@/dev/playground/sample-data"

const poSchema = z.object({
  poNumber: z.string().regex(/^PO-\d{4}-\d{4}$/, "Use the format PO-2026-0042."),
  title: z.string().min(3, "Give the PO a short title."),
  client: z.string().min(1, "Choose a client."),
  requiredBy: z.string().min(1, "Pick a delivery date."),
  total: z.number({ error: "Enter the PO value." }).positive("Amount must be more than zero."),
  notes: z.string().max(500, "Keep notes under 500 characters.").optional(),
})

type PoForm = z.infer<typeof poSchema>

export default function ValidatedPoForm() {
  const [submitted, setSubmitted] = useState<PoForm>()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PoForm>({
    resolver: zodResolver(poSchema),
    defaultValues: { poNumber: "", title: "", client: "", requiredBy: "", notes: "" },
  })

  const onSubmit = async (values: PoForm) => {
    await new Promise((r) => setTimeout(r, 600)) // pretend API call
    setSubmitted(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-3xl space-y-5">
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <FormField label="PO Number" required error={errors.poNumber?.message}>
          <Input className="font-mono" placeholder="PO-2026-0042" {...register("poNumber")} />
        </FormField>

        <FormField label="Required Delivery Date" required error={errors.requiredBy?.message}>
          <DateInput {...register("requiredBy")} />
        </FormField>

        <FormField label="PO Title" required error={errors.title?.message}>
          <Input placeholder="Structural steel — Warehouse Block B" {...register("title")} />
        </FormField>

        <FormField label="Client / Vendor" id="client" required error={errors.client?.message}>
          <Controller
            control={control}
            name="client"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="client" className="w-full" aria-invalid={!!errors.client} onBlur={field.onBlur}>
                  <SelectValue placeholder="Choose a client" />
                </SelectTrigger>
                <SelectContent>
                  {sampleClients.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField label="Total Amount" required error={errors.total?.message}>
          <Controller
            control={control}
            name="total"
            render={({ field }) => (
              <CurrencyInput value={field.value ?? null} onValueChange={(v) => field.onChange(v ?? undefined)} onBlur={field.onBlur} />
            )}
          />
        </FormField>
      </div>

      <FormField label="Notes / Description" error={errors.notes?.message}>
        <Textarea placeholder="Scope, finish, delivery lots…" {...register("notes")} />
      </FormField>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button type="button" variant="outline" onClick={() => { reset(); setSubmitted(undefined) }}>
          Reset
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Continue to review
        </Button>
      </div>

      {submitted && (
        <pre className="overflow-auto rounded-md bg-muted p-4 font-mono text-xs">{JSON.stringify(submitted, null, 2)}</pre>
      )}
    </form>
  )
}
