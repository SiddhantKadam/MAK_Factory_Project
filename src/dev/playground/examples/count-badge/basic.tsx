import { CountBadge } from "@/components/data-display/count-badge"

export default function CountBadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-6 text-[15px] font-medium">
      <span className="flex items-center gap-2">
        Purchase Orders <CountBadge tone="brand">12</CountBadge>
      </span>
      <span className="flex items-center gap-2">
        Disputes <CountBadge tone="danger">3</CountBadge>
      </span>
      <span className="flex items-center gap-2">
        Documents <CountBadge>2</CountBadge>
      </span>
      <span className="flex items-center gap-2">
        Checklist <CountBadge>1/6</CountBadge>
      </span>
    </div>
  )
}
