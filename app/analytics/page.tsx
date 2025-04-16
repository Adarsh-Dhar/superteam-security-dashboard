"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExploitTypeChart } from "@/components/exploit-type-chart"

import { exploits } from "@/data/exploits";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function AnalyticsPage() {
  // Calculate analytics from exploits array
  const totalValueLost = exploits.reduce((sum, exploit) => sum + exploit.amount, 0);
  const numberOfExploits = exploits.length;
  const averageLoss = numberOfExploits > 0 ? totalValueLost / numberOfExploits : 0;
  // Funds recovered logic placeholder (update when data available)
  const fundsRecovered = 0;
  const percentRecovered = 0;

  // Format numbers
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="container py-10">
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive analytics of security incidents in the Solana ecosystem
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value Lost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValueLost)}</div>
            <p className="text-xs text-muted-foreground">+0 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Number of Exploits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numberOfExploits}</div>
            <p className="text-xs text-muted-foreground">+0 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageLoss)}</div>
            <p className="text-xs text-muted-foreground">Per exploit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Funds Recovered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{percentRecovered}%</div>
            <p className="text-xs text-muted-foreground">${fundsRecovered} of {formatCurrency(totalValueLost)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Exploit Types</CardTitle>
            <CardDescription>Distribution of exploit types by value lost</CardDescription>
          </CardHeader>
          <CardContent>
            <ExploitTypeChart />
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Value lost to exploits over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground">Chart will be implemented with real data</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-8 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Audited vs Unaudited</CardTitle>
            <CardDescription>Comparison of exploits by audit status</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">60%</div>
              <p className="text-sm text-muted-foreground">of exploited protocols were audited</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time</CardTitle>
            <CardDescription>Average time to respond to exploits</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4.2h</div>
              <p className="text-sm text-muted-foreground">average response time</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Sources</CardTitle>
            <CardDescription>Common sources of vulnerabilities</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">40%</div>
              <p className="text-sm text-muted-foreground">from access control issues</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
