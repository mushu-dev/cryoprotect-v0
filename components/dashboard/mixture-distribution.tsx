"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Sector } from "recharts"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MixtureDistributionProps {
  className?: string
  showLegend?: boolean
  height?: number
}

export function MixtureDistribution({ className, showLegend = false, height = 300 }: MixtureDistributionProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const [chartType, setChartType] = useState("type")

  // Sample data for mixture types distribution
  const mixtureData = {
    type: [
      { name: "DMSO-based", value: 35, color: "hsl(var(--chart-1))" },
      { name: "Glycerol-based", value: 25, color: "hsl(var(--chart-2))" },
      { name: "Ethylene Glycol", value: 20, color: "hsl(var(--chart-3))" },
      { name: "Propylene Glycol", value: 15, color: "hsl(var(--chart-4))" },
      { name: "Other", value: 5, color: "hsl(var(--chart-5))" },
    ],
    concentration: [
      { name: "Low (<10%)", value: 20, color: "hsl(var(--chart-1))" },
      { name: "Medium (10-20%)", value: 45, color: "hsl(var(--chart-2))" },
      { name: "High (>20%)", value: 35, color: "hsl(var(--chart-3))" },
    ],
    application: [
      { name: "Cell Preservation", value: 40, color: "hsl(var(--chart-1))" },
      { name: "Tissue Preservation", value: 30, color: "hsl(var(--chart-2))" },
      { name: "Organ Preservation", value: 20, color: "hsl(var(--chart-3))" },
      { name: "Other Applications", value: 10, color: "hsl(var(--chart-4))" },
    ],
  }

  const data = mixtureData[chartType as keyof typeof mixtureData]

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(undefined)
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Mixture Distribution</CardTitle>
          <CardDescription>Distribution of cryoprotectant mixtures</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="type">By Type</SelectItem>
              <SelectItem value="concentration">By Concentration</SelectItem>
              <SelectItem value="application">By Application</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={Object.fromEntries(
            data.map((item) => [
              item.name.replace(/\s+/g, "-").toLowerCase(),
              {
                label: item.name,
                color: item.color,
              },
            ]),
          )}
          className={`h-[${height}px]`}
        >
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={height > 350 ? 80 : 60}
                outerRadius={height > 350 ? 120 : 90}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" strokeWidth={2} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              {showLegend && (
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ paddingTop: "10px" }}
                />
              )}
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
