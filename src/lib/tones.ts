/**
 * Status tones shared by badges, tags, alerts and icon tiles,
 * so "success" looks the same everywhere.
 */
export type Tone = "neutral" | "brand" | "success" | "warning" | "danger" | "info"

export const tones: Record<
  Tone,
  { soft: string; text: string; border: string; dot: string; solid: string }
> = {
  neutral: {
    soft: "bg-neutral-soft",
    text: "text-neutral-foreground",
    border: "border-neutral-border",
    dot: "bg-subtle-foreground",
    solid: "bg-neutral-foreground text-white",
  },
  brand: {
    soft: "bg-brand-soft",
    text: "text-primary",
    border: "border-brand-border",
    dot: "bg-primary",
    solid: "bg-primary text-primary-foreground",
  },
  success: {
    soft: "bg-success-soft",
    text: "text-success-foreground",
    border: "border-success-border",
    dot: "bg-success",
    solid: "bg-success text-white",
  },
  warning: {
    soft: "bg-warning-soft",
    text: "text-warning-foreground",
    border: "border-warning-border",
    dot: "bg-[#ea580c]",
    solid: "bg-warning text-white",
  },
  danger: {
    soft: "bg-destructive-soft",
    text: "text-destructive-foreground",
    border: "border-destructive-border",
    dot: "bg-destructive",
    solid: "bg-destructive text-white",
  },
  info: {
    soft: "bg-info-soft",
    text: "text-info-foreground",
    border: "border-info-border",
    dot: "bg-info",
    solid: "bg-info text-white",
  },
}
