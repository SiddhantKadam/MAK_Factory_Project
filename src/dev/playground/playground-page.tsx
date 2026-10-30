import * as React from "react"
import { cn } from "cn"
import { ArrowUpRightIcon } from "lucide-react"
import { Link, useSearchParams } from "react-router"

import { Overline } from "@/components/data-display/overline"
import { Tag } from "@/components/data-display/tag"
import { SearchInput } from "@/components/forms/search-input"
import { BrandMark } from "@/components/layout/app-sidebar"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/dev/playground/code-block"
import { ExampleBlock } from "@/dev/playground/example-block"
import { groups, sections, type PropDoc, type SectionDoc } from "@/dev/playground/registry"

// Each example file is both the live preview (module) and the code sample (raw text).
const modules = import.meta.glob<{ default: React.ComponentType }>("./examples/**/*.tsx", { eager: true })
const sources = import.meta.glob<string>("./examples/**/*.tsx", { eager: true, query: "?raw", import: "default" })

function loadExample(file: string) {
  const key = `./examples/${file}.tsx`
  const Component = modules[key]?.default
  const source = sources[key]
  if (!Component || source === undefined) {
    throw new Error(`Playground registry points at a missing example: ${key}`)
  }
  return { Component, source }
}

function matches(section: SectionDoc, query: string) {
  if (!query) return true
  const q = query.toLowerCase()
  return [section.title, section.group, section.description, section.importFrom ?? ""].some((s) =>
    s.toLowerCase().includes(q)
  )
}

/** Highlights the nav link of the section currently in view. */
function useActiveSection(idsKey: string) {
  const [active, setActive] = React.useState<string>()
  React.useEffect(() => {
    const ids = idsKey.split(",")
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-80px 0px -60% 0px" }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [idsKey])
  return active
}

function PropsTable({ props }: { props: PropDoc[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-muted text-[12px] tracking-wide text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-2.5 font-medium">Prop</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Default</th>
            <th className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {props.map((p) => (
            <tr key={p.name} className="align-top">
              <td className="px-4 py-3 font-mono text-[13px] font-semibold whitespace-nowrap">{p.name}</td>
              <td className="max-w-xs px-4 py-3 font-mono text-[12px] text-info-foreground">{p.type}</td>
              <td className="px-4 py-3 font-mono text-[12px] whitespace-nowrap text-muted-foreground">{p.default ?? "—"}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Section({ section }: { section: SectionDoc }) {
  const Custom = section.custom
  return (
    <section id={section.id} className="scroll-mt-24 space-y-5">
      <header className="space-y-2">
        <Overline>{section.group}</Overline>
        <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
        <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{section.description}</p>
      </header>

      {section.importFrom && (
        <div className="flex items-start justify-between gap-3 rounded-md border bg-card py-2 pr-2 pl-4">
          <code className="overflow-x-auto py-1 font-mono text-[12.5px] whitespace-pre text-foreground">{section.importFrom}</code>
          <CopyButton text={section.importFrom} className="shrink-0 bg-muted text-muted-foreground hover:text-foreground" />
        </div>
      )}

      {Custom && <Custom />}

      {section.examples?.map((example) => {
        const { Component, source } = loadExample(example.file)
        return <ExampleBlock key={example.file} example={example} Component={Component} source={source} />
      })}

      {section.props && (
        <div className="space-y-2.5">
          <h3 className="text-sm font-semibold">Props</h3>
          <PropsTable props={section.props} />
        </div>
      )}
    </section>
  )
}

export default function PlaygroundPage() {
  // Filter lives in the URL (?q=button) so a filtered view can be shared
  const [params, setParams] = useSearchParams()
  const query = params.get("q") ?? ""
  const setQuery = (q: string) => setParams(q ? { q } : {}, { replace: true, preventScrollReset: true })
  const visible = sections.filter((s) => matches(s, query))
  // A string key, so the observer only re-subscribes when the visible set changes
  const active = useActiveSection(visible.map((s) => s.id).join(","))

  // The page is lazy-loaded, so the browser's own #hash jump runs before the
  // sections exist. Re-apply it once they're rendered, so links like
  // /dev/components#button can be shared.
  React.useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  React.useEffect(() => {
    const previous = document.title
    document.title = "Component Library · PO Tracker"
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-30 flex h-15 items-center gap-4 border-b bg-card/95 px-5 backdrop-blur">
        <BrandMark title="Component Library" subtitle="PO Tracker UI kit" />
        <Tag tone="warning" variant="soft" shape="square" uppercase size="sm" className="hidden sm:inline-flex">
          Dev only
        </Tag>
        <div className="flex-1" />
        <SearchInput
          placeholder="Filter components…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery("")}
          className="hidden w-64 md:block"
          aria-label="Filter components"
        />
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            Open app <ArrowUpRightIcon />
          </Link>
        </Button>
      </header>

      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[240px_1fr]">
        <nav
          aria-label="Components"
          className="sticky top-15 hidden h-[calc(100svh-3.75rem)] overflow-y-auto border-r px-3 py-6 lg:block"
        >
          {groups.map((group) => {
            const items = visible.filter((s) => s.group === group)
            if (items.length === 0) return null
            return (
              <div key={group} className="mb-5">
                <Overline className="mb-2 px-3">{group}</Overline>
                <ul className="space-y-0.5">
                  {items.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={cn(
                          "block rounded-md px-3 py-1.5 text-sm transition-colors",
                          active === s.id
                            ? "bg-accent font-semibold text-accent-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </nav>

        <main className="min-w-0 space-y-16 px-5 py-8 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-3 rounded-lg border bg-card p-6">
            <h1 className="text-[28px] leading-tight font-semibold tracking-tight">Component Library</h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Every reusable UI component in the app, with live previews you can click through and the exact code
              behind each one. Components live in <code className="font-mono text-[13px] text-foreground">src/components</code>;
              this page is only built in development.
            </p>
          </div>

          {visible.length === 0 && <p className="text-muted-foreground">No components match "{query}".</p>}
          {visible.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </main>
      </div>
    </div>
  )
}
