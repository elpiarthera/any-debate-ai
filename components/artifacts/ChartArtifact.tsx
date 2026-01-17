"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, LineChart, PieChart, Download, RefreshCw } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { ChartData } from "@/lib/artifacts"

interface ChartArtifactProps {
  data: ChartData
  collaboratingAgents?: string[]
  onUpdate?: (data: Partial<ChartData>) => void
}

const CHART_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#00ff00",
  "#ff00ff",
  "#00ffff",
  "#ff0000",
  "#0000ff",
  "#ffff00",
]

export function ChartArtifact({ data, collaboratingAgents = [], onUpdate }: ChartArtifactProps) {
  const getChartIcon = () => {
    switch (data.type) {
      case "bar":
        return <BarChart3 className="h-5 w-5 text-primary" />
      case "line":
        return <LineChart className="h-5 w-5 text-primary" />
      case "pie":
        return <PieChart className="h-5 w-5 text-primary" />
      default:
        return <BarChart3 className="h-5 w-5 text-primary" />
    }
  }

  const renderChart = () => {
    const commonProps = {
      data: data.data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    }

    switch (data.type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart {...commonProps}>
              {data.config?.grid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={data.config?.xAxis || Object.keys(data.data[0] || {})[0]} />
              <YAxis />
              <Tooltip />
              {data.config?.legend && <Legend />}
              {Object.keys(data.data[0] || {})
                .filter((key) => key !== (data.config?.xAxis || Object.keys(data.data[0] || {})[0]))
                .map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={data.config?.colors?.[index] || CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
            </BarChart>
          </ResponsiveContainer>
        )

      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart {...commonProps}>
              {data.config?.grid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={data.config?.xAxis || Object.keys(data.data[0] || {})[0]} />
              <YAxis />
              <Tooltip />
              {data.config?.legend && <Legend />}
              {Object.keys(data.data[0] || {})
                .filter((key) => key !== (data.config?.xAxis || Object.keys(data.data[0] || {})[0]))
                .map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={data.config?.colors?.[index] || CHART_COLORS[index % CHART_COLORS.length]}
                    strokeWidth={2}
                  />
                ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        )

      case "pie":
        const pieData = data.data.map((item, index) => ({
          ...item,
          fill: data.config?.colors?.[index] || CHART_COLORS[index % CHART_COLORS.length],
        }))

        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <RechartsPieChart
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey={Object.keys(data.data[0] || {})[1] || "value"}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </RechartsPieChart>
              <Tooltip />
              {data.config?.legend && <Legend />}
            </RechartsPieChart>
          </ResponsiveContainer>
        )

      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Unsupported chart type: {data.type}</p>
            </div>
          </div>
        )
    }
  }

  return (
    <Card className="h-full bg-gradient-to-br from-background to-muted/20 border-border/50">
      <div className="h-full flex flex-col">
        {/* Chart Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            {getChartIcon()}
            <h3 className="font-medium">{data.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {data.type} Chart
            </Badge>
            <Badge variant="outline" className="text-xs">
              {data.data.length} points
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {collaboratingAgents.length > 0 && (
              <div className="flex -space-x-1">
                {collaboratingAgents.map((agent, index) => (
                  <motion.div
                    key={agent}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium animate-pulse"
                    style={{ zIndex: 10 - index }}
                  >
                    {agent.charAt(0)}
                  </motion.div>
                ))}
              </div>
            )}

            <Select value={data.type} onValueChange={(value) => onUpdate?.({ type: value as any })}>
              <SelectTrigger className="w-24 h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="pie">Pie</SelectItem>
                <SelectItem value="area">Area</SelectItem>
                <SelectItem value="scatter">Scatter</SelectItem>
              </SelectContent>
            </Select>

            <Button size="sm" variant="ghost" className="h-7">
              <RefreshCw className="h-3 w-3" />
            </Button>

            <Button size="sm" variant="ghost" className="h-7">
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Chart Content */}
        <div className="flex-1 p-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full">
            {renderChart()}
          </motion.div>
        </div>

        {/* Chart Footer */}
        <div className="border-t border-border/50 p-4 bg-muted/20">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              {data.metadata?.dataSource && <span>Source: {data.metadata.dataSource}</span>}
              {data.metadata?.description && <span>{data.metadata.description}</span>}
            </div>
            <span>
              Last updated:{" "}
              {data.metadata?.lastUpdated
                ? new Date(data.metadata.lastUpdated).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
