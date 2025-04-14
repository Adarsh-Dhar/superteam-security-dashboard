import Link from "next/link"
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExploitTable } from "@/components/exploit-table"
import { ExploitStats } from "@/components/exploit-stats"
import { ExploitTimeline } from "@/components/exploit-timeline"
import { ExploitTypeChart } from "@/components/exploit-type-chart"
import { exploits } from "@/data/exploits"

export default function Home() {
  // Calculate total amount hacked and number of protocols
  const totalHacked = exploits.reduce((sum, exploit) => sum + exploit.amount, 0)
  const uniqueProtocols = new Set(exploits.map((e) => e.protocol)).size

  // Format the total amount
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(totalHacked)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">superteam</span>
              <span className="text-xl font-bold text-emerald-500">security</span>
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/exploits" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Exploits
            </Link>
            <Link href="/analytics" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Analytics
            </Link>
            <Link href="/resources" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Resources
            </Link>
            <Link href="/contribute" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Contribute
            </Link>
            <Link href="/ctfs" className="text-sm font-medium transition-colors hover:text-foreground/80">
              CTFs
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  solana exploits
                </h1>
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
                  for security nerds
                </h2>
              </div>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                a detailed handbook of every hack on solana conducted till date
              </p>
              <div className="mt-6">
                <Card className="bg-emerald-500 text-black border-none">
                  <CardContent className="p-4">
                    <p className="text-lg font-semibold">
                      {formattedTotal} hacked across {uniqueProtocols} Protocols
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 md:px-6">
          <Tabs defaultValue="exploits" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="exploits">Exploits</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="exploits" className="mt-6">
              <ExploitTable />
            </TabsContent>
            <TabsContent value="analytics" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Exploit Types</CardTitle>
                    <CardDescription>Distribution of exploit types in the Solana ecosystem</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ExploitTypeChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Key Statistics</CardTitle>
                    <CardDescription>Overview of security incidents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ExploitStats />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="timeline" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exploit Timeline</CardTitle>
                  <CardDescription>Chronological view of security incidents</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExploitTimeline />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="resources" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Developer Resources</CardTitle>
                    <CardDescription>Security best practices for Solana developers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Program Security</h3>
                      <p className="text-sm text-muted-foreground">Learn how to secure your Solana programs</p>
                      <Button variant="outline" size="sm" className="gap-1">
                        View Guide <ExternalLinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Audit Checklist</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive security checklist for audits</p>
                      <Button variant="outline" size="sm" className="gap-1">
                        View Checklist <ExternalLinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>User Resources</CardTitle>
                    <CardDescription>Stay safe in the Solana ecosystem</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Wallet Security</h3>
                      <p className="text-sm text-muted-foreground">Best practices for securing your wallet</p>
                      <Button variant="outline" size="sm" className="gap-1">
                        View Guide <ExternalLinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Scam Detection</h3>
                      <p className="text-sm text-muted-foreground">How to identify and avoid common scams</p>
                      <Button variant="outline" size="sm" className="gap-1">
                        View Guide <ExternalLinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contribute to Security</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Help improve security in the Solana ecosystem by contributing to this open-source project
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="gap-1">
                  View on GitHub <ExternalLinkIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-1">
                  Submit an Exploit <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Superteam Security. Open-source project.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://twitter.com/superteamearn"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              GitHub
            </Link>
            <Link
              href="https://discord.gg/superteam"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Discord
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
