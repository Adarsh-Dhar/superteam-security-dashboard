import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { StatCard } from "@/components/dashboard/stat-card";
import { FundFlowTable } from "@/components/dashboard/fund-flow-table";
import { RemediationTable } from "@/components/dashboard/remediation-table";
import { Timeline } from "@/components/dashboard/timeline";
import { ExploitDiagram } from "@/components/dashboard/exploit-diagram";
import { TVLChart } from "@/components/dashboard/tvl-chart";
import { CodeViewer } from "@/components/dashboard/code-viewer";

import { 
  fundFlowData, 
  remediationData, 
  timelineData, 
  vulnerableCode,
  fixedCode
} from "@/data/dashboard-data";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-6 px-4 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Wormhole Bridge Exploit Dashboard</h1>
          <div className="flex items-center gap-2">
            <Badge variant="destructive">Critical Severity</Badge>
            <span className="text-sm text-slate-500">Last Updated: 13 minutes ago</span>
          </div>
        </div>

        {/* Alert */}
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            <strong>Active Investigation:</strong> Wormhole team has confirmed exploit. Funds are still being traced.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Value Lost" value="$320,000,000" isCritical={true} />
          <StatCard title="Assets Stolen" value="120,000 wETH" />
          <StatCard title="Recovery Status" value="16% Recovered" showProgress={true} progressValue={16} />
          <StatCard title="Exploit Date" value="Feb 2, 2022" />
        </div>

        {/* Technical Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Exploit Technical Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ExploitDiagram />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Type:</p>
                <p>Signature Verification Bypass</p>
              </div>
              <div>
                <p className="font-medium">Root Cause:</p>
                <p>Missing Guardian signature verification</p>
              </div>
              <div>
                <p className="font-medium">Affected Contracts:</p>
                <ul className="list-disc pl-5">
                  <li>Bridge.sol</li>
                  <li>TokenBridge.sol</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Issue Patch:</p>
                <a href="#" className="text-blue-600 hover:underline">View on GitHub</a>
              </div>
              <div>
                <p className="font-medium">Impacted Chains:</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="bg-yellow-50">Solana</Badge>
                  <Badge variant="outline" className="bg-yellow-50">Ethereum</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fund Flow & TVL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Fund Flow Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <FundFlowTable data={fundFlowData} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>TVL Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <TVLChart />
            </CardContent>
          </Card>
        </div>
        
        {/* Timeline */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Exploit Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline events={timelineData} />
          </CardContent>
        </Card>

        {/* Code Vulnerability & Remediation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Code Vulnerability</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="vulnerable">
                <TabsList className="mb-4">
                  <TabsTrigger value="vulnerable">Vulnerable Code</TabsTrigger>
                  <TabsTrigger value="fixed">Fixed Code</TabsTrigger>
                </TabsList>
                <TabsContent value="vulnerable">
                  <CodeViewer code={vulnerableCode} />
                </TabsContent>
                <TabsContent value="fixed">
                  <CodeViewer code={fixedCode} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Remediation Status</CardTitle>
            </CardHeader>
            <CardContent>
              <RemediationTable data={remediationData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
