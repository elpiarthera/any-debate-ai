"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDevice } from "@/contexts/DeviceProvider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, ArrowUpDown, Plus, Download, Search, Trash2, Edit2, GripVertical } from "lucide-react"
import type { DataTableData } from "@/lib/artifacts"
import { toast } from "sonner"

interface DataTableArtifactProps {
  data: DataTableData
  collaboratingAgents?: string[]
  onUpdate?: (data: Partial<DataTableData>) => void
}

export function DataTableArtifact({ data, collaboratingAgents = [], onUpdate }: DataTableArtifactProps) {
  const { isMobile } = useDevice()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filterColumn, setFilterColumn] = useState<string | null>(null)
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnId: string } | null>(null)
  const [editValue, setEditValue] = useState("")

  const filteredRows = data.rows.filter((row) => {
    if (!searchTerm) return true
    return Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  })

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = String(a[sortColumn] || "")
    const bValue = String(b[sortColumn] || "")
    const comparison = aValue.localeCompare(bValue)
    return sortOrder === "asc" ? comparison : -comparison
  })

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(columnId)
      setSortOrder("asc")
    }
  }

  const handleAddRow = () => {
    const newRow: Record<string, any> = {}
    data.columns.forEach((col) => {
      newRow[col.id] = col.type === "number" ? 0 : col.type === "boolean" ? false : ""
    })

    onUpdate?.({
      rows: [...data.rows, newRow],
    })
    toast.success("Row added")
  }

  const handleDeleteRow = (rowIndex: number) => {
    const newRows = data.rows.filter((_, index) => index !== rowIndex)
    onUpdate?.({
      rows: newRows,
    })
    toast.success("Row deleted")
  }

  const handleStartEdit = (rowIndex: number, columnId: string) => {
    setEditingCell({ rowIndex, columnId })
    setEditValue(String(data.rows[rowIndex][columnId] || ""))
  }

  const handleSaveEdit = () => {
    if (!editingCell) return

    const newRows = [...data.rows]
    const column = data.columns.find((col) => col.id === editingCell.columnId)

    if (column?.type === "number") {
      newRows[editingCell.rowIndex][editingCell.columnId] = Number.parseFloat(editValue) || 0
    } else if (column?.type === "boolean") {
      newRows[editingCell.rowIndex][editingCell.columnId] = editValue.toLowerCase() === "true"
    } else {
      newRows[editingCell.rowIndex][editingCell.columnId] = editValue
    }

    onUpdate?.({ rows: newRows })
    setEditingCell(null)
    setEditValue("")
    toast.success("Cell updated")
  }

  const handleCancelEdit = () => {
    setEditingCell(null)
    setEditValue("")
  }

  return (
    <Card className="h-full bg-gradient-to-br from-background to-muted/20 border-border/50">
      <div className="h-full flex flex-col">
        {/* Table Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Table className="h-5 w-5 text-primary" />
            <h3 className="font-medium">{data.title}</h3>
            <Badge variant="secondary" className="text-xs">
              Data Table
            </Badge>
            <Badge variant="outline" className="text-xs">
              {data.rows.length} rows × {data.columns.length} cols
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

            <Button size="sm" variant="ghost" className={`h-7 ${isMobile ? "min-h-[44px]" : ""}`}>
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Table Controls */}
        <div
          className={`flex items-center gap-3 p-4 border-b border-border/50 bg-muted/20 ${isMobile ? "flex-col" : ""}`}
        >
          <div className="flex items-center gap-2 flex-1 w-full">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search table..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`h-8 bg-background/50 ${isMobile ? "min-h-[48px]" : ""}`}
            />
          </div>

          <div className={`flex items-center gap-2 ${isMobile ? "w-full" : ""}`}>
            <Select value={filterColumn || "all"} onValueChange={(value) => setFilterColumn(value || null)}>
              <SelectTrigger className={`w-32 h-8 ${isMobile ? "min-h-[48px] flex-1" : ""}`}>
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All columns</SelectItem>
                {data.columns.map((column) => (
                  <SelectItem key={column.id} value={column.id}>
                    {column.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              size="sm"
              variant="ghost"
              className={`h-8 ${isMobile ? "min-h-[48px]" : ""}`}
              onClick={handleAddRow}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Row
            </Button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-background/90 backdrop-blur-sm">
                <tr className="border-b border-border">
                  {!isMobile && <th className="w-10"></th>}
                  {data.columns.map((column, index) => (
                    <motion.th
                      key={column.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-left p-3 font-medium cursor-pointer hover:bg-muted/20 transition-colors"
                      style={{ width: column.width ? `${column.width}px` : "auto" }}
                      onClick={() => handleSort(column.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span>{column.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {column.type}
                        </Badge>
                        <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                        {sortColumn === column.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`w-2 h-2 rounded-full ${sortOrder === "asc" ? "bg-green-500" : "bg-red-500"}`}
                          />
                        )}
                      </div>
                    </motion.th>
                  ))}
                  <th className="w-20"></th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {sortedRows.map((row, rowIndex) => (
                    <motion.tr
                      key={rowIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: rowIndex * 0.02 }}
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors group"
                    >
                      {!isMobile && (
                        <td className="p-3">
                          <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-move" />
                        </td>
                      )}
                      {data.columns.map((column) => (
                        <td key={column.id} className="p-3">
                          {editingCell?.rowIndex === rowIndex && editingCell?.columnId === column.id ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleSaveEdit()
                                  if (e.key === "Escape") handleCancelEdit()
                                }}
                                className={`h-7 ${isMobile ? "min-h-[48px]" : ""}`}
                                autoFocus
                              />
                              <Button
                                size="sm"
                                onClick={handleSaveEdit}
                                className={`h-7 ${isMobile ? "min-h-[44px] opacity-100" : ""}`}
                              >
                                <Edit2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <div
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={() => handleStartEdit(rowIndex, column.id)}
                            >
                              {column.type === "boolean" ? (
                                <Badge variant={row[column.id] ? "default" : "secondary"} className="text-xs">
                                  {row[column.id] ? "Yes" : "No"}
                                </Badge>
                              ) : column.type === "number" ? (
                                <span className="font-mono text-sm">{row[column.id]}</span>
                              ) : (
                                <span className="text-sm">{row[column.id]}</span>
                              )}
                            </div>
                          )}
                        </td>
                      ))}
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteRow(rowIndex)}
                          className={`h-7 opacity-0 group-hover:opacity-100 transition-opacity ${isMobile ? "min-h-[44px] opacity-100" : ""}`}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Footer */}
        <div className="border-t border-border/50 p-4 bg-muted/20">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing {sortedRows.length} of {data.rows.length} rows
              {searchTerm && ` (filtered by "${searchTerm}")`}
            </span>
            <div className="flex items-center gap-4">
              {data.metadata?.sortBy && (
                <span>
                  Sorted by: {data.metadata.sortBy} ({data.metadata.sortOrder})
                </span>
              )}
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
