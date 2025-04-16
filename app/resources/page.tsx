"use client"
import Link from "next/link"
import { ArrowRightIcon, BookIcon, CodeIcon, ExternalLinkIcon, ShieldIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ArrowLeftIcon } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="container py-10">
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground mt-2">Security resources and best practices for the Solana ecosystem</p>
      </div>

      <Tabs defaultValue="developers" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="developers">For Developers</TabsTrigger>
          <TabsTrigger value="users">For Users</TabsTrigger>
          <TabsTrigger value="auditors">For Auditors</TabsTrigger>
        </TabsList>

        <TabsContent value="developers">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldIcon className="h-5 w-5" />
                  Security Best Practices
                </CardTitle>
                <CardDescription>Essential security practices for Solana developers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Implement proper access control mechanisms</li>
                  <li>Validate all account inputs thoroughly</li>
                  <li>Use secure key management practices</li>
                  <li>Implement proper error handling</li>
                  <li>Follow secure coding patterns</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1" asChild>
                  <Link href="#">
                    View Full Guide <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CodeIcon className="h-5 w-5" />
                  Secure Code Examples
                </CardTitle>
                <CardDescription>Reference implementations of secure Solana programs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Proper account validation patterns</li>
                  <li>Secure cross-program invocation</li>
                  <li>Safe mathematical operations</li>
                  <li>Secure token handling</li>
                  <li>Proper signature verification</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1" asChild>
                  <Link href="#">
                    View Code Examples <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookIcon className="h-5 w-5" />
                  Security Checklist
                </CardTitle>
                <CardDescription>Comprehensive security checklist for Solana programs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Account validation checklist</li>
                  <li>Ownership verification</li>
                  <li>Signature verification</li>
                  <li>Arithmetic overflow/underflow prevention</li>
                  <li>Reentrancy protection</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1" asChild>
                  <Link href="#">
                    Download Checklist <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldIcon className="h-5 w-5" />
                  Wallet Security
                </CardTitle>
                <CardDescription>Best practices for securing your Solana wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Use hardware wallets for large holdings</li>
                  <li>Create separate wallets for different purposes</li>
                  <li>Verify transactions before signing</li>
                  <li>Keep your seed phrase secure and offline</li>
                  <li>Be cautious of phishing attempts</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1" asChild>
                  <Link href="#">
                    View Full Guide <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CodeIcon className="h-5 w-5" />
                  Scam Detection
                </CardTitle>
                <CardDescription>How to identify and avoid common scams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Identifying fake websites and apps</li>
                  <li>Recognizing suspicious airdrops</li>
                  <li>Avoiding social engineering attacks</li>
                  <li>Verifying project legitimacy</li>
                  <li>Reporting scams and suspicious activity</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1" asChild>
                  <Link href="#">
                    Learn More <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookIcon className="h-5 w-5" />
                  DeFi Safety
                </CardTitle>
                <CardDescription>How to safely interact with DeFi protocols</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Research protocols before using them</li>
                  <li>Start with small amounts</li>
                  <li>Check audit status and security history</li>
                  <li>Understand the risks involved</li>
                  <li>Monitor your positions regularly</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1" asChild>
                  <Link href="#">
                    View Guide <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="auditors">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldIcon className="h-5 w-5" />
                  Audit Methodology
                </CardTitle>
                <CardDescription>Comprehensive methodology for auditing Solana programs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Static analysis techniques</li>
                  <li>Dynamic analysis and testing</li>
                  <li>Common vulnerability patterns</li>
                  <li>Solana-specific security considerations</li>
                  <li>Reporting and remediation guidance</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1" asChild>
                  <Link href="#">
                    View Methodology <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CodeIcon className="h-5 w-5" />
                  Audit Tools
                </CardTitle>
                <CardDescription>Tools and resources for auditing Solana programs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Static analyzers for Rust and Solana</li>
                  <li>Fuzzing and property-based testing tools</li>
                  <li>Symbolic execution engines</li>
                  <li>Transaction simulation frameworks</li>
                  <li>Security monitoring tools</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1" asChild>
                  <Link href="#">
                    Explore Tools <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookIcon className="h-5 w-5" />
                  Vulnerability Database
                </CardTitle>
                <CardDescription>Comprehensive database of Solana vulnerabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Categorized vulnerability patterns</li>
                  <li>Real-world examples and case studies</li>
                  <li>Mitigation strategies</li>
                  <li>Impact assessment guidelines</li>
                  <li>Remediation techniques</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1" asChild>
                  <Link href="#">
                    Access Database <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">External Resources</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Solana Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Official Solana documentation with security guidelines</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full gap-1" asChild>
                <Link href="https://docs.solana.com" target="_blank" rel="noopener noreferrer">
                  Visit <ExternalLinkIcon className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Anchor Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Security best practices for Anchor development</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full gap-1" asChild>
                <Link href="https://www.anchor-lang.com" target="_blank" rel="noopener noreferrer">
                  Visit <ExternalLinkIcon className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Solana Cookbook</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Collection of useful code examples and patterns</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full gap-1" asChild>
                <Link href="https://solanacookbook.com" target="_blank" rel="noopener noreferrer">
                  Visit <ExternalLinkIcon className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Solana Forums</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Community discussions on Solana security</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full gap-1" asChild>
                <Link href="https://forums.solana.com" target="_blank" rel="noopener noreferrer">
                  Visit <ExternalLinkIcon className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
