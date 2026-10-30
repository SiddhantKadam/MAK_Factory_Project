import { LogOutIcon, UserIcon } from "lucide-react"
import { Link, Outlet, useLocation, useNavigate } from "react-router"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs"
import { NotificationButton, TopBar, UserMenu } from "@/components/layout/top-bar"
import { SearchInput } from "@/components/forms/search-input"
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { navItems } from "@/app/nav-items"
import { useAuth } from "@/features/auth/auth-context"

/** Main application frame. The dev playground deliberately does not use this. */
export function AppLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  // No route guard yet (UI only), so /dashboard also opens without signing in.
  const name = user?.name ?? "Guest"
  const role = user?.role ?? "Not signed in"

  const current = navItems.find((item) => pathname.startsWith(item.to))
  const crumbs: Crumb[] =
    current?.to === "/dashboard"
      ? [{ label: "Dashboard" }]
      : [{ label: "Home", to: "/dashboard" }, ...(current ? [{ label: current.label }] : [])]

  const handleSignOut = () => {
    signOut()
    navigate("/login", { replace: true })
  }

  return (
    <div className="flex h-svh overflow-hidden bg-background">
      <AppSidebar
        items={navItems}
        footer={
          <div className="flex items-center justify-between gap-2">
            <span>v0.1 · Phase 1</span>
            {__SHOW_PLAYGROUND__ && (
              <Link to="/dev/components" className="text-link hover:underline">
                UI kit ↗
              </Link>
            )}
          </div>
        }
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          start={<Breadcrumbs items={crumbs} />}
          actions={
            <>
              <SearchInput placeholder="Search PO # or client…" className="hidden w-72 lg:block" />
              <NotificationButton unread />
              <UserMenu name={name} role={role}>
                {user && (
                  <>
                    <DropdownMenuLabel className="font-mono text-xs font-normal text-muted-foreground">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem>
                  <UserIcon /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onSelect={handleSignOut}>
                  <LogOutIcon /> {user ? "Sign out" : "Go to sign in"}
                </DropdownMenuItem>
              </UserMenu>
            </>
          }
        />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
