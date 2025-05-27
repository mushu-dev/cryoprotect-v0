import type React from "react"
import type { Metadata } from "next"
import { SidebarNav } from "@/components/sidebar-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Dashboard | CryoProtect v2",
  description: "Cryoprotectant research and analysis platform",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Link href="/" className="flex items-center gap-2 md:hidden">
              <Image src="/logo.svg" alt="CryoProtect Logo" width={32} height={32} className="h-8 w-8" />
            </Link>
            <div className="hidden md:flex md:w-64 lg:w-[300px] relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search molecules, mixtures..." className="h-9 md:w-64 lg:w-[300px] pl-8" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <div className="flex flex-1">
          <SidebarNav />
          <SidebarInset>
            <Suspense>
              <main className="flex-1">{children}</main>
            </Suspense>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
