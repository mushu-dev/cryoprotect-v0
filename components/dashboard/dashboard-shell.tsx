import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return <div className={cn("container mx-auto py-4 md:py-6 space-y-6", className)}>{children}</div>
}
