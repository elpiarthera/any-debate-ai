"use client"

import { useState } from "react"
import { useDevice } from "@/contexts/DeviceProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, ExternalLink, Check, X, Globe } from "lucide-react"

interface ScrapedContent {
  title: string
  description: string
  image?: string
  url: string
}

interface ExtractedMemory {
  id: string
  title: string
  content: string
  category: string
}

interface UrlScraperProps {
  onMemoriesExtracted?: (memories: ExtractedMemory[]) => void
}

export function UrlScraper({ onMemoriesExtracted }: UrlScraperProps) {
  const { isMobile } = useDevice()
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [scrapedContent, setScrapedContent] = useState<ScrapedContent | null>(null)
  const [extractedMemories, setExtractedMemories] = useState<ExtractedMemory[]>([])
  const [error, setError] = useState<string | null>(null)

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  const handleScrape = async () => {
    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL")
      return
    }

    setError(null)
    setIsLoading(true)

    // Simulate scraping delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock scraped content
    const mockContent: ScrapedContent = {
      title: "Understanding AI Debate Systems",
      description:
        "A comprehensive guide to building AI-powered debate platforms with multi-agent systems and memory management.",
      image: "/ai-debate-system.jpg",
      url: url,
    }

    setScrapedContent(mockContent)

    // Simulate AI extraction
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock extracted memories
    const mockMemories: ExtractedMemory[] = [
      {
        id: "1",
        title: "AI Debate Architecture",
        content:
          "Multi-agent debate systems require careful orchestration of agent roles, memory management, and context sharing.",
        category: "Technical",
      },
      {
        id: "2",
        title: "Memory Management Best Practices",
        content:
          "Effective memory systems should support multiple scopes (organization, workspace, user, chat) with proper permission controls.",
        category: "Technical",
      },
    ]

    setExtractedMemories(mockMemories)
    setIsLoading(false)
  }

  const handleApprove = (memoryId: string) => {
    const memory = extractedMemories.find((m) => m.id === memoryId)
    if (memory && onMemoriesExtracted) {
      onMemoriesExtracted([memory])
    }
    // Remove from list
    setExtractedMemories((prev) => prev.filter((m) => m.id !== memoryId))
  }

  const handleReject = (memoryId: string) => {
    setExtractedMemories((prev) => prev.filter((m) => m.id !== memoryId))
  }

  const handleReset = () => {
    setUrl("")
    setScrapedContent(null)
    setExtractedMemories([])
    setError(null)
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* URL Input Section */}
      <div className="space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:gap-2">
          <Input
            type="url"
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading || !!scrapedContent}
            className="min-h-[48px] flex-1"
          />
          <Button
            onClick={handleScrape}
            disabled={isLoading || !!scrapedContent}
            className="min-h-[44px] md:min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scraping...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Scrape Content
              </>
            )}
          </Button>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {/* Loading State */}
      {isLoading && !scrapedContent && (
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Fetching content from URL...</p>
          </div>
        </Card>
      )}

      {/* Scraped Content Preview */}
      {scrapedContent && !isLoading && (
        <Card className="overflow-hidden">
          {scrapedContent.image && (
            <img
              src={scrapedContent.image || "/placeholder.svg"}
              alt={scrapedContent.title}
              className="h-32 w-full object-cover md:h-48"
            />
          )}
          <div className="p-4 md:p-6">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="text-base font-semibold md:text-lg">{scrapedContent.title}</h3>
              <a href={scrapedContent.url} target="_blank" rel="noopener noreferrer" className="shrink-0">
                <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">{scrapedContent.description}</p>
          </div>
        </Card>
      )}

      {/* AI Extraction in Progress */}
      {scrapedContent && isLoading && (
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">AI is extracting key information...</p>
          </div>
        </Card>
      )}

      {/* Extracted Memories Review */}
      {extractedMemories.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium md:text-base">Extracted Memories ({extractedMemories.length})</h4>
            <Button variant="outline" size="sm" onClick={handleReset} className="min-h-[44px] bg-transparent">
              Start Over
            </Button>
          </div>

          <div className="space-y-2">
            {extractedMemories.map((memory) => (
              <Card key={memory.id} className="min-h-[80px] p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-medium">{memory.title}</h5>
                      <Badge variant="secondary" className="text-xs">
                        {memory.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground md:text-sm">{memory.content}</p>
                  </div>

                  <div className="flex gap-2 md:shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApprove(memory.id)}
                      className="min-h-[44px] min-w-[44px] flex-1 md:flex-none"
                    >
                      <Check className="h-4 w-4 md:mr-2" />
                      <span className="md:inline hidden">Approve</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(memory.id)}
                      className="min-h-[44px] min-w-[44px] flex-1 md:flex-none"
                    >
                      <X className="h-4 w-4 md:mr-2" />
                      <span className="md:inline hidden">Reject</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Success State */}
      {scrapedContent && extractedMemories.length === 0 && !isLoading && (
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center">
              <p className="font-medium">All memories processed!</p>
              <p className="text-sm text-muted-foreground">You can start over to scrape another URL.</p>
            </div>
            <Button onClick={handleReset} className="min-h-[44px]">
              Scrape Another URL
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
