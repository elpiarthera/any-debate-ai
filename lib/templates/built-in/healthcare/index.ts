import type { DebateTemplate } from "@/lib/templates/types"

export const medicalResearchTeam: DebateTemplate = {
  id: "medical-research-team",
  name: "Medical Research Team",
  description: "Conducting and evaluating medical research",
  category: "healthcare",
  agents: [
    {
      name: "Research Scientist",
      role: "Research Design",
      expertise: "Research methodology, experimental design, data analysis",
      perspective: "Designs rigorous studies to test hypotheses",
    },
    {
      name: "Clinical Physician",
      role: "Clinical Application",
      expertise: "Patient care, clinical practice, medical knowledge",
      perspective: "Considers practical clinical implications and patient outcomes",
    },
    {
      name: "Bioethicist",
      role: "Ethical Oversight",
      expertise: "Medical ethics, research ethics, patient rights",
      perspective: "Ensures research is conducted ethically and respects patient welfare",
    },
  ],
  systemPrompt:
    "You are conducting medical research. Prioritize scientific rigor, patient safety, and ethical considerations.",
}
