import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export const metadata: Metadata = {
  title: "Authentication | CryoProtect v2",
  description: "Authentication pages for CryoProtect v2",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="CryoProtect Logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-semibold">CryoProtect v2</span>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">{children}</main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container">© {new Date().getFullYear()} CryoProtect. All rights reserved.</div>
      </footer>
    </div>
  )
}
