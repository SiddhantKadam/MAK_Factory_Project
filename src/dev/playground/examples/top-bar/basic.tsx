import { SearchInput } from "@/components/forms/search-input"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { NotificationButton, TopBar, UserMenu } from "@/components/layout/top-bar"
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

export default function TopBarExample() {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <TopBar
        start={<Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Purchase Orders" }]} />}
        actions={
          <>
            <SearchInput placeholder="Search PO # or client…" className="w-64" aria-label="Search" />
            <NotificationButton unread />
            <UserMenu name="M. Delgado" role="Planning Officer">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Switch plant</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
            </UserMenu>
          </>
        }
      />
    </div>
  )
}
