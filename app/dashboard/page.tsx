import Link from "next/link"
import { ArrowLeftIcon, ExternalLinkIcon, FileTextIcon, GithubIcon, ShieldIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CodeViewer } from "@/components/dashboard/code-viewer"
import { FlowDiagram } from "@/components/dashboard/exploit-diagram"
import { FundFlowTable } from "@/components/dashboard/fund-flow-table"
import { RemediationTable } from "@/components/dashboard/remediation-table"
import { Timeline } from "@/components/dashboard/timeline"
import { TVLChart } from "@/components/dashboard/tvl-chart"
import { StatCard } from "@/components/dashboard/stat-card"

// Import data from the data file
import {
  vulnerable_code,
  fixed_code,
  flow_data,
  remediationData,
  timeline,
  tvl_chart_data,
  exploit_diagram_data,
  stat_card_data,
} from "@/data/wormhole"

export default function WormholeDashboard() {
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
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Wormhole Bridge Exploit</h1>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com/wormhole-foundation/wormhole" target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://rekt.news/wormhole-rekt/" target="_blank" rel="noopener noreferrer">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Post-Mortem
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <StatCard title="Date of Exploit" value="Feb 2, 2022" />
            <StatCard
              title={stat_card_data.title}
              value={stat_card_data.value}
              isCritical={stat_card_data.isCritical}
              showProgress={stat_card_data.showProgress}
              progressValue={stat_card_data.progressValue}
            />
            <StatCard title="Funds Recovered" value="$0" isCritical={true} />
            <StatCard title="Funds Replenished" value="$325,000,000" />
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Exploit Summary</CardTitle>
                <CardDescription>Overview of the Wormhole bridge exploit</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  On February 2, 2022, an attacker exploited a vulnerability in Wormhole's signature verification
                  process to mint 120,000 wETH (worth approximately $325 million) on Solana without depositing any ETH
                  collateral. This was the second-largest DeFi hack at the time.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  The vulnerability allowed the attacker to forge guardian signatures and bypass the multi-signature
                  verification process. Jump Crypto, the parent company behind Wormhole, replenished the 120,000 ETH to
                  make users whole.
                </p>
                <div className="flex gap-2 mt-6">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href="https://etherscan.io/tx/0x24c7d855a0a931561e412d809e2596c3fd861cc7385566fd1cb528f9aeb4332c"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLinkIcon className="mr-2 h-4 w-4" />
                      View Transaction
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href="https://solscan.io/tx/2zCz2GgSoSS68eNJENWrYB48dMM1zmH8SZkgYneVDv2G4gRsVfwu5rNXYWxmFQkzGgQDVG6dT3UvPzqEVJa2mVwf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLinkIcon className="mr-2 h-4 w-4" />
                      View Solana TX
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>TVL Impact</CardTitle>
                <CardDescription>Total Value Locked before and after exploit</CardDescription>
              </CardHeader>
              <CardContent>
                <TVLChart
                  data={tvl_chart_data.data}
                  exploitDate={tvl_chart_data.exploitDate}
                  title={tvl_chart_data.title}
                  showPercentageChange={tvl_chart_data.showPercentageChange}
                />
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Exploit Flow Diagram</CardTitle>
                <CardDescription>Visual representation of the attack vector</CardDescription>
              </CardHeader>
              <CardContent>
                <FlowDiagram
                  title={exploit_diagram_data.title}
                  //@ts-ignore
                  topSteps={exploit_diagram_data.topSteps}
                  //@ts-ignore
                  bottomSteps={exploit_diagram_data.bottomSteps}
                  //@ts-ignore
                  bottomArrowLabels={exploit_diagram_data.bottomArrowLabels}
                />
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Tabs defaultValue="timeline">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="fundflow">Fund Flow</TabsTrigger>
                <TabsTrigger value="remediation">Remediation</TabsTrigger>
                <TabsTrigger value="code">Vulnerable Code</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Exploit Timeline</CardTitle>
                    <CardDescription>Chronological sequence of events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Timeline events={timeline} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fundflow" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fund Flow Analysis</CardTitle>
                    <CardDescription>Tracking the movement of stolen funds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FundFlowTable data={flow_data} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="remediation" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Remediation Actions</CardTitle>
                    <CardDescription>Steps taken to address the vulnerability and recover funds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RemediationTable data={remediationData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vulnerable Code</CardTitle>
                      <CardDescription>The code that contained the vulnerability</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CodeViewer code={vulnerable_code} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Fixed Code</CardTitle>
                      <CardDescription>The patched code that fixed the vulnerability</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CodeViewer code={fixed_code} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Lessons</CardTitle>
                <CardDescription>Key takeaways from the Wormhole exploit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldIcon className="h-5 w-5 text-destructive" />
                      <h3 className="font-medium">Signature Verification</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Always verify that signatures come from authorized sources and implement proper validation checks.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldIcon className="h-5 w-5 text-destructive" />
                      <h3 className="font-medium">Multi-Signature Security</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Implement robust multi-signature schemes with proper validation of each signer's authority.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldIcon className="h-5 w-5 text-destructive" />
                      <h3 className="font-medium">Thorough Auditing</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Critical infrastructure like bridges require multiple independent security audits and formal
                      verification.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 mb-6">
            <Separator />
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-muted-foreground">Last updated: April 12, 2023</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Suggest Edit
                </Button>
                <Button size="sm">Share Analysis</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
