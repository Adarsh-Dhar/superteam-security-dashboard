"use client"
import Link from "next/link"
import { ArrowRightIcon, CodeIcon, GitBranchIcon, GitPullRequestIcon, GithubIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ArrowLeftIcon } from "lucide-react";

export default function ContributePage() {
  return (
    <div className="container py-10">
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Contribute</h1>
        <p className="text-muted-foreground mt-2">
          Help improve security in the Solana ecosystem by contributing to this open-source project
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GithubIcon className="h-5 w-5" />
              GitHub Repository
            </CardTitle>
            <CardDescription>This project is open-source and available on GitHub</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              The Superteam Security Dashboard is an open-source project that tracks and analyzes security incidents in
              the Solana ecosystem. We welcome contributions from the community to help improve the dashboard and keep
              it up-to-date.
            </p>
            <div className="bg-muted p-4 rounded-md font-mono text-xs overflow-x-auto">
              git clone https://github.com/Adarsh-Dhar/superteam-security-dashboard.git
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-1" asChild>
              <Link href="https://github.com/Adarsh-Dhar/superteam-security-dashboard" target="_blank" rel="noopener noreferrer">
                View on GitHub <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ways to Contribute</CardTitle>
            <CardDescription>There are many ways to contribute to the project</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <GitBranchIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Add New Exploits</h3>
                  <p className="text-sm text-muted-foreground">
                    Help keep the database up-to-date by adding information about new security incidents
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <CodeIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Improve Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Enhance the dashboard with new visualizations and analytics
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <GitPullRequestIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Add Resources</h3>
                  <p className="text-sm text-muted-foreground">
                    Contribute security guides, best practices, and educational content
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-1" asChild>
              <Link href="#contribution-guide">
                View Contribution Guide <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12" id="contribution-guide">
        <h2 className="text-2xl font-bold mb-6">Contribution Guide</h2>

        <Tabs defaultValue="exploits" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="exploits">Adding Exploits</TabsTrigger>
            <TabsTrigger value="code">Code Contributions</TabsTrigger>
            <TabsTrigger value="resources">Adding Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="exploits">
            <Card>
              <CardHeader>
                <CardTitle>How to Add a New Exploit</CardTitle>
                <CardDescription>
                  Step-by-step guide for adding information about a new security incident
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">1. Fork the Repository</h3>
                  <p className="text-sm text-muted-foreground">
                    Start by forking the repository on GitHub and cloning it to your local machine.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">2. Create a New Branch</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a new branch for your contribution with a descriptive name.
                  </p>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs mt-2 overflow-x-auto">
                    git checkout -b add-exploit-protocol-name
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">3. Add Exploit Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Add the exploit data to the appropriate JSON file in the data directory. Make sure to include all
                    required fields.
                  </p>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs mt-2 overflow-x-auto">
                    {`{
  "id": "unique-id",
  "protocol": "Protocol Name",
  "type": "Protocol Type",
  "date": "YYYY-MM-DD",
  "amount": 1000000,
  "exploitType": "Type of Exploit",
  "technique": "Detailed description of the technique used",
  "audited": "Auditor Name or Unaudited",
  "link": "https://link-to-more-info.com",
  "txHash": "transaction-hash-if-available",
  "attackerAddress": "attacker-address-if-known"
}`}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">4. Submit a Pull Request</h3>
                  <p className="text-sm text-muted-foreground">
                    Commit your changes, push to your fork, and submit a pull request to the main repository.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle>Code Contribution Guidelines</CardTitle>
                <CardDescription>Guidelines for contributing code to the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">1. Set Up the Development Environment</h3>
                  <p className="text-sm text-muted-foreground">Clone the repository and install dependencies.</p>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs mt-2 overflow-x-auto">
                    {`git clone https://github.com/Adarsh-Dhar/superteam-security-dashboard.git
cd security-dashboard
npm install`}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">2. Create a Feature Branch</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a new branch for your feature or bug fix with a descriptive name.
                  </p>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs mt-2 overflow-x-auto">
                    git checkout -b feature/new-analytics-chart
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">3. Follow Coding Standards</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensure your code follows the project's coding standards and style guidelines.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2">
                    <li>Use TypeScript for type safety</li>
                    <li>Follow the existing component structure</li>
                    <li>Write meaningful comments</li>
                    <li>Include tests for new features</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">4. Submit a Pull Request</h3>
                  <p className="text-sm text-muted-foreground">
                    Once your changes are ready, submit a pull request with a clear description of the changes and any
                    related issues.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Adding Resources</CardTitle>
                <CardDescription>Guidelines for contributing educational resources and best practices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">1. Resource Types</h3>
                  <p className="text-sm text-muted-foreground">We welcome various types of educational resources:</p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2">
                    <li>Security guides and best practices</li>
                    <li>Technical explainers of exploit techniques</li>
                    <li>Code examples demonstrating secure patterns</li>
                    <li>Checklists and audit methodologies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">2. Content Format</h3>
                  <p className="text-sm text-muted-foreground">
                    Resources should be written in Markdown format and placed in the appropriate directory in the
                    repository.
                  </p>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs mt-2 overflow-x-auto">
                    {`# Title of Resource
                    
## Introduction
Brief introduction to the topic.

## Content
Main content with examples, code snippets, etc.

## References
- [Reference 1](https://example.com)
- [Reference 2](https://example.com)`}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">3. Submit for Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Submit your resource as a pull request for review by the community and maintainers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
