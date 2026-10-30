import {
  ChartNoAxesColumnIcon,
  CircleAlertIcon,
  FileTextIcon,
  FilesIcon,
  LayersIcon,
  LayoutGridIcon,
  ShieldCheckIcon,
  SunIcon,
  TruckIcon,
} from "lucide-react"

import { AppSidebar, type NavItem } from "@/components/layout/app-sidebar"

// `active` is set explicitly here; in the app, NavLink works it out from the URL.
const items: NavItem[] = [
  { label: "Dashboard", icon: LayoutGridIcon, to: "#", active: false },
  { label: "Purchase Orders", icon: FileTextIcon, to: "#", count: 12, active: true },
  { label: "Projects", icon: LayersIcon, to: "#", active: false },
  { label: "Production", icon: SunIcon, to: "#", active: false },
  { label: "Quality", icon: ShieldCheckIcon, to: "#", active: false },
  { label: "Dispatch", icon: TruckIcon, to: "#", active: false },
  { label: "Documents", icon: FilesIcon, to: "#", active: false },
  { label: "Disputes", icon: CircleAlertIcon, to: "#", count: 3, countTone: "danger", active: false },
  { label: "Reports", icon: ChartNoAxesColumnIcon, to: "#", active: false },
]

export default function SidebarExample() {
  return (
    <div className="flex h-[560px] overflow-hidden rounded-lg border">
      <AppSidebar items={items} footer="v2.4 · Shop floor" />
      <AppSidebar items={items} collapsed className="border-l" />
      <div className="flex-1 bg-background" />
    </div>
  )
}
