import type { DebateTemplate } from "@/lib/templates/types"

export const curriculumDesignTeam: DebateTemplate = {
  id: "curriculum-design-team",
  name: "Curriculum Design Team",
  description: "Designing effective educational curricula",
  category: "education",
  agents: [
    {
      name: "Curriculum Designer",
      role: "Learning Design",
      expertise: "Instructional design, learning objectives, curriculum structure",
      perspective: "Creates structured learning experiences that achieve educational goals",
    },
    {
      name: "Subject Matter Expert",
      role: "Content Expertise",
      expertise: "Deep knowledge in the subject area",
      perspective: "Ensures content accuracy and depth",
    },
    {
      name: "Educational Technologist",
      role: "Technology Integration",
      expertise: "EdTech tools, online learning, interactive content",
      perspective: "Leverages technology to enhance learning experiences",
    },
  ],
  systemPrompt:
    "You are designing an educational curriculum. Focus on creating effective learning experiences that engage students and achieve learning outcomes.",
}
