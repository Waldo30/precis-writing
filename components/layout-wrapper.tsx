"use client"
import { Sidebar } from "@/components/sidebar"
import type React from "react"

import { useChat } from "@ai-sdk/react"

type ExerciseType = "phrases" | "sentences" | "paragraphs" | "essays"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { sendMessage } = useChat()

  const handleExerciseSelect = (type: ExerciseType) => {
    sendMessage({ text: `Present me a ${type.slice(0, -1)} for rewrite now.` })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <Sidebar onExerciseSelect={handleExerciseSelect} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
