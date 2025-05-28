"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Lightbulb,
  BarChart2,
  Search,
  FlaskRoundIcon as Flask,
  Beaker,
  TestTube,
  Brain,
  FileText,
  Database,
  BookOpen,
  Settings,
  HelpCircle,
  Upload,
  PlusCircle,
  Bell,
  LogOut,
} from "lucide-react"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
  indent?: boolean
}

const NavItem = ({ href, icon, label, active, indent = false }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
        active ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800/50",
        indent && "ml-6",
      )}
    >
      {icon}
      <span>{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />}
    </Link>
  )
}

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="px-3 py-2">
      <h3 className="text-xs font-medium text-slate-400">{title}</h3>
    </div>
  )
}

interface NavbarProps {
  children: React.ReactNode
}

export function Navbar({ children }: NavbarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-56 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">
              CP
            </div>
            <div>
              <h1 className="text-white font-semibold">CryoProtect</h1>
              <p className="text-xs text-slate-400">
                AI Cryoprotectant
                <br />
                Discovery
              </p>
            </div>
          </div>

          <SectionTitle title="OVERVIEW" />
          <NavItem href="/" icon={<LayoutDashboard size={18} />} label="Dashboard" active={isActive("/")} />
          <NavItem href="/discovery" icon={<Lightbulb size={18} />} label="Discovery" active={isActive("/discovery")} />
          <NavItem href="/analytics" icon={<BarChart2 size={18} />} label="Analytics" active={isActive("/analytics")} />
          <NavItem href="/search" icon={<Search size={18} />} label="Search" active={isActive("/search")} />

          <SectionTitle title="RESEARCH" />
          <NavItem href="/molecules" icon={<Flask size={18} />} label="Molecules" active={isActive("/molecules")} />
          <NavItem href="/mixtures" icon={<Beaker size={18} />} label="Mixtures" active={isActive("/mixtures")} />
          <NavItem
            href="/experiments"
            icon={<TestTube size={18} />}
            label="Experiments"
            active={isActive("/experiments")}
          />
          <NavItem href="/predictions" icon={<Brain size={18} />} label="Learning" active={isActive("/predictions")} />

          <SectionTitle title="RESOURCES" />
          <NavItem href="/reports" icon={<FileText size={18} />} label="Reports" active={isActive("/reports")} />
          <NavItem
            href="/database-inspector"
            icon={<Database size={18} />}
            label="Database"
            active={isActive("/database-inspector")}
          />
          <NavItem
            href="/literature"
            icon={<BookOpen size={18} />}
            label="Literature"
            active={isActive("/literature")}
          />

          <div className="mt-auto pt-4">
            <NavItem href="/settings" icon={<Settings size={18} />} label="Settings" active={isActive("/settings")} />
            <NavItem href="/help" icon={<HelpCircle size={18} />} label="Help & Support" active={isActive("/help")} />
          </div>

          <div className="mt-4 p-3 bg-slate-800/50 rounded-md border border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-500">ML Models Online</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">99.4% accuracy • 156ms avg response</div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-white">Research Dashboard</h2>
            <div className="text-sm text-slate-400">
              Analyze cryoprotectant molecules, mixtures, and experiment results
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <Upload size={16} />
              Import Data
            </button>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <PlusCircle size={16} />
              New Experiment
            </button>
            <div className="flex items-center gap-2 ml-2">
              <button className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <Bell size={18} />
              </button>
              <button className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-6">{children}</div>
      </div>
    </div>
  )
}
