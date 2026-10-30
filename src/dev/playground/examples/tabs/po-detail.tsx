import { CountBadge } from "@/components/data-display/count-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PoDetailTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full gap-5">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="items">
          Line Items <CountBadge className="bg-transparent text-subtle-foreground">3</CountBadge>
        </TabsTrigger>
        <TabsTrigger value="documents">
          Documents <CountBadge className="bg-transparent text-subtle-foreground">3</CountBadge>
        </TabsTrigger>
        <TabsTrigger value="activity">
          Activity <CountBadge className="bg-transparent text-subtle-foreground">1</CountBadge>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-muted-foreground">Overview content</TabsContent>
      <TabsContent value="items" className="text-muted-foreground">Line items content</TabsContent>
      <TabsContent value="documents" className="text-muted-foreground">Documents content</TabsContent>
      <TabsContent value="activity" className="text-muted-foreground">Activity content</TabsContent>
    </Tabs>
  )
}
