import { Breadcrumbs } from "@/components/layout/breadcrumbs"

export default function BreadcrumbsExample() {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Purchase Orders" }]} />
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Purchase Orders", to: "/purchase-orders" },
          { label: "PO-2026-0042" },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Projects", to: "/projects" },
          { label: "PROJ-2026-0018", to: "/projects/PROJ-2026-0018" },
          { label: "Beamline" },
        ]}
      />
    </div>
  )
}
