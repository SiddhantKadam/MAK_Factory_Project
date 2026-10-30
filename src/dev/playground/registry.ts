import type * as React from "react"

import { ColorTokens, Typography } from "@/dev/playground/foundations"

/**
 * Everything the playground shows. To document a new component:
 *   1. add an example file under ./examples/<component>/<name>.tsx (default export)
 *   2. add or extend a section below, pointing `file` at "<component>/<name>"
 * The example renders as the live preview AND is shown verbatim as its code.
 */

export type PropDoc = { name: string; type: string; default?: string; description: string }

export type ExampleDoc = {
  file: string
  title: string
  description?: string
  /** Preview background: white card (default) or the app's grey canvas */
  canvas?: "card" | "app"
  /** Let the preview fill the width instead of centring */
  stretch?: boolean
}

export type SectionDoc = {
  id: string
  title: string
  group: (typeof groups)[number]
  description: string
  importFrom?: string
  examples?: ExampleDoc[]
  props?: PropDoc[]
  /** Non-code content (foundations) */
  custom?: React.ComponentType
}

export const groups = [
  "Foundations",
  "Actions",
  "Forms",
  "Data display",
  "Feedback",
  "Overlays",
  "Navigation & layout",
  "Patterns",
] as const

const toneType = `"neutral" | "brand" | "success" | "warning" | "danger" | "info"`

export const sections: SectionDoc[] = [
  // ── Foundations ─────────────────────────────────────────────
  {
    id: "colors",
    title: "Colours",
    group: "Foundations",
    description:
      "Design tokens live in src/index.css as CSS variables and map to Tailwind classes (bg-primary, text-muted-foreground, bg-success-soft…). Change a token there and every component follows.",
    custom: ColorTokens,
  },
  {
    id: "typography",
    title: "Typography",
    group: "Foundations",
    description:
      "IBM Plex Sans for interface text, IBM Plex Mono for anything you might compare or copy: PO numbers, amounts, dates, codes and small uppercase captions.",
    custom: Typography,
  },

  // ── Actions ─────────────────────────────────────────────────
  {
    id: "button",
    title: "Button",
    group: "Actions",
    description:
      "One primary (orange) action per view. Outline for secondary actions, tertiary for inline adds, success/info/destructive only where the colour carries meaning.",
    importFrom: `import { Button } from "@/components/ui/button"`,
    examples: [
      { file: "button/variants", title: "Variants" },
      { file: "button/sizes", title: "Sizes", description: "default (40px) matches inputs; lg for page-level CTAs; icon sizes are square." },
      { file: "button/with-icons", title: "With icons", description: "Put the lucide icon first; it is sized automatically." },
      { file: "button/states", title: "States", description: "`loading` shows a spinner and disables the button. Click the first one." },
    ],
    props: [
      { name: "variant", type: `"default" | "outline" | "secondary" | "tertiary" | "ghost" | "success" | "info" | "destructive" | "link"`, default: `"default"`, description: "Visual style." },
      { name: "size", type: `"sm" | "default" | "lg" | "icon-sm" | "icon" | "icon-lg"`, default: `"default"`, description: "Height and padding." },
      { name: "loading", type: "boolean", default: "false", description: "Spinner + disabled while an action runs." },
      { name: "asChild", type: "boolean", default: "false", description: "Render as the child element (e.g. a router <Link>)." },
    ],
  },
  {
    id: "decision-button",
    title: "Decision button",
    group: "Actions",
    description: "Large two-line buttons for approval rails. The description says what happens next, so reviewers don't have to guess.",
    importFrom: `import { DecisionButton } from "@/components/actions/decision-button"`,
    examples: [{ file: "decision-button/approval-rail", title: "Approval rail", description: "Notes are required before any decision." }],
    props: [
      { name: "decision", type: `"approve" | "revise" | "reject"`, description: "Sets colour and default icon." },
      { name: "title", type: "ReactNode", description: "Action name." },
      { name: "description", type: "ReactNode", description: "Consequence, one sentence." },
      { name: "icon", type: "ElementType", description: "Override the default icon." },
    ],
  },
  {
    id: "segmented-control",
    title: "Segmented control",
    group: "Actions",
    description: "Pill switcher for a small set of views. Use `floating` for the bar that sits over content at the bottom of the PO screens.",
    importFrom: `import { SegmentedControl } from "@/components/actions/segmented-control"`,
    examples: [{ file: "segmented-control/view-switcher", title: "View switcher", canvas: "app" }],
    props: [
      { name: "options", type: "{ value: T; label: ReactNode }[]", description: "Segments, in order." },
      { name: "value / onValueChange", type: "T / (value: T) => void", description: "Controlled selection." },
      { name: "label", type: "string", description: "Mono caption at the start; also the accessible name." },
      { name: "floating", type: "boolean", description: "Adds a drop shadow." },
    ],
  },
  {
    id: "row-actions-menu",
    title: "Row actions menu",
    group: "Actions",
    description: "The ⋮ menu in a table's ACTIONS column. Destructive actions are grouped at the bottom in red.",
    importFrom: `import { RowActionsMenu } from "@/components/actions/row-actions-menu"`,
    examples: [{ file: "row-actions-menu/basic", title: "Basic" }],
    props: [
      { name: "actions", type: "RowAction[]", description: "{ label, icon?, onSelect, destructive?, disabled? }" },
      { name: "label", type: "string", default: `"Row actions"`, description: "Accessible name — include the row's id." },
    ],
  },

  // ── Forms ───────────────────────────────────────────────────
  {
    id: "form-field",
    title: "Form field",
    group: "Forms",
    description:
      "Wrap every control in FormField. It renders the label, an optional tag (AUTO-FILLED, required), hint or error, and wires id / aria-describedby / aria-invalid onto the control for you.",
    importFrom: `import { FormField } from "@/components/forms/form-field"`,
    examples: [{ file: "form-field/states", title: "Label, tag, hint, error" }],
    props: [
      { name: "label", type: "ReactNode", description: "Field label." },
      { name: "tag", type: "ReactNode", description: "Shown after the label — <AutoFilledTag />, a required Tag…" },
      { name: "hint", type: "ReactNode", description: "Help text under the control (hidden while an error shows)." },
      { name: "error", type: "ReactNode", description: "Error text; also sets aria-invalid on the control." },
      { name: "required", type: "boolean", description: "Red asterisk + aria-required." },
      { name: "id", type: "string", description: "Fixed id. Needed for Select: pass the same id to SelectTrigger." },
    ],
  },
  {
    id: "input",
    title: "Text input",
    group: "Forms",
    description: "40px field. Add `font-mono` for codes and numbers. Read-only fields get a light grey fill.",
    importFrom: `import { Input } from "@/components/ui/input"`,
    examples: [{ file: "input/states", title: "States" }],
  },
  {
    id: "search-input",
    title: "Search input",
    group: "Forms",
    description: "Input with a leading search icon and an optional clear button.",
    importFrom: `import { SearchInput } from "@/components/forms/search-input"`,
    examples: [{ file: "search-input/basic", title: "Basic" }],
    props: [{ name: "onClear", type: "() => void", description: "Shows × when there is a value." }],
  },
  {
    id: "select",
    title: "Select (dropdown)",
    group: "Forms",
    description: "Radix select styled like the inputs. Use it for filters (no label) and form fields.",
    importFrom: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"`,
    examples: [{ file: "select/basic", title: "Filter, form field, disabled" }],
  },
  {
    id: "date-input",
    title: "Date & date range",
    group: "Forms",
    description: "Native date pickers in mono. Values are ISO strings (2026-08-20); format for display with formatDate().",
    importFrom: `import { DateInput, DateRangeInput } from "@/components/forms/date-input"`,
    examples: [{ file: "date-input/basic", title: "Single date and range" }],
    props: [
      { name: "DateRangeInput.value", type: "{ from: string; to: string }", description: "ISO dates." },
      { name: "DateRangeInput.onValueChange", type: "(range) => void", description: "Fires on either end changing." },
    ],
  },
  {
    id: "currency-input",
    title: "Currency input",
    group: "Forms",
    description: "Right-aligned mono amount with a ₹ prefix. Shows Indian grouping (7,88,800.00) at rest and the raw number while editing.",
    importFrom: `import { CurrencyInput } from "@/components/forms/currency-input"`,
    examples: [{ file: "currency-input/basic", title: "Basic" }],
    props: [
      { name: "value", type: "number | null", description: "Amount in rupees." },
      { name: "onValueChange", type: "(value: number | null) => void", description: "Parsed number on every keystroke." },
      { name: "symbol", type: "string", default: `"₹"`, description: "Prefix." },
    ],
  },
  {
    id: "password-input",
    title: "Password input & strength",
    group: "Forms",
    description:
      "PasswordInput adds a show/hide toggle. PasswordStrength goes under new-password fields; its rules come from src/lib/password.ts, the same rules the reset-password schema enforces.",
    importFrom: `import { PasswordInput } from "@/components/forms/password-input"\nimport { PasswordStrength } from "@/components/forms/password-strength"`,
    examples: [{ file: "password-input/with-strength", title: "States and strength meter", description: "Type in “New password” to see the meter update." }],
    props: [
      { name: "PasswordInput", type: "input props (no type)", description: "Everything goes to the inner <input>, including react-hook-form's register()." },
      { name: "PasswordStrength.password", type: "string", description: "The value to score (0–4 rules met)." },
    ],
  },
  {
    id: "textarea",
    title: "Textarea",
    group: "Forms",
    description: "Multi-line notes. Vertically resizable.",
    importFrom: `import { Textarea } from "@/components/ui/textarea"`,
    examples: [{ file: "textarea/basic", title: "Basic" }],
  },
  {
    id: "checkbox",
    title: "Checkbox",
    group: "Forms",
    description: "For independent on/off choices. Pair with a Label using htmlFor.",
    importFrom: `import { Checkbox } from "@/components/ui/checkbox"`,
    examples: [{ file: "checkbox/basic", title: "States" }],
  },
  {
    id: "radio-group",
    title: "Radio group",
    group: "Forms",
    description: "One choice from a short list — e.g. the payment milestone template.",
    importFrom: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
    examples: [{ file: "radio-group/basic", title: "With descriptions" }],
  },
  {
    id: "switch",
    title: "Switch",
    group: "Forms",
    description: "Settings that take effect immediately. Use a checkbox inside forms that need a Save.",
    importFrom: `import { Switch } from "@/components/ui/switch"`,
    examples: [{ file: "switch/basic", title: "Settings list" }],
  },
  {
    id: "validated-form",
    title: "Validated form (React Hook Form + Zod)",
    group: "Forms",
    description:
      "The standard way to build forms: a Zod schema, zodResolver, `register` for native inputs and `Controller` for Select / CurrencyInput. Submit empty to see the errors.",
    examples: [{ file: "form/validated-form", title: "Create PO form", stretch: true }],
  },

  // ── Data display ────────────────────────────────────────────
  {
    id: "status-badge",
    title: "Status badge",
    group: "Data display",
    description: "Dot + label pill for state. For POs always use PoStatusBadge so every screen says the same thing in the same colour.",
    importFrom: `import { StatusBadge } from "@/components/data-display/status-badge"\nimport { PoStatusBadge } from "@/components/data-display/po-status-badge"`,
    examples: [{ file: "status-badge/variants", title: "PO statuses, tones, role chips" }],
    props: [
      { name: "tone", type: toneType, default: `"neutral"`, description: "Colour." },
      { name: "appearance", type: `"soft" | "outline"`, default: `"soft"`, description: "Tinted pill, or white pill with a coloured dot." },
      { name: "dot", type: "boolean", default: "true", description: "Leading dot." },
      { name: "PoStatusBadge.status", type: `"draft" | "under_review" | "revision_requested" | "approved" | "rejected"`, description: "Maps to label + tone via PO_STATUS." },
    ],
  },
  {
    id: "tag",
    title: "Tag",
    group: "Data display",
    description: "Small labels for metadata: progress values in dense tables, field flags (AUTO-FILLED, required), file types and section markers.",
    importFrom: `import { Tag, AutoFilledTag } from "@/components/data-display/tag"`,
    examples: [{ file: "tag/variants", title: "Variants" }],
    props: [
      { name: "tone", type: toneType, default: `"neutral"`, description: "Colour." },
      { name: "variant", type: `"outline" | "soft"`, default: `"outline"`, description: "With or without border." },
      { name: "shape", type: `"pill" | "square"`, default: `"pill"`, description: "Corner radius." },
      { name: "font", type: `"mono" | "sans"`, default: `"mono"`, description: "Typeface." },
      { name: "size", type: `"sm" | "default"`, default: `"default"`, description: "20px or 24px tall." },
      { name: "uppercase", type: "boolean", default: "false", description: "Uppercase + letter-spacing." },
    ],
  },
  {
    id: "count-badge",
    title: "Count badge",
    group: "Data display",
    description: "Numeric counter next to nav items, tabs and card titles.",
    importFrom: `import { CountBadge } from "@/components/data-display/count-badge"`,
    examples: [{ file: "count-badge/basic", title: "Tones" }],
  },
  {
    id: "card",
    title: "Card",
    group: "Data display",
    description: "White panel on the grey canvas. Add `border-b` to CardHeader for a divided header; CardFooter is the grey action strip.",
    importFrom: `import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card"`,
    examples: [{ file: "card/variants", title: "Variants", canvas: "app", stretch: true }],
  },
  {
    id: "stat-card",
    title: "Stat card",
    group: "Data display",
    description: "Bordered summary tile with a mono caption and a large value.",
    importFrom: `import { StatCard } from "@/components/data-display/stat-card"`,
    examples: [{ file: "stat-card/overview", title: "PO overview row", stretch: true }],
    props: [
      { name: "label", type: "ReactNode", description: "Caption (rendered uppercase)." },
      { name: "value", type: "ReactNode", description: "Main figure." },
      { name: "hint", type: "ReactNode", description: "Optional line under the value." },
      { name: "mono", type: "boolean", default: "true", description: "Set false for names." },
    ],
  },
  {
    id: "key-value",
    title: "Key / value",
    group: "Data display",
    description: "Facts about a record. KeyValueGrid for header blocks (with optional edit pencils), KeyValueList for side panels.",
    importFrom: `import { KeyValue, KeyValueGrid, KeyValueList, KeyValueRow } from "@/components/data-display/key-value"`,
    examples: [{ file: "key-value/variants", title: "Grid and list", stretch: true }],
    props: [
      { name: "KeyValue.onEdit", type: "() => void", description: "Shows a pencil button after the value." },
      { name: "KeyValue.mono", type: "boolean", default: "true", description: "Set false for names." },
      { name: "KeyValueGrid.columns", type: "2 | 3 | 4 | 6", default: "3", description: "Columns from md breakpoint up." },
    ],
  },
  {
    id: "table",
    title: "Table",
    group: "Data display",
    description:
      "Uppercase muted headers, 56px rows. Codes, amounts and dates in mono; amounts right-aligned. Wrap in a bordered card.",
    importFrom: `import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell } from "@/components/ui/table"`,
    examples: [{ file: "table/po-list", title: "PO list", stretch: true }],
  },
  {
    id: "line-items-table",
    title: "Line items table",
    group: "Data display",
    description: "PO line items with a total row. Read-only on review screens; pass `onChange` to edit inline.",
    importFrom: `import { LineItemsTable, lineItemsTotal } from "@/components/data-display/line-items-table"`,
    examples: [
      { file: "line-items-table/read-only", title: "Read-only", stretch: true },
      { file: "line-items-table/editable", title: "Editable", description: "Click a cell to edit. The total updates live.", stretch: true },
    ],
    props: [
      { name: "items", type: "LineItem[]", description: "{ id, description, qty, unitPrice }" },
      { name: "onChange", type: "(items: LineItem[]) => void", description: "Makes the table editable." },
    ],
  },
  {
    id: "file-item",
    title: "File item",
    group: "Data display",
    description: "A document row. The icon colour comes from the file extension.",
    importFrom: `import { FileItem } from "@/components/data-display/file-item"`,
    examples: [{ file: "file-item/documents", title: "Documents panel" }],
    props: [
      { name: "name", type: "string", description: "File name (mono)." },
      { name: "kind", type: `"pdf" | "image" | "sheet" | "other"`, description: "Overrides the extension guess." },
      { name: "tag", type: "ReactNode", description: "Document type." },
      { name: "meta", type: "ReactNode", description: "Size · uploader · date." },
      { name: "onDownload", type: "() => void", description: "Shows the download button." },
    ],
  },
  {
    id: "user-avatar",
    title: "User avatar",
    group: "Data display",
    description: "Initials in a dark circle.",
    importFrom: `import { UserAvatar } from "@/components/data-display/user-avatar"`,
    examples: [{ file: "user-avatar/basic", title: "Sizes" }],
  },

  // ── Feedback ────────────────────────────────────────────────
  {
    id: "alert",
    title: "Alert",
    group: "Feedback",
    description: "Inline message inside a page or card. Neutral is the grey \"under review\" strip; other tones are tinted.",
    importFrom: `import { Alert } from "@/components/feedback/alert"`,
    examples: [{ file: "alert/tones", title: "Tones", stretch: true }],
    props: [
      { name: "tone", type: toneType, default: `"neutral"`, description: "Colour and default icon." },
      { name: "title", type: "ReactNode", description: "Bold first line." },
      { name: "icon", type: "ElementType | false", description: "Override or hide the icon." },
      { name: "actions", type: "ReactNode", description: "Buttons on the right." },
      { name: "onDismiss", type: "() => void", description: "Shows a close button." },
    ],
  },
  {
    id: "empty-state",
    title: "Empty state",
    group: "Feedback",
    description: "What a list or panel shows when there's nothing in it — say why, and offer the next step.",
    importFrom: `import { EmptyState } from "@/components/feedback/empty-state"`,
    examples: [{ file: "empty-state/basic", title: "With action", canvas: "app", stretch: true }],
    props: [
      { name: "icon", type: "ElementType", description: "Shown in a tinted tile." },
      { name: "tone", type: toneType, default: `"brand"`, description: "Tile colour — success for confirmations, danger for broken links." },
      { name: "title / description", type: "ReactNode", description: "Say why it's empty." },
      { name: "action", type: "ReactNode", description: "The next step, usually a Button." },
    ],
  },
  {
    id: "progress-bar",
    title: "Progress bar",
    group: "Feedback",
    description: "Thin track for completion. Blue for work in progress, green once complete.",
    importFrom: `import { ProgressBar } from "@/components/feedback/progress-bar"`,
    examples: [{ file: "progress-bar/basic", title: "Tones and sizes" }],
  },
  {
    id: "stepper",
    title: "Stepper",
    group: "Feedback",
    description: "Phase tracker. Complete = green check, current = blue number, locked = grey padlock.",
    importFrom: `import { Stepper, type Step } from "@/components/feedback/stepper"`,
    examples: [{ file: "stepper/phases", title: "Production phases", stretch: true }],
    props: [{ name: "steps", type: `{ label: ReactNode; status: "complete" | "current" | "upcoming" | "locked" }[]`, description: "In order." }],
  },
  {
    id: "checklist-item",
    title: "Checklist item",
    group: "Feedback",
    description: "Tickable task row. Checked rows turn green, strike through, and show who completed them.",
    importFrom: `import { ChecklistItem } from "@/components/feedback/checklist-item"`,
    examples: [{ file: "checklist-item/checklist", title: "Phase checklist", canvas: "app" }],
  },
  {
    id: "file-dropzone",
    title: "File dropzone",
    group: "Feedback",
    description: "Drag-and-drop or click-to-browse upload area. Children render below the hint.",
    importFrom: `import { FileDropzone } from "@/components/feedback/file-dropzone"`,
    examples: [{ file: "file-dropzone/basic", title: "With type select and upload" }],
  },

  // ── Overlays ────────────────────────────────────────────────
  {
    id: "dialog",
    title: "Dialog (modal)",
    group: "Overlays",
    description: "Use for confirmations that need input or carry risk. Keep the primary action on the right.",
    importFrom: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"`,
    examples: [{ file: "dialog/confirm-reject", title: "Confirm with a reason" }],
  },
  {
    id: "tooltip",
    title: "Tooltip",
    group: "Overlays",
    description: "Short hints on hover/focus. TooltipProvider is already mounted in main.tsx.",
    importFrom: `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"`,
    examples: [{ file: "tooltip/basic", title: "Basic" }],
  },

  // ── Navigation & layout ─────────────────────────────────────
  {
    id: "tabs",
    title: "Tabs",
    group: "Navigation & layout",
    description: "Use `variant=\"line\"` on TabsList for the underlined tabs on detail pages.",
    importFrom: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`,
    examples: [{ file: "tabs/po-detail", title: "PO detail tabs", stretch: true }],
  },
  {
    id: "breadcrumbs",
    title: "Breadcrumbs",
    group: "Navigation & layout",
    description: "Ancestors are blue links; the current page is dark and not a link.",
    importFrom: `import { Breadcrumbs } from "@/components/layout/breadcrumbs"`,
    examples: [{ file: "breadcrumbs/basic", title: "Depths" }],
  },
  {
    id: "app-sidebar",
    title: "Sidebar",
    group: "Navigation & layout",
    description: "Main navigation. `collapsed` gives the 64px icon rail with tooltips (used on dense production screens).",
    importFrom: `import { AppSidebar, type NavItem } from "@/components/layout/app-sidebar"`,
    examples: [{ file: "app-sidebar/expanded-collapsed", title: "Expanded and collapsed", stretch: true }],
    props: [
      { name: "items", type: "NavItem[]", description: "{ label, icon, to, count?, countTone?, active? }" },
      { name: "collapsed", type: "boolean", default: "false", description: "Icon-only rail." },
      { name: "footer", type: "ReactNode", description: "Bottom strip (version, environment)." },
    ],
  },
  {
    id: "top-bar",
    title: "Top bar",
    group: "Navigation & layout",
    description: "Header strip with breadcrumbs on the left and search, notifications and the user menu on the right.",
    importFrom: `import { TopBar, NotificationButton, UserMenu } from "@/components/layout/top-bar"`,
    examples: [{ file: "top-bar/basic", title: "Full top bar", stretch: true }],
  },
  {
    id: "page-header",
    title: "Page header",
    group: "Navigation & layout",
    description: "Title, a one-line summary, and the page's primary action.",
    importFrom: `import { PageHeader } from "@/components/layout/page-header"`,
    examples: [{ file: "page-header/basic", title: "With action", canvas: "app", stretch: true }],
  },
  {
    id: "auth-layout",
    title: "Auth layout",
    group: "Navigation & layout",
    description:
      "Frame for sign-in, forgot-password and reset-password: dark brand panel on the left (hidden on small screens), form column on the right. Used by AuthShell in src/features/auth.",
    importFrom: `import { AuthLayout } from "@/components/layout/auth-layout"`,
    examples: [{ file: "auth-layout/sign-in", title: "Sign-in screen", stretch: true }],
    props: [
      { name: "aside", type: "ReactNode", description: "Left panel content, e.g. <BrandPanel />." },
      { name: "footer", type: "ReactNode", description: "Small print under the form." },
    ],
  },

  // ── Patterns ────────────────────────────────────────────────
  {
    id: "pattern-po-list",
    title: "PO list page",
    group: "Patterns",
    description: "Page header + filter bar + table + empty state + floating view switcher. All filters work.",
    examples: [{ file: "patterns/po-list-page", title: "Purchase Orders", canvas: "app", stretch: true }],
  },
  {
    id: "pattern-po-review",
    title: "PO review & approval",
    group: "Patterns",
    description: "Read-only summary with a sticky decision rail.",
    examples: [{ file: "patterns/po-review", title: "Review / Approve", canvas: "app", stretch: true }],
  },
  {
    id: "pattern-phase-header",
    title: "Project phase header",
    group: "Patterns",
    description: "Accent card with phase badge, progress figure, a gated action and the phase stepper.",
    examples: [{ file: "patterns/phase-header", title: "Beamline phase", canvas: "app", stretch: true }],
  },
]
