"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Beaker,
  LayoutDashboard,
  Settings,
  FileText,
  Users,
  TestTube,
  BarChart3,
  Search,
  Database,
  HelpCircle,
  BookOpen,
} from "lucide-react"
import { MoleculeIcon } from "@/components/icons/molecule-icon"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-md">
            <Image src="/logo.svg" alt="CryoProtect Logo" width={32} height={32} className="h-8 w-8" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-none">CryoProtect</span>
            <span className="text-xs text-muted-foreground">v2.0</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/analytics"} tooltip="Analytics">
                  <Link href="/analytics">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/search"} tooltip="Search">
                  <Link href="/search">
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Research</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/molecules" || pathname.startsWith("/molecules/")}
                  tooltip="Molecules"
                >
                  <Link href="/molecules">
                    <MoleculeIcon className="h-4 w-4" />
                    <span>Molecules</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/mixtures" || pathname.startsWith("/mixtures/")}
                  tooltip="Mixtures"
                >
                  <Link href="/mixtures">
                    <Beaker className="h-4 w-4" />
                    <span>Mixtures</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/experiments" || pathname.startsWith("/experiments/")}
                  tooltip="Experiments"
                >
                  <Link href="/experiments">
                    <TestTube className="h-4 w-4" />
                    <span>Experiments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/reports" || pathname.startsWith("/reports/")}
                  tooltip="Reports"
                >
                  <Link href="/reports">
                    <FileText className="h-4 w-4" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/database" || pathname.startsWith("/database/")}
                  tooltip="Database"
                >
                  <Link href="/database">
                    <Database className="h-4 w-4" />
                    <span>Database</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/literature" || pathname.startsWith("/literature/")}
                  tooltip="Literature"
                >
                  <Link href="/literature">
                    <BookOpen className="h-4 w-4" />
                    <span>Literature</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Team</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/team" || pathname.startsWith("/team/")}
                  tooltip="Team"
                >
                  <Link href="/team">
                    <Users className="h-4 w-4" />
                    <span>Collaborators</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/settings" || pathname.startsWith("/settings/")}
              tooltip="Settings"
            >
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/help" || pathname.startsWith("/help/")} tooltip="Help">
              <Link href="/help">
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
