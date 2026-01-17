import { artifactOrganizer, type OrganizedArtifact } from "@/lib/artifacts/organization"

// Initialize mock folders
const folders = [
  { name: "Product Strategy", description: "Product planning and roadmaps", color: "#3b82f6" },
  { name: "Research", description: "Research documents and findings", color: "#8b5cf6" },
  { name: "Marketing", description: "Marketing materials and campaigns", color: "#ec4899" },
  { name: "Engineering", description: "Technical documentation", color: "#10b981" },
]

folders.forEach((folder) => {
  artifactOrganizer.createFolder(folder)
})

// Initialize mock tags
const tags = [
  { name: "Important", color: "#ef4444" },
  { name: "In Progress", color: "#f59e0b" },
  { name: "Completed", color: "#10b981" },
  { name: "Review", color: "#3b82f6" },
  { name: "Draft", color: "#6b7280" },
]

tags.forEach((tag) => {
  artifactOrganizer.addTag(tag.name, tag.color)
})

// Initialize mock artifacts
const mockArtifacts: OrganizedArtifact[] = [
  {
    id: "artifact-1",
    type: "document",
    title: "Product Roadmap Q1 2025",
    data: {
      sections: [
        { title: "Overview", content: "Strategic goals for Q1 2025..." },
        { title: "Key Features", content: "Feature prioritization and timeline..." },
      ],
    },
    folderId: artifactOrganizer.getAllFolders()[0]?.id,
    tags: ["important", "in-progress"],
    isFavorite: true,
    isPinned: true,
    createdAt: Date.now() - 7 * 86400000,
    updatedAt: Date.now() - 3600000,
    lastAccessedAt: Date.now() - 1800000,
    metadata: {
      author: "Sarah Chen",
      collaborators: ["GPT-4", "Claude"],
      wordCount: 2450,
    },
  },
  {
    id: "artifact-2",
    type: "data-table",
    title: "User Research Findings",
    data: {
      headers: ["Feature", "Priority", "User Impact", "Effort"],
      rows: [
        ["Dark Mode", "High", "85%", "Medium"],
        ["Export Options", "Medium", "60%", "Low"],
        ["Collaboration", "High", "90%", "High"],
      ],
    },
    folderId: artifactOrganizer.getAllFolders()[1]?.id,
    tags: ["completed", "review"],
    isFavorite: false,
    isPinned: false,
    createdAt: Date.now() - 14 * 86400000,
    updatedAt: Date.now() - 86400000,
    lastAccessedAt: Date.now() - 7200000,
    metadata: {
      author: "Marcus Rodriguez",
      collaborators: ["Gemini", "Grok"],
      rowCount: 3,
    },
  },
  {
    id: "artifact-3",
    type: "checklist",
    title: "Launch Checklist",
    data: {
      items: [
        { id: "1", text: "Complete user testing", completed: true },
        { id: "2", text: "Update documentation", completed: true },
        { id: "3", text: "Deploy to production", completed: false },
        { id: "4", text: "Send announcement", completed: false },
      ],
    },
    folderId: artifactOrganizer.getAllFolders()[2]?.id,
    tags: ["in-progress"],
    isFavorite: true,
    isPinned: false,
    createdAt: Date.now() - 3 * 86400000,
    updatedAt: Date.now() - 7200000,
    lastAccessedAt: Date.now() - 3600000,
    metadata: {
      author: "Emily Watson",
      itemCount: 4,
    },
  },
  {
    id: "artifact-4",
    type: "chart",
    title: "Performance Metrics",
    data: {
      type: "line",
      labels: ["Jan", "Feb", "Mar", "Apr"],
      datasets: [
        {
          label: "Response Time",
          data: [120, 95, 85, 75],
        },
      ],
    },
    folderId: artifactOrganizer.getAllFolders()[3]?.id,
    tags: ["review"],
    isFavorite: false,
    isPinned: false,
    createdAt: Date.now() - 5 * 86400000,
    updatedAt: Date.now() - 14400000,
    lastAccessedAt: Date.now() - 10800000,
    metadata: {
      author: "David Kim",
      collaborators: ["GPT-4"],
    },
  },
  {
    id: "artifact-5",
    type: "document",
    title: "API Documentation",
    data: {
      sections: [
        { title: "Authentication", content: "OAuth 2.0 implementation details..." },
        { title: "Endpoints", content: "REST API endpoint specifications..." },
      ],
    },
    folderId: artifactOrganizer.getAllFolders()[3]?.id,
    tags: ["draft"],
    isFavorite: false,
    isPinned: false,
    createdAt: Date.now() - 10 * 86400000,
    updatedAt: Date.now() - 28800000,
    lastAccessedAt: Date.now() - 21600000,
    metadata: {
      author: "Alex Thompson",
      wordCount: 3200,
    },
  },
  {
    id: "artifact-6",
    type: "data-table",
    title: "Competitor Analysis",
    data: {
      headers: ["Company", "Feature Set", "Pricing", "Market Share"],
      rows: [
        ["Competitor A", "Advanced", "$99/mo", "35%"],
        ["Competitor B", "Basic", "$49/mo", "25%"],
        ["Competitor C", "Premium", "$149/mo", "20%"],
      ],
    },
    folderId: artifactOrganizer.getAllFolders()[1]?.id,
    tags: ["completed"],
    isFavorite: true,
    isPinned: false,
    createdAt: Date.now() - 21 * 86400000,
    updatedAt: Date.now() - 172800000,
    lastAccessedAt: Date.now() - 86400000,
    metadata: {
      author: "Sarah Chen",
      rowCount: 3,
    },
  },
]

// Add all mock artifacts to the organizer
mockArtifacts.forEach((artifact) => {
  artifactOrganizer.addArtifact(artifact)
})

export { mockArtifacts }
