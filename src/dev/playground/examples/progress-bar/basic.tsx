import { ProgressBar } from "@/components/feedback/progress-bar"

export default function ProgressBarExample() {
  return (
    <div className="w-full max-w-lg space-y-5">
      <ProgressBar value={17} label="Checklist progress" />
      <ProgressBar value={60} tone="warning" label="Member progress" />
      <ProgressBar value={100} tone="success" label="Cutting phase" />
      <ProgressBar value={30} tone="brand" size="sm" label="Payment received" />
    </div>
  )
}
