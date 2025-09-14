"use client"
import { useChat } from "@ai-sdk/react"
import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface ChatProps {
  onExerciseSelect?: (type: string) => void
}

export function Chat({ onExerciseSelect }: ChatProps) {
  const [input, setInput] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage, isLoading } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hi! I'm your writing coach. I'm here to help you practice making your writing more concise and impactful. Choose an exercise type from the sidebar to get started, or just tell me what you'd like to work on!",
      },
    ],
  })

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage({ text: input })
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-3 space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}

                <Card className={`max-w-2xl ${message.role === "user" ? "bg-primary text-primary-foreground" : ""}`}>
                  <CardContent className="p-2">
                    <div className="whitespace-pre-wrap text-balance">
                      {message.parts
                        ? message.parts.map((part, i) => {
                            switch (part.type) {
                              case "text":
                                return <span key={i}>{part.text}</span>
                              default:
                                return null
                            }
                          })
                        : message.content}
                    </div>
                  </CardContent>
                </Card>

                {message.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3 w-3 text-primary-foreground" />
                </div>
                <Card>
                  <CardContent className="p-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-shrink-0 border-t border-border p-3 bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            placeholder="Type your rewrite or ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 min-h-[60px] resize-none"
            onKeyDown={handleKeyDown}
          />
          <Button type="submit" disabled={!input.trim() || isLoading} size="icon" className="h-[60px] w-[60px]">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <div className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</div>
      </div>
    </div>
  )
}
