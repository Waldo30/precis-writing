"use client"
import { Separator } from "@/components/ui/separator"
import { FileText, MessageSquare, AlignLeft, BookOpen } from "lucide-react"

type ExerciseType = "phrases" | "sentences" | "paragraphs" | "essays"

const exerciseTypes = [
  { id: "phrases" as ExerciseType, label: "Phrases", icon: MessageSquare, description: "Short expressions" },
  { id: "sentences" as ExerciseType, label: "Sentences", icon: FileText, description: "Single sentences" },
  { id: "paragraphs" as ExerciseType, label: "Paragraphs", icon: AlignLeft, description: "Multiple sentences" },
  { id: "essays" as ExerciseType, label: "Essays", icon: BookOpen, description: "Full compositions" },
]

interface SidebarProps {
  onExerciseSelect: (type: ExerciseType) => void
}

export function Sidebar({ onExerciseSelect }: SidebarProps) {
  return (
    <div className="w-80 border-r border-border bg-sidebar p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-sidebar-foreground mb-2">Text Rewriter</h1>
        <p className="text-sm text-sidebar-foreground/70">Practice making your writing more concise</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-sidebar-foreground/90 mb-4">Exercise Types</h2>
        {exerciseTypes.map((type) => {
          const Icon = type.icon
          return (
            <button
              key={type.id}
              onClick={() => onExerciseSelect(type.id)}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
            >
              <Icon className="h-5 w-5" />
              <div>
                <div className="font-medium">{type.label}</div>
                <div className="text-xs opacity-70">{type.description}</div>
              </div>
            </button>
          )
        })}
      </div>

      <Separator className="my-6" />

      <div className="text-xs text-sidebar-foreground/60">
        Click any exercise type above to start a conversation with your AI writing coach.
      </div>
    </div>
  )
}
