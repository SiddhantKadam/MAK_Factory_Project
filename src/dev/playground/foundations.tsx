import * as React from "react"

import { Overline } from "@/components/data-display/overline"
import { CopyButton } from "@/dev/playground/code-block"

type Swatch = { token: string; className: string; label: string }

const palette: { title: string; swatches: Swatch[] }[] = [
  {
    title: "Surfaces",
    swatches: [
      { token: "--background", className: "bg-background", label: "Canvas" },
      { token: "--card", className: "bg-card", label: "Card" },
      { token: "--muted", className: "bg-muted", label: "Muted" },
      { token: "--border", className: "bg-border", label: "Border" },
      { token: "--input", className: "bg-input", label: "Input border" },
    ],
  },
  {
    title: "Text",
    swatches: [
      { token: "--foreground", className: "bg-foreground", label: "Foreground" },
      { token: "--muted-foreground", className: "bg-muted-foreground", label: "Muted" },
      { token: "--subtle-foreground", className: "bg-subtle-foreground", label: "Subtle" },
      { token: "--link", className: "bg-link", label: "Link" },
    ],
  },
  {
    title: "Brand",
    swatches: [
      { token: "--primary", className: "bg-primary", label: "Primary" },
      { token: "--brand-soft", className: "bg-brand-soft", label: "Soft" },
      { token: "--brand-border", className: "bg-brand-border", label: "Border" },
    ],
  },
  ...(["success", "warning", "destructive", "info"] as const).map((tone) => ({
    title: tone[0]!.toUpperCase() + tone.slice(1),
    swatches: [
      { token: `--${tone}`, className: `bg-${tone}`, label: "Solid" },
      { token: `--${tone}-soft`, className: `bg-${tone}-soft`, label: "Soft" },
      { token: `--${tone}-border`, className: `bg-${tone}-border`, label: "Border" },
    ],
  })),
]

function readToken(token: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim()
}

function SwatchTile({ swatch }: { swatch: Swatch }) {
  const [value] = React.useState(() => readToken(swatch.token))
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="h-14 border-b" style={{ background: `var(${swatch.token})` }} />
      <div className="space-y-1 p-3">
        <div className="text-sm font-semibold">{swatch.label}</div>
        <div className="font-mono text-[11px] text-muted-foreground">{swatch.className}</div>
        <div className="font-mono text-[11px] text-subtle-foreground uppercase">{value}</div>
      </div>
    </div>
  )
}

export function ColorTokens() {
  return (
    <div className="space-y-6">
      {palette.map((group) => (
        <div key={group.title} className="space-y-2.5">
          <Overline>{group.title}</Overline>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {group.swatches.map((s) => (
              <SwatchTile key={s.token} swatch={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const typeScale = [
  { name: "Page title", className: "text-[28px] font-semibold tracking-tight", sample: "Purchase Orders" },
  { name: "Record title", className: "font-mono text-2xl font-semibold", sample: "PO-2026-0042" },
  { name: "Section title", className: "text-[17px] font-semibold", sample: "Line items" },
  { name: "Body", className: "text-[15px]", sample: "Structural steel — Warehouse Block B" },
  { name: "Body small", className: "text-sm", sample: "Check every field we pulled from the PDF." },
  { name: "Muted", className: "text-sm text-muted-foreground", sample: "10 orders · 3 awaiting your review" },
  { name: "Mono value", className: "font-mono text-[15px] font-semibold", sample: "₹7,88,800.00 · 20 Aug 2026" },
  { name: "Table header", className: "text-[13px] font-medium tracking-wide text-muted-foreground uppercase", sample: "Required delivery" },
  { name: "Overline", className: "font-mono text-[11px] font-medium tracking-[0.08em] text-subtle-foreground uppercase", sample: "Total amount" },
]

export function Typography() {
  return (
    <div className="divide-y rounded-lg border bg-card">
      {typeScale.map((t) => (
        <div key={t.name} className="grid items-center gap-2 px-5 py-4 md:grid-cols-[160px_1fr_auto]">
          <span className="text-xs font-medium text-muted-foreground">{t.name}</span>
          <span className={t.className}>{t.sample}</span>
          <CopyButton text={t.className} className="justify-self-start bg-muted text-muted-foreground hover:text-foreground md:justify-self-end" />
        </div>
      ))}
    </div>
  )
}
