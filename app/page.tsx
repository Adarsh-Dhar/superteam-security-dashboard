// src/app/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Book, Shield, Users, AlertTriangle, BookOpen, CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Types
interface SecurityTool {
  name: string;
  type: string;
  description: string;
  integration: string;
}

interface AuditPlatform {
  name: string;
  focus: string[];
}

interface VulnerabilityStat {
  name: string;
  count: number;
}

interface ResourceDistribution {
  name: string;
  value: number;
}

interface BestPractice {
  category: string;
  practices: string[];
}

interface SecurityIncident {
  name: string;
  date: string;
  impact: string;
  vulnerability: string;
  status: "Resolved" | "Investigation";
}

// Security tools data
const securityTools: SecurityTool[] = [
  { name: "Radar", type: "Static Analysis", description: "Anchor-specific pattern detection", integration: "CLI/Python rules engine" },
  { name: "Xray", type: "Static Analysis", description: "Cross-platform Rust analysis", integration: "CI/CD pipelines" },
  { name: "Solana Fuzzer", type: "Testing", description: "State transition & input validation tests", integration: "Cargo integration" },
  { name: "Sec3 Scanner", type: "Static Analysis", description: "Arithmetic vulnerability detection", integration: "GitHub Actions plugin" },
  { name: "Helius Webhooks", type: "Runtime Monitoring", description: "Real-time transaction alerts", integration: "API endpoints" },
  { name: "Solana Forensic Toolkit", type: "Analysis", description: "Transaction trace visualization", integration: "CLI tool" },
];

// Audit platforms data
const auditPlatforms: AuditPlatform[] = [
  { name: "OtterSec", focus: ["Anchor constraint validation", "PDA derivation safety", "Cross-program risks"] },
  { name: "Neodyme", focus: ["Custom fuzzing harnesses", "State transition attack simulations"] },
  { name: "Kudelski", focus: ["Z3 theorem prover integration", "TLA+ specification validation"] },
];

// Vulnerability stats data for chart
const vulnerabilityStats: VulnerabilityStat[] = [
  { name: "Account Validation", count: 42 },
  { name: "PDA Misuse", count: 38 },
  { name: "Arithmetic", count: 29 },
  { name: "CPI Safety", count: 24 },
  { name: "Reinitialization", count: 21 },
];

// Security resources distribution for pie chart
const resourcesDistribution: ResourceDistribution[] = [
  { name: "Tools", value: 26 },
  { name: "Guides", value: 32 },
  { name: "Courses", value: 18 },
  { name: "Libraries", value: 24 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Best practices data
const bestPractices: BestPractice[] = [
  {
    category: "Account Validation",
    practices: [
      "Implement mandatory ownership verification checks",
      "Verify signers with explicit is_signer checks",
      "Validate initialization states to prevent reuse",
      "Use PDA checks with canonical bumps"
    ]
  },
  {
    category: "Arithmetic Safety",
    practices: [
      "Use Rust's checked_ methods for all math operations",
      "Implement bounds checking on all numeric inputs",
      "Guard against overflow/underflow in token operations",
      "Apply safe type conversion patterns"
    ]
  },
  {
    category: "Cross-Program Invocation",
    practices: [
      "Verify program IDs on all CPIs",
      "Validate account ownership before CPI",
      "Use explicit seeds verification on PDAs",
      "Implement proper CPI context handling"
    ]
  }
];

// Recent security incidents
const securityIncidents: SecurityIncident[] = [
  {
    name: "Protocol Alpha",
    date: "2025-03-15",
    impact: "$2.3M",
    vulnerability: "Missing owner validation",
    status: "Resolved"
  },
  {
    name: "DeFi Delta",
    date: "2025-02-28",
    impact: "$850K",
    vulnerability: "PDA signature verification bypass",
    status: "Resolved"
  },
  {
    name: "Platform Omega",
    date: "2025-04-05",
    impact: "$5.1M",
    vulnerability: "CPI privilege escalation",
    status: "Investigation"
  }
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter tools based on search query
  const filteredTools = securityTools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total amount hacked
  const totalHacked = securityIncidents.reduce((sum, incident) => {
    const amountStr = incident.impact;
    const numericPart = parseFloat(amountStr.replace('$', ''));
    const multiplier = amountStr.includes('M') ? 1000000 : amountStr.includes('K') ? 1000 : 1;
    return sum + (numericPart * multiplier);
  }, 0);

  // Format total amount
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(totalHacked);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">solana</span>
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
                  solana security research
                </h1>
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
                  for developers & security researchers
                </h2>
              </div>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                comprehensive insights into solana security tools, vulnerabilities, and best practices
              </p>
              <div className="mt-6">
                <Card className="bg-emerald-500 text-black border-none">
                  <CardContent className="p-4">
                    <p className="text-lg font-semibold">
                      {formattedTotal} lost across {securityIncidents.length} major incidents
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 md:px-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Available Tools</CardDescription>
                <CardTitle className="flex justify-between items-center">
                  26
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Security Resources</CardDescription>
                <CardTitle className="flex justify-between items-center">
                  58
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Known Vulnerabilities</CardDescription>
                <CardTitle className="flex justify-between items-center">
                  154
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Audit Platforms</CardDescription>
                <CardTitle className="flex justify-between items-center">
                  12
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="tools">Security Tools</TabsTrigger>
              <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
              <TabsTrigger value="auditing">Auditing Resources</TabsTrigger>
              <TabsTrigger value="incidents">Security Incidents</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Security Tools Tab */}
            <TabsContent value="tools" className="space-y-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Security Tooling Ecosystem</h2>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tools..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{tool.name}</CardTitle>
                        <Badge variant="outline">{tool.type}</Badge>
                      </div>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Integration:</span> {tool.integration}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Best Practices Tab */}
            <TabsContent value="best-practices" className="space-y-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Secure Development Practices</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {bestPractices.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.practices.map((practice, practiceIndex) => (
                          <li key={practiceIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <span>{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Anchor Framework Safeguards</CardTitle>
                  <CardDescription>Built-in protections against common vulnerabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Type Safety Features</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Automatic account type discrimination (8-byte identifiers)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Macro-based constraints for signer verification</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">PDA Safety</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>PDA derivation safety with seeds and bump attributes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Native protection against reinitialization attacks</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Auditing Resources Tab */}
            <TabsContent value="auditing" className="space-y-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Auditing & Verification Resources</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {auditPlatforms.map((platform, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{platform.name}</CardTitle>
                      <CardDescription>Audit Platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-sm font-medium mb-2">Focus Areas:</h3>
                      <ul className="space-y-1">
                        {platform.focus.map((area, areaIndex) => (
                          <li key={areaIndex} className="text-sm flex items-center gap-2">
                            <Shield className="h-4 w-4 text-blue-500" />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Self-Verification Procedures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Deterministic Builds</h3>
                      <div className="bg-slate-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        solana-verify build --docker --features mainnet
                      </div>
                      <p className="text-sm mt-2">Generates on-chain PDA with build metadata</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Bytecode Consistency Checks</h3>
                      <div className="bg-slate-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        solana program dump onchain.so<br />
                        sha256sum onchain.so local.so
                      </div>
                      <p className="text-sm mt-2">Compare deployed program hash against local build</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Incidents Tab */}
            <TabsContent value="incidents" className="space-y-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Security Incidents</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Incident Timeline</CardTitle>
                  <CardDescription>Notable security incidents in the Solana ecosystem</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-slate-100">
                        <tr>
                          <th scope="col" className="px-6 py-3">Protocol</th>
                          <th scope="col" className="px-6 py-3">Date</th>
                          <th scope="col" className="px-6 py-3">Impact</th>
                          <th scope="col" className="px-6 py-3">Vulnerability</th>
                          <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {securityIncidents.map((incident, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-6 py-4 font-medium">{incident.name}</td>
                            <td className="px-6 py-4">{incident.date}</td>
                            <td className="px-6 py-4">{incident.impact}</td>
                            <td className="px-6 py-4">{incident.vulnerability}</td>
                            <td className="px-6 py-4">
                              <Badge variant={incident.status === "Resolved" ? "outline" : "destructive"}>
                                {incident.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Incident Response Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Pre-Signed Transactions</h3>
                      <p className="text-sm">Store emergency pause transactions in cold storage with:</p>
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        <li>Multi-sig time-lock releases</li>
                        <li>On-chain validity period constraints</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Automated Circuit Breakers</h3>
                      <div className="bg-slate-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        if unusual_activity_detected() &#123; <br />
                        &nbsp;&nbsp;invoke(&emergency_halt_ix, accounts)?; <br />
                        &#125;
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Vulnerability Categories</CardTitle>
                    <CardDescription>Distribution of reported vulnerabilities by type</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={vulnerabilityStats}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Resources Distribution</CardTitle>
                    <CardDescription>Types of security resources available</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resourcesDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {resourcesDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Educational Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Structured Learning Paths</h3>
                      <div className="space-y-2">
                        <div className="bg-slate-50 p-3 border rounded-md">
                          <div className="flex items-center gap-2">
                            <Book className="h-5 w-5 text-blue-500" />
                            <span className="font-medium">Solana Security Course</span>
                          </div>
                          <p className="text-sm mt-1">Comprehensive coverage of signer authorization, account type confusion, and PDA collision prevention.</p>
                        </div>
                        <div className="bg-slate-50 p-3 border rounded-md">
                          <div className="flex items-center gap-2">
                            <Book className="h-5 w-5 text-blue-500" />
                            <span className="font-medium">BlockSec Workshop Series</span>
                          </div>
                          <p className="text-sm mt-1">Detailed exploration of multi-sig implementation pitfalls and program upgrade security.</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Technical Reference Guides</h3>
                      <div className="space-y-2">
                        <div className="bg-slate-50 p-3 border rounded-md">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-green-500" />
                            <span className="font-medium">Sealevel Attacks Compendium</span>
                          </div>
                          <p className="text-sm mt-1">Documents 23 exploit vectors with mitigation code samples.</p>
                        </div>
                        <div className="bg-slate-50 p-3 border rounded-md">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-green-500" />
                            <span className="font-medium">Solana Program Security Checklist</span>
                          </div>
                          <p className="text-sm mt-1">78-item validation list covering account lifecycle management and more.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                <Button>
                  View on GitHub 
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Solana Security. Open-source project.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://twitter.com/solana"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com/solana-labs"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              GitHub
            </Link>
            <Link
              href="https://discord.gg/solana"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Discord
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}