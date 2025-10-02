import type { DocumentData, DataTableData, ChecklistData, ChartData } from "@/lib/artifacts"

export interface ArtifactTemplate {
  id: string
  name: string
  description: string
  type: "document" | "data-table" | "checklist" | "chart"
  icon: string
  data: DocumentData | DataTableData | ChecklistData | ChartData
  category: string
  tags: string[]
}

// Document Templates
export const documentTemplates: ArtifactTemplate[] = [
  {
    id: "blank-document",
    name: "Blank Document",
    description: "Start with an empty document",
    type: "document",
    icon: "📄",
    category: "General",
    tags: ["blank", "basic"],
    data: {
      title: "Untitled Document",
      content: "",
      sections: [],
      metadata: {
        author: "User",
        createdAt: new Date().toISOString(),
        tags: [],
      },
    },
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    description: "Structured template for meeting documentation",
    type: "document",
    icon: "📝",
    category: "Business",
    tags: ["meeting", "notes", "business"],
    data: {
      title: "Meeting Notes",
      content: "",
      sections: [
        { id: "1", title: "Attendees", content: "", order: 1 },
        { id: "2", title: "Agenda", content: "", order: 2 },
        { id: "3", title: "Discussion Points", content: "", order: 3 },
        { id: "4", title: "Action Items", content: "", order: 4 },
        { id: "5", title: "Next Steps", content: "", order: 5 },
      ],
      metadata: {
        author: "User",
        createdAt: new Date().toISOString(),
        tags: ["meeting", "notes"],
      },
    },
  },
  {
    id: "project-brief",
    name: "Project Brief",
    description: "Standard project planning template",
    type: "document",
    icon: "📋",
    category: "Business",
    tags: ["project", "planning", "business"],
    data: {
      title: "Project Brief",
      content: "",
      sections: [
        { id: "1", title: "Executive Summary", content: "", order: 1 },
        { id: "2", title: "Project Goals", content: "", order: 2 },
        { id: "3", title: "Scope & Deliverables", content: "", order: 3 },
        { id: "4", title: "Timeline", content: "", order: 4 },
        { id: "5", title: "Budget", content: "", order: 5 },
        { id: "6", title: "Team & Resources", content: "", order: 6 },
        { id: "7", title: "Risks & Mitigation", content: "", order: 7 },
      ],
      metadata: {
        author: "User",
        createdAt: new Date().toISOString(),
        tags: ["project", "brief"],
      },
    },
  },
  {
    id: "report-template",
    name: "Report Template",
    description: "Executive summary and report format",
    type: "document",
    icon: "📊",
    category: "Business",
    tags: ["report", "analysis", "business"],
    data: {
      title: "Report",
      content: "",
      sections: [
        { id: "1", title: "Executive Summary", content: "", order: 1 },
        { id: "2", title: "Introduction", content: "", order: 2 },
        { id: "3", title: "Methodology", content: "", order: 3 },
        { id: "4", title: "Findings", content: "", order: 4 },
        { id: "5", title: "Analysis", content: "", order: 5 },
        { id: "6", title: "Recommendations", content: "", order: 6 },
        { id: "7", title: "Conclusion", content: "", order: 7 },
      ],
      metadata: {
        author: "User",
        createdAt: new Date().toISOString(),
        tags: ["report", "analysis"],
      },
    },
  },
  {
    id: "proposal-template",
    name: "Proposal Template",
    description: "Business proposal structure",
    type: "document",
    icon: "💼",
    category: "Business",
    tags: ["proposal", "business", "sales"],
    data: {
      title: "Business Proposal",
      content: "",
      sections: [
        { id: "1", title: "Cover Letter", content: "", order: 1 },
        { id: "2", title: "Problem Statement", content: "", order: 2 },
        { id: "3", title: "Proposed Solution", content: "", order: 3 },
        { id: "4", title: "Pricing & Timeline", content: "", order: 4 },
        { id: "5", title: "Qualifications", content: "", order: 5 },
        { id: "6", title: "Terms & Conditions", content: "", order: 6 },
      ],
      metadata: {
        author: "User",
        createdAt: new Date().toISOString(),
        tags: ["proposal", "business"],
      },
    },
  },
]

// Data Table Templates
export const dataTableTemplates: ArtifactTemplate[] = [
  {
    id: "blank-table",
    name: "Blank Table",
    description: "Start with an empty table",
    type: "data-table",
    icon: "📊",
    category: "General",
    tags: ["blank", "basic"],
    data: {
      title: "Data Table",
      columns: [
        { id: "col1", name: "Column 1", type: "text" },
        { id: "col2", name: "Column 2", type: "text" },
        { id: "col3", name: "Column 3", type: "text" },
      ],
      rows: [],
      metadata: {},
    },
  },
  {
    id: "task-tracker",
    name: "Task Tracker",
    description: "Track tasks with status and assignees",
    type: "data-table",
    icon: "✅",
    category: "Productivity",
    tags: ["tasks", "tracking", "project"],
    data: {
      title: "Task Tracker",
      columns: [
        { id: "task", name: "Task", type: "text", width: 200 },
        { id: "assignee", name: "Assignee", type: "text", width: 120 },
        { id: "status", name: "Status", type: "select", width: 100 },
        { id: "priority", name: "Priority", type: "select", width: 100 },
        { id: "dueDate", name: "Due Date", type: "date", width: 120 },
      ],
      rows: [
        {
          task: "Example Task",
          assignee: "John Doe",
          status: "In Progress",
          priority: "High",
          dueDate: new Date().toISOString().split("T")[0],
        },
      ],
      metadata: {},
    },
  },
  {
    id: "budget-planner",
    name: "Budget Planner",
    description: "Financial tracking and budgeting",
    type: "data-table",
    icon: "💰",
    category: "Finance",
    tags: ["budget", "finance", "money"],
    data: {
      title: "Budget Planner",
      columns: [
        { id: "category", name: "Category", type: "text", width: 150 },
        { id: "budgeted", name: "Budgeted", type: "number", width: 120 },
        { id: "actual", name: "Actual", type: "number", width: 120 },
        { id: "difference", name: "Difference", type: "number", width: 120 },
        { id: "notes", name: "Notes", type: "text", width: 200 },
      ],
      rows: [
        { category: "Revenue", budgeted: 10000, actual: 9500, difference: -500, notes: "" },
        { category: "Expenses", budgeted: 7000, actual: 7200, difference: 200, notes: "" },
      ],
      metadata: {},
    },
  },
  {
    id: "contact-list",
    name: "Contact List",
    description: "Manage contacts and information",
    type: "data-table",
    icon: "👥",
    category: "Business",
    tags: ["contacts", "crm", "people"],
    data: {
      title: "Contact List",
      columns: [
        { id: "name", name: "Name", type: "text", width: 150 },
        { id: "email", name: "Email", type: "text", width: 200 },
        { id: "phone", name: "Phone", type: "text", width: 120 },
        { id: "company", name: "Company", type: "text", width: 150 },
        { id: "notes", name: "Notes", type: "text", width: 200 },
      ],
      rows: [],
      metadata: {},
    },
  },
  {
    id: "inventory-sheet",
    name: "Inventory Sheet",
    description: "Track stock and inventory",
    type: "data-table",
    icon: "📦",
    category: "Business",
    tags: ["inventory", "stock", "warehouse"],
    data: {
      title: "Inventory Sheet",
      columns: [
        { id: "item", name: "Item", type: "text", width: 150 },
        { id: "sku", name: "SKU", type: "text", width: 100 },
        { id: "quantity", name: "Quantity", type: "number", width: 100 },
        { id: "location", name: "Location", type: "text", width: 120 },
        { id: "reorderPoint", name: "Reorder Point", type: "number", width: 120 },
      ],
      rows: [],
      metadata: {},
    },
  },
]

// Checklist Templates
export const checklistTemplates: ArtifactTemplate[] = [
  {
    id: "blank-checklist",
    name: "Blank Checklist",
    description: "Start with an empty checklist",
    type: "checklist",
    icon: "☑️",
    category: "General",
    tags: ["blank", "basic"],
    data: {
      title: "Checklist",
      description: "",
      items: [],
      metadata: {
        completedCount: 0,
        totalCount: 0,
        progress: 0,
      },
    },
  },
  {
    id: "project-launch",
    name: "Project Launch",
    description: "Complete project launch checklist",
    type: "checklist",
    icon: "🚀",
    category: "Business",
    tags: ["project", "launch", "business"],
    data: {
      title: "Project Launch Checklist",
      description: "Essential steps for launching a new project",
      items: [
        { id: "1", text: "Define project scope and objectives", completed: false, priority: "high" },
        { id: "2", text: "Assemble project team", completed: false, priority: "high" },
        { id: "3", text: "Create project timeline", completed: false, priority: "high" },
        { id: "4", text: "Set up communication channels", completed: false, priority: "medium" },
        { id: "5", text: "Establish success metrics", completed: false, priority: "high" },
        { id: "6", text: "Conduct kickoff meeting", completed: false, priority: "medium" },
        { id: "7", text: "Set up project tracking tools", completed: false, priority: "medium" },
        { id: "8", text: "Review and approve budget", completed: false, priority: "high" },
      ],
      metadata: {
        completedCount: 0,
        totalCount: 8,
        progress: 0,
        category: "Project Management",
      },
    },
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "Comprehensive code review checklist",
    type: "checklist",
    icon: "💻",
    category: "Development",
    tags: ["code", "review", "development"],
    data: {
      title: "Code Review Checklist",
      description: "Ensure code quality and best practices",
      items: [
        { id: "1", text: "Code follows style guidelines", completed: false, priority: "medium" },
        { id: "2", text: "No console.log or debug statements", completed: false, priority: "medium" },
        { id: "3", text: "Error handling is implemented", completed: false, priority: "high" },
        { id: "4", text: "Tests are written and passing", completed: false, priority: "high" },
        { id: "5", text: "Documentation is updated", completed: false, priority: "medium" },
        { id: "6", text: "No security vulnerabilities", completed: false, priority: "high" },
        { id: "7", text: "Performance considerations addressed", completed: false, priority: "medium" },
        { id: "8", text: "Accessibility requirements met", completed: false, priority: "high" },
      ],
      metadata: {
        completedCount: 0,
        totalCount: 8,
        progress: 0,
        category: "Development",
      },
    },
  },
  {
    id: "meeting-prep",
    name: "Meeting Preparation",
    description: "Prepare for effective meetings",
    type: "checklist",
    icon: "📅",
    category: "Business",
    tags: ["meeting", "preparation", "business"],
    data: {
      title: "Meeting Preparation Checklist",
      description: "Steps to prepare for a productive meeting",
      items: [
        { id: "1", text: "Define meeting objectives", completed: false, priority: "high" },
        { id: "2", text: "Create and share agenda", completed: false, priority: "high" },
        { id: "3", text: "Invite required attendees", completed: false, priority: "high" },
        { id: "4", text: "Book meeting room/setup video call", completed: false, priority: "medium" },
        { id: "5", text: "Prepare presentation materials", completed: false, priority: "medium" },
        { id: "6", text: "Review previous meeting notes", completed: false, priority: "low" },
        { id: "7", text: "Test technology/equipment", completed: false, priority: "medium" },
      ],
      metadata: {
        completedCount: 0,
        totalCount: 7,
        progress: 0,
        category: "Meetings",
      },
    },
  },
  {
    id: "onboarding",
    name: "Employee Onboarding",
    description: "New employee onboarding process",
    type: "checklist",
    icon: "👋",
    category: "HR",
    tags: ["onboarding", "hr", "employee"],
    data: {
      title: "Employee Onboarding Checklist",
      description: "Complete onboarding process for new hires",
      items: [
        { id: "1", text: "Complete paperwork and documentation", completed: false, priority: "high" },
        { id: "2", text: "Set up workstation and equipment", completed: false, priority: "high" },
        { id: "3", text: "Create email and system accounts", completed: false, priority: "high" },
        { id: "4", text: "Assign mentor/buddy", completed: false, priority: "medium" },
        { id: "5", text: "Schedule orientation sessions", completed: false, priority: "high" },
        { id: "6", text: "Provide company handbook", completed: false, priority: "medium" },
        { id: "7", text: "Introduce to team members", completed: false, priority: "medium" },
        { id: "8", text: "Set 30/60/90 day goals", completed: false, priority: "high" },
      ],
      metadata: {
        completedCount: 0,
        totalCount: 8,
        progress: 0,
        category: "Human Resources",
      },
    },
  },
]

// Chart Templates
export const chartTemplates: ArtifactTemplate[] = [
  {
    id: "blank-chart",
    name: "Blank Chart",
    description: "Start with an empty chart",
    type: "chart",
    icon: "📈",
    category: "General",
    tags: ["blank", "basic"],
    data: {
      title: "Chart",
      type: "bar",
      data: [],
      config: {
        showLegend: true,
        showGrid: true,
      },
      metadata: {},
    },
  },
  {
    id: "sales-dashboard",
    name: "Sales Dashboard",
    description: "Track sales metrics over time",
    type: "chart",
    icon: "💹",
    category: "Business",
    tags: ["sales", "revenue", "business"],
    data: {
      title: "Sales Dashboard",
      type: "line",
      data: [
        { month: "Jan", revenue: 12000, target: 10000 },
        { month: "Feb", revenue: 15000, target: 12000 },
        { month: "Mar", revenue: 18000, target: 15000 },
        { month: "Apr", revenue: 16000, target: 15000 },
        { month: "May", revenue: 20000, target: 18000 },
        { month: "Jun", revenue: 22000, target: 20000 },
      ],
      config: {
        xAxis: "month",
        showLegend: true,
        showGrid: true,
      },
      metadata: {
        dataSource: "Sales Database",
        description: "Monthly revenue vs target",
      },
    },
  },
  {
    id: "performance-metrics",
    name: "Performance Metrics",
    description: "Track KPIs and performance indicators",
    type: "chart",
    icon: "📊",
    category: "Business",
    tags: ["kpi", "performance", "metrics"],
    data: {
      title: "Performance Metrics",
      type: "bar",
      data: [
        { metric: "Customer Satisfaction", score: 85 },
        { metric: "Response Time", score: 92 },
        { metric: "Quality Score", score: 88 },
        { metric: "Efficiency", score: 90 },
        { metric: "Innovation", score: 78 },
      ],
      config: {
        xAxis: "metric",
        yAxis: "score",
        showLegend: false,
        showGrid: true,
      },
      metadata: {
        description: "Key performance indicators",
      },
    },
  },
  {
    id: "comparison-chart",
    name: "Comparison Chart",
    description: "Side-by-side comparison of data",
    type: "chart",
    icon: "⚖️",
    category: "Analysis",
    tags: ["comparison", "analysis"],
    data: {
      title: "Product Comparison",
      type: "bar",
      data: [
        { product: "Product A", sales: 450, profit: 120 },
        { product: "Product B", sales: 380, profit: 95 },
        { product: "Product C", sales: 520, profit: 145 },
        { product: "Product D", sales: 290, profit: 75 },
      ],
      config: {
        xAxis: "product",
        showLegend: true,
        showGrid: true,
      },
      metadata: {
        description: "Sales and profit comparison",
      },
    },
  },
  {
    id: "trend-analysis",
    name: "Trend Analysis",
    description: "Analyze trends over time",
    type: "chart",
    icon: "📉",
    category: "Analysis",
    tags: ["trend", "analysis", "time-series"],
    data: {
      title: "Trend Analysis",
      type: "area",
      data: [
        { quarter: "Q1 2024", value: 45 },
        { quarter: "Q2 2024", value: 52 },
        { quarter: "Q3 2024", value: 48 },
        { quarter: "Q4 2024", value: 61 },
        { quarter: "Q1 2025", value: 58 },
      ],
      config: {
        xAxis: "quarter",
        yAxis: "value",
        showLegend: false,
        showGrid: true,
      },
      metadata: {
        description: "Quarterly trend analysis",
      },
    },
  },
]

// Export all templates
export const allTemplates: ArtifactTemplate[] = [
  ...documentTemplates,
  ...dataTableTemplates,
  ...checklistTemplates,
  ...chartTemplates,
]

// Helper functions
export function getTemplatesByType(type: ArtifactTemplate["type"]): ArtifactTemplate[] {
  return allTemplates.filter((template) => template.type === type)
}

export function getTemplatesByCategory(category: string): ArtifactTemplate[] {
  return allTemplates.filter((template) => template.category === category)
}

export function getTemplateById(id: string): ArtifactTemplate | undefined {
  return allTemplates.find((template) => template.id === id)
}

export function searchTemplates(query: string): ArtifactTemplate[] {
  const lowerQuery = query.toLowerCase()
  return allTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(lowerQuery) ||
      template.description.toLowerCase().includes(lowerQuery) ||
      template.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}

export const templateCategories = Array.from(new Set(allTemplates.map((t) => t.category)))
