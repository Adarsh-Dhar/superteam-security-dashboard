import Link from "next/link"
import { ArrowLeftIcon, ExternalLinkIcon, FileTextIcon, GithubIcon, ShieldIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CodeViewer } from "@/components/dashboard/code-viewer"
import { ExploitDiagram } from "@/components/dashboard/exploit-diagram"
import { FundFlowTable } from "@/components/dashboard/fund-flow-table"
import { RemediationTable } from "@/components/dashboard/remediation-table"
import { Timeline } from "@/components/dashboard/timeline"
import { TVLChart } from "@/components/dashboard/tvl-chart"
import { StatCard } from "@/components/dashboard/stat-card"
import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export default function WormholeDashboard() {
  // Mock data for the components
  const fundFlowData: FundFlow[] = [
    {
      blockchain: "Solana",
      from: "Wormhole Contract",
      to: "0x629...a92e",
      amount: "120,000 wETH",
      status: "Stolen",
    },
    {
      blockchain: "Ethereum",
      from: "0x629...a92e",
      to: "0x8d2...f3a1",
      amount: "93,750 ETH",
      status: "Traced",
    },
    {
      blockchain: "Ethereum",
      from: "0x8d2...f3a1",
      to: "Binance",
      amount: "56,250 ETH",
      status: "Frozen",
    },
    {
      blockchain: "Ethereum",
      from: "0x8d2...f3a1",
      to: "Tornado Cash",
      amount: "37,500 ETH",
      status: "Mixed",
    },
  ]

  const remediationData: RemediationAction[] = [
    {
      action: "Vulnerability patched in Wormhole contract",
      status: "Complete",
      date: "Feb 3, 2022",
    },
    {
      action: "Jump Crypto provides 120,000 ETH to restore bridge reserves",
      status: "Complete",
      date: "Feb 3, 2022",
    },
    {
      action: "Improved signature verification process implemented",
      status: "Complete",
      date: "Feb 5, 2022",
    },
    {
      action: "Additional security audit by third-party firm",
      status: "Complete",
      date: "Feb 24, 2022",
    },
    {
      action: "Recovery of stolen funds from exchanges",
      status: "In Progress",
      date: "Ongoing",
    },
  ]

  const timelineEvents: TimelineEvent[] = [
    {
      time: "Feb 2, 2022 - 18:24 UTC",
      title: "Initial Exploit Transaction",
      description:
        "Attacker exploits signature verification vulnerability to mint 120,000 wETH tokens without proper backing.",
    },
    {
      time: "Feb 2, 2022 - 19:15 UTC",
      title: "Exploit Detected",
      description: "Wormhole team detects the unauthorized minting of wETH tokens and halts bridge operations.",
    },
    {
      time: "Feb 2, 2022 - 20:30 UTC",
      title: "Public Disclosure",
      description: "Wormhole publicly announces the exploit on Twitter and begins investigation.",
    },
    {
      time: "Feb 3, 2022 - 02:45 UTC",
      title: "Vulnerability Identified",
      description: "Security team identifies the signature verification bypass vulnerability in the contract.",
    },
    {
      time: "Feb 3, 2022 - 13:30 UTC",
      title: "Patch Deployed",
      description: "Fixed version of the contract deployed with proper signature verification.",
    },
    {
      time: "Feb 3, 2022 - 16:20 UTC",
      title: "Funds Replenished",
      description: "Jump Crypto provides 120,000 ETH to restore the bridge's reserves and operations.",
    },
  ]

  const vulnerableCode = `// Vulnerable code snippet from Wormhole
function verifySignatures(bytes32 hash, Signature[] memory signatures) internal view {
  // VULNERABILITY: Improper signature verification
  // The function doesn't properly validate that signatures come from authorized guardians
  
  uint8 guardianCount = 19;
  uint8 signersLen = 0;
  
  for (uint i = 0; i < signatures.length; i++) {
    address signer = ecrecover(
      hash,
      signatures[i].v,
      signatures[i].r,
      signatures[i].s
    );
    
    // Missing proper validation of signer against authorized guardians list
    signersLen += 1;
  }
  
  // Only checks if enough signatures are provided, not if they're from valid guardians
  require(signersLen >= quorum(guardianCount), "not enough signatures");
}`

  const fixedCode = `// Fixed code after patch
function verifySignatures(bytes32 hash, Signature[] memory signatures) internal view {
  // FIXED: Proper signature verification
  
  uint8 guardianCount = 19;
  uint8 signersLen = 0;
  bool[] memory signed = new bool[](guardianCount);
  
  for (uint i = 0; i < signatures.length; i++) {
    address signer = ecrecover(
      hash,
      signatures[i].v,
      signatures[i].r,
      signatures[i].s
    );
    
    // Get guardian index from authorized list
    uint8 guardianIndex = getGuardianIndex(signer);
    
    // Verify signer is a guardian and hasn't signed already
    require(guardianIndex < guardianCount, "invalid guardian");
    require(!signed[guardianIndex], "duplicate guardian");
    
    signed[guardianIndex] = true;
    signersLen += 1;
  }
  
  require(signersLen >= quorum(guardianCount), "not enough signatures");
}`

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
            <StatCard title="Funds Lost" value="$325,000,000" isCritical={true} />
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
                <TVLChart />
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
                <ExploitDiagram />
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
                    <Timeline events={timelineEvents} />
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
                    <FundFlowTable data={fundFlowData} />
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
                      <CodeViewer code={vulnerableCode} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Fixed Code</CardTitle>
                      <CardDescription>The patched code that fixed the vulnerability</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CodeViewer code={fixedCode} />
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
