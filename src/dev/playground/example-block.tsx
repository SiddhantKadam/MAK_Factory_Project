import * as React from "react"
import { cn } from "cn"
import { CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CodeBlock, CopyButton } from "@/dev/playground/code-block"
import type { ExampleDoc } from "@/dev/playground/registry"

/** Catches a crashing example so one broken preview doesn't take down the page. */
class PreviewBoundary extends React.Component<{ children: React.ReactNode }, { error?: Error }> {
  state: { error?: Error } = {}
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return <pre className="font-mono text-xs whitespace-pre-wrap text-destructive">{this.state.error.message}</pre>
    }
    return this.props.children
  }
}

export function ExampleBlock({
  example,
  Component,
  source,
}: {
  example: ExampleDoc
  Component: React.ComponentType
  source: string
}) {
  const [showCode, setShowCode] = React.useState(false)

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold">{example.title}</h4>
          {example.description && <p className="text-[13px] text-muted-foreground">{example.description}</p>}
        </div>
        <div className="flex items-center gap-1.5">
          <CopyButton text={source.trim()} className="text-muted-foreground hover:bg-muted hover:text-foreground" />
          <Button
            variant={showCode ? "secondary" : "ghost"}
            size="sm"
            aria-expanded={showCode}
            onClick={() => setShowCode((v) => !v)}
          >
            <CodeIcon /> {showCode ? "Hide code" : "Show code"}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "flex min-h-32 p-6 sm:p-8",
          example.canvas === "app" ? "bg-background" : "bg-card",
          example.stretch ? "items-stretch" : "items-center justify-center"
        )}
      >
        <div className={cn("w-full min-w-0", !example.stretch && "flex justify-center")}>
          <PreviewBoundary>
            <Component />
          </PreviewBoundary>
        </div>
      </div>

      {showCode && <CodeBlock code={source} className="border-t" />}
    </div>
  )
}
