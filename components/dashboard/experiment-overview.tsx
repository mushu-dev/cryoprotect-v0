"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExperimentOverviewProps {
  className?: string
  showLegend?: boolean
  height?: number
}

export function ExperimentOverview({ className, showLegend = false, height = 300 }: ExperimentOverviewProps) {
  const [timeRange, setTimeRange] = useState("6m")
  const [dataType, setDataType] = useState("all")

  // Sample data for experiment results over time
  const allData = {
    "1m": [
      { month: "Week 1", viability: 75, recovery: 68 },
      { month: "Week 2", viability: 76, recovery: 69 },
      { month: "Week 3", viability: 78, recovery: 70 },
      { month: "Week 4", viability: 80, recovery: 72 },
    ],
    "3m": [
      { month: "Jan", viability: 70, recovery: 62 },
      { month: "Feb", viability: 72, recovery: 65 },
      { month: "Mar", viability: 75, recovery: 68 },
    ],
    "6m": [
      { month: "Jan", viability: 65, recovery: 58 },
      { month: "Feb", viability: 68, recovery: 60 },
      { month: "Mar", viability: 70, recovery: 62 },
      { month: "Apr", viability: 72, recovery: 65 },
      { month: "May", viability: 75, recovery: 68 },
      { month: "Jun", viability: 78, recovery: 70 },
    ],
    "1y": [
      { month: "Jul", viability: 60, recovery: 52 },
      { month: "Aug", viability: 62, recovery: 54 },
      { month: "Sep", viability: 63, recovery: 55 },
      { month: "Oct", viability: 64, recovery: 56 },
      { month: "Nov", viability: 65, recovery: 57 },
      { month: "Dec", viability: 67, recovery: 59 },
      { month: "Jan", viability: 68, recovery: 60 },
      { month: "Feb", viability: 70, recovery: 62 },
      { month: "Mar", viability: 72, recovery: 65 },
      { month: "Apr", viability: 75, recovery: 68 },
      { month: "May", viability: 78, recovery: 70 },
      { month: "Jun", viability: 80, recovery: 72 },
    ],
  }

  const data = allData[timeRange as keyof typeof allData]

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Experiment Results</CardTitle>
          <CardDescription>Cell viability and recovery rates over time</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue placeholder="Data Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Data</SelectItem>
              <SelectItem value="viability">Viability</SelectItem>
              <SelectItem value="recovery">Recovery</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-8 w-[100px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            viability: {
              label: "Viability Rate",
              color: "hsl(var(--chart-1))",
            },
            recovery: {
              label: "Recovery Rate",
              color: "hsl(var(--chart-2))",
            },
          }}
          className={`h-[${height}px]`}
        >
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "rgba(100, 100, 100, 0.3)" }}
                axisLine={{ stroke: "rgba(100, 100, 100, 0.3)" }}
              />
              <YAxis
                domain={[50, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "rgba(100, 100, 100, 0.3)" }}
                axisLine={{ stroke: "rgba(100, 100, 100, 0.3)" }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ stroke: "rgba(100, 100, 100, 0.3)", strokeWidth: 1 }}
              />
              {(dataType === "all" || dataType === "viability") && (
                <Line
                  type="monotone"
                  dataKey="viability"
                  stroke="var(--color-viability)"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  name="Viability Rate"
                  animationDuration={1000}
                />
              )}
              {(dataType === "all" || dataType === "recovery") && (
                <Line
                  type="monotone"
                  dataKey="recovery"
                  stroke="var(--color-recovery)"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  name="Recovery Rate"
                  animationDuration={1000}
                />
              )}
              {showLegend && (
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ paddingTop: "10px" }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
