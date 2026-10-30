import * as React from "react"
import { cn } from "cn"
import { CheckIcon, CopyIcon } from "lucide-react"

/** Tiny TSX highlighter — enough for readable examples without a dependency. */
const TOKEN =
  /(?<comment>\/\/.*|\/\*[\s\S]*?\*\/|\{\/\*[\s\S]*?\*\/\})|(?<string>"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(?<tag><\/?[A-Z][\w.]*|<\/?[a-z][\w-]*(?=[\s>/]))|(?<keyword>\b(?:import|from|export|default|function|const|let|return|type|as|if|else|null|true|false|undefined|new|async|await)\b)|(?<number>\b\d[\d_.]*\b)/g

const tokenClass: Record<string, string> = {
  comment: "text-stone-500 italic",
  string: "text-emerald-300",
  tag: "text-sky-300",
  keyword: "text-orange-300",
  number: "text-amber-200",
}

function highlight(code: string) {
  const out: React.ReactNode[] = []
  let last = 0
  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0
    if (index > last) out.push(code.slice(last, index))
    const kind = Object.entries(match.groups ?? {}).find(([, v]) => v !== undefined)?.[0]
    out.push(
      <span key={index} className={kind ? tokenClass[kind] : undefined}>
        {match[0]}
      </span>
    )
    last = index + match[0].length
  }
  out.push(code.slice(last))
  return out
}

function useCopy() {
  const [copied, setCopied] = React.useState(false)
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be blocked (http, iframe); nothing else to do.
    }
  }
  return { copied, copy }
}

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-md px-2 font-mono text-[11px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
    >
      {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  const trimmed = code.trim()
  const highlighted = React.useMemo(() => highlight(trimmed), [trimmed])

  return (
    <div className={cn("relative bg-[#1c1917]", className)}>
      <CopyButton text={trimmed} className="absolute top-3 right-3 bg-white/10 text-stone-200 hover:bg-white/20" />
      <pre className="max-h-[520px] overflow-auto p-5 pr-24 font-mono text-[12.5px] leading-relaxed text-stone-200">
        <code>{highlighted}</code>
      </pre>
    </div>
  )
}
