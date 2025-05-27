"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, { label: string; color: string }>
}

export function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  return (
    <div
      className={cn("recharts-wrapper", className)}
      style={
        config
          ? ({
              "--color-viability": config.viability?.color,
              "--color-recovery": config.recovery?.color,
              ...Object.entries(config).reduce(
                (acc, [key, value]) => ({
                  ...acc,
                  [`--color-${key.replace(/\s+/g, "-").toLowerCase()}`]: value.color,
                }),
                {},
              ),
            } as React.CSSProperties)
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
  formatter?: (value: number, name: string) => React.ReactNode
  labelFormatter?: (label: string) => React.ReactNode
  content?: React.ReactNode
}

export function ChartTooltip({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  content,
  ...props
}: ChartTooltipProps) {
  if (content) {
    return content
  }

  if (active && payload?.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {labelFormatter ? labelFormatter(label as string) : label}
            </span>
          </div>
          {payload.map((item) => (
            <div key={item.name} className="flex flex-col">
              <span
                className="flex items-center gap-1 text-[0.70rem] uppercase text-muted-foreground"
                style={{
                  color: item.color,
                }}
              >
                {item.name}
              </span>
              <span className="font-bold">{formatter ? formatter(item.value, item.name) : item.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  ...props
}: ChartTooltipProps & React.HTMLAttributes<HTMLDivElement>) {
  if (active && payload?.length) {
    return (
      <div className={cn("rounded-lg border bg-background p-2 shadow-sm", className)} {...props}>
        <div className="grid gap-0.5">
          <p className="text-xs font-medium">{label}</p>
          <div className="grid gap-1">
            {payload.map((entry, index) => (
              <div key={`item-${index}`} className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: entry.color,
                    }}
                  />
                  <span>{entry.name}</span>
                </div>
                <span className="font-medium tabular-nums">
                  {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}
