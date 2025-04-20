// src/app/research/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Shield, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-100">solana</span>
            <span className="text-xl font-bold text-purple-400">security</span>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-12 md:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Comprehensive Security Resources
            </h1>
            <p className="text-xl text-gray-400">
              Best practices, tools, and reference materials for Solana developers
            </p>
          </div>

          {/* Foundational Practices */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center gap-2">
                <Shield className="h-6 w-6 text-purple-400" />
                Foundational Development Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-300">Core Programming Principles</h3>
                <ul className="space-y-3">
                  {[
                    "Account ownership verification using PDA checks",
                    "Cross-program invocation validation",
                    "Arithmetic safety with checked operations",
                    "Type confusion prevention through discriminators"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-400">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-300">Secure Development Frameworks</h3>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <code className="text-purple-300 font-mono text-sm">
                    {`if !ctx.accounts.authority.is_signer {\n  return Err(ProgramError::MissingRequiredSignature);\n}`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Tools */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-purple-400" />
                Security Tooling Ecosystem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-purple-300">Tool</th>
                      <th className="px-4 py-3 text-left text-purple-300">Capabilities</th>
                      <th className="px-4 py-3 text-left text-purple-300">Integration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Radar", "Anchor pattern detection", "CLI/Python"],
                      ["Xray", "Rust analysis", "CI/CD"],
                      ["Solana Fuzzer", "Validation tests", "Cargo"],
                      ["Sec3 Scanner", "Arithmetic detection", "GitHub Actions"]
                    ].map(([tool, cap, integration], index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="px-4 py-3 text-gray-300">{tool}</td>
                        <td className="px-4 py-3 text-gray-400">{cap}</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-purple-500/20 text-purple-300">{integration}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Educational Resources */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center gap-2">
                <Book className="h-6 w-6 text-purple-400" />
                Educational Materials
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300">Learning Paths</h3>
                <ul className="space-y-3">
                  {[
                    "Solana Security Course →",
                    "BlockSec Workshop Series →",
                    "Anchor Security Reference →"
                  ].map((item, index) => (
                    <li key={index}>
                      <Link href="#" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
                        {item}
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300">Reference Guides</h3>
                <div className="space-y-2">
                  <Badge className="bg-purple-500/20 text-purple-300">23 Exploit Vectors</Badge>
                  <Badge className="bg-purple-500/20 text-purple-300">78-item Checklist</Badge>
                  <Badge className="bg-purple-500/20 text-purple-300">Forensic Toolkit</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Citations */}
          <div className="text-sm text-gray-500 text-center mt-8">
            Comprehensive security research curated from 36 industry sources
          </div>
        </div>
      </main>
    </div>
  );
}