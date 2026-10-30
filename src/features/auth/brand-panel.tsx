import { BadgeCheckIcon, IndianRupeeIcon, WarehouseIcon } from "lucide-react"

import { BrandMark } from "@/components/layout/app-sidebar"

const highlights = [
  { icon: BadgeCheckIcon, title: "Client-verified POs", text: "Clients sign off the exact version they ordered." },
  { icon: IndianRupeeIcon, title: "Payment milestones", text: "30-30-40 instalments tracked against every PO." },
  { icon: WarehouseIcon, title: "Stock by plant", text: "Pune and Ahmedabad, reserved per project." },
]

/** Dark left panel on the sign-in pages. */
export function BrandPanel() {
  return (
    <div className="relative flex w-full flex-col justify-between p-10 xl:p-14">
      {/* Blueprint grid + warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.045) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 size-[520px] rounded-full bg-primary/30 blur-[120px]"
      />

      <div className="relative">
        <BrandMark inverted />
      </div>

      <div className="relative max-w-md space-y-8">
        <div className="space-y-4">
          <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#fb923c] uppercase">
            PO → Payment → Stock
          </p>
          <h2 className="text-[34px] leading-[1.15] font-semibold tracking-tight">
            Every PO, payment and plate in one place.
          </h2>
          <p className="text-[15px] leading-relaxed text-white/65">
            One live record for MAK Universal's pre-engineered building projects — from the client's PO to the steel
            on the shop floor.
          </p>
        </div>
        <ul className="space-y-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-white/8 text-[#fb923c] ring-1 ring-white/10">
                <Icon className="size-[18px]" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{title}</span>
                <span className="block text-[13px] text-white/60">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative font-mono text-[11px] tracking-wide text-white/45">ISO 9001:2015 · Pune · Ahmedabad</p>
    </div>
  )
}
