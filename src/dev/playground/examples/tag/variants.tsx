import { CheckIcon, EyeIcon } from "lucide-react"

import { AutoFilledTag, Tag } from "@/components/data-display/tag"

export default function TagVariants() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Outline (default) — progress values in dense tables</p>
        <div className="flex flex-wrap gap-2.5">
          <Tag tone="success">Both ends</Tag>
          <Tag tone="success">Done</Tag>
          <Tag tone="success">Complete</Tag>
          <Tag tone="warning">In prog</Tag>
          <Tag tone="warning">60%</Tag>
          <Tag tone="warning">Queued</Tag>
          <Tag tone="info">Scheduled</Tag>
          <Tag tone="danger">Blocked</Tag>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Soft — field flags and labels</p>
        <div className="flex flex-wrap items-center gap-2.5">
          <AutoFilledTag />
          <Tag tone="brand" variant="soft" font="sans" size="sm">required</Tag>
          <Tag tone="brand" variant="soft" font="sans" size="sm">editable</Tag>
          <Tag tone="neutral" variant="soft">per member</Tag>
          <Tag tone="neutral" variant="soft" shape="square" font="sans" size="sm">WPS</Tag>
          <Tag tone="neutral" variant="soft" shape="square" font="sans" size="sm">Setup Photo</Tag>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Square + uppercase — section markers</p>
        <div className="flex flex-wrap items-center gap-2.5">
          <Tag tone="brand" variant="soft" shape="square">Variant 1</Tag>
          <Tag tone="success" variant="soft" shape="square" uppercase>
            <CheckIcon /> Authorised · can decide
          </Tag>
          <Tag tone="neutral" variant="soft" shape="square" uppercase>
            <EyeIcon /> Read-only
          </Tag>
        </div>
      </div>
    </div>
  )
}
