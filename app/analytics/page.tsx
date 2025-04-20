"use client"

import { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Types based on the API responses
interface IncidentData {
  day: string;
  incidents: number;
}

interface FundsLostData {
  day: string;
  amount: number;
}

interface ResponseTimeData {
  day: string;
  hours: number;
}

interface RecentIncident {
  id: string;
  program: string;
  timestamp: string;
  fundsLost: number;
  responseTime: number;
  type: string;
  status: string;
}

interface SummaryData {
  totalIncidents: number;
  activeIncidents: number;
  totalFundsLost: number;
  avgResponseTime: number;
}

interface Exploit {
  id: number;
  name: string;
  date: string;
  amount: number;
  type: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Exploit type for pie chart
interface ExploitTypeData {
  name: string;
  value: number;
}

const ExploitTypeChart: React.FC = () => {
  const [exploitTypes, setExploitTypes] = useState<ExploitTypeData[]>([]);
  
  useEffect(() => {
    // Function to process exploits and generate exploit type distribution
    const processExploitTypes = (exploits: Exploit[]) => {
      // Group by type and sum the amounts
      const typeMap = new Map<string, number>();
      
      exploits.forEach(exploit => {
        const currentAmount = typeMap.get(exploit.type) || 0;
        typeMap.set(exploit.type, currentAmount + exploit.amount);
      });
      
      // Convert map to array format needed for chart
      const result: ExploitTypeData[] = [];
      typeMap.forEach((value, name) => {
        result.push({ name, value });
      });
      
      setExploitTypes(result);
    };

    // Fetch exploit data
   
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={exploitTypes}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {exploitTypes.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default function CombinedDashboard() {
  // State for all the data from APIs
  const [incidentData, setIncidentData] = useState<IncidentData[]>([]);
  const [fundsLostData, setFundsLostData] = useState<FundsLostData[]>([]);
  const [responseTimeData, setResponseTimeData] = useState<ResponseTimeData[]>([]);
  const [recentIncidents, setRecentIncidents] = useState<RecentIncident[]>([]);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [exploits, setExploits] = useState<Exploit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format numbers
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 0,
    }).format(amount);
    
  // Format timestamp to readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Get appropriate color for incident status badge
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'bg-green-500';
      case 'mitigated':
        return 'bg-yellow-500';
      case 'investigating':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get appropriate color for incident type badge
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bug':
        return 'bg-blue-500';
      case 'hack':
        return 'bg-red-500';
      case 'phishing':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Calculate analytics from exploits array
  const totalValueLost = exploits.reduce((sum, exploit) => sum + exploit.amount, 0);
  const numberOfExploits = exploits.length;
  const averageLoss = numberOfExploits > 0 ? totalValueLost / numberOfExploits : 0;
  
  // For now, we'll hardcode these until we have real data from API
  const fundsRecovered = 0;
  const percentRecovered = 0;

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [
          incidentsResponse,
          fundsResponse,
          responseTimesResponse,
          recentIncidentsResponse,
          summaryResponse,
        ] = await Promise.all([
          fetch('/api/incidents/frequency'),
          fetch('/api/incidents/funds-lost'),
          fetch('/api/incidents/response-time'),
          fetch('/api/incidents/recent'),
          fetch('/api/incidents/summary'),
        ]);

        // Check if any responses failed
        if (!incidentsResponse.ok) throw new Error('Failed to fetch incident data');
        if (!fundsResponse.ok) throw new Error('Failed to fetch funds lost data');
        if (!responseTimesResponse.ok) throw new Error('Failed to fetch response time data');
        if (!recentIncidentsResponse.ok) throw new Error('Failed to fetch recent incidents');
        if (!summaryResponse.ok) throw new Error('Failed to fetch summary data');

        // Parse all responses
        const incidentsData: IncidentData[] = await incidentsResponse.json();
        const fundsData: FundsLostData[] = await fundsResponse.json();
        const responseTimeData: ResponseTimeData[] = await responseTimesResponse.json();
        const recentIncidentsData: RecentIncident[] = await recentIncidentsResponse.json();
        const summaryData: SummaryData = await summaryResponse.json();

        // Update state with the fetched data
        setIncidentData(incidentsData);
        setFundsLostData(fundsData);
        setResponseTimeData(responseTimeData);
        setRecentIncidents(recentIncidentsData);
        setSummaryData(summaryData);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Solana Security Incident Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value Lost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summaryData?.totalFundsLost || 0)}</div>
            <p className="text-xs text-muted-foreground">+0 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData?.totalIncidents || 0}</div>
            <p className="text-xs text-muted-foreground">+0 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData?.activeIncidents || 0}</div>
            <p className="text-xs text-muted-foreground">Currently investigating</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Funds Recovered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{percentRecovered}%</div>
            <p className="text-xs text-muted-foreground">{formatCurrency(fundsRecovered)} of {formatCurrency(totalValueLost)}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Second row cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            <CardTitle className="text-sm font-medium">Number of Exploits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numberOfExploits}</div>
            <p className="text-xs text-muted-foreground">+0 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData?.avgResponseTime || 0}h</div>
            <p className="text-xs text-muted-foreground">Time to initial response</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Audited Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60%</div>
            <p className="text-xs text-muted-foreground">of exploited protocols were audited</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Exploit Types</CardTitle>
            <CardDescription>Distribution of exploit types by value lost</CardDescription>
          </CardHeader>
          <CardContent>
            <ExploitTypeChart />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Incident Frequency</CardTitle>
            <CardDescription>Number of incidents over the past week</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incidentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Funds Lost</CardTitle>
            <CardDescription>Total funds lost due to incidents in USD</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fundsLostData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#ff0000" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Response Times</CardTitle>
            <CardDescription>Average incident response time in hours</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} hours`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#00c853" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Sources</CardTitle>
            <CardDescription>Common sources of vulnerabilities</CardDescription>
          </CardHeader>
          <CardContent className="h-48 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">40%</div>
              <p className="text-sm text-muted-foreground">from access control issues</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Value lost over time</CardDescription>
          </CardHeader>
          <CardContent className="h-48 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">↑ 12%</div>
              <p className="text-sm text-muted-foreground">increase from previous month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Response Time</CardTitle>
            <CardDescription>Average time to respond to exploits</CardDescription>
          </CardHeader>
          <CardContent className="h-48 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4.2h</div>
              <p className="text-sm text-muted-foreground">average response time</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Incidents Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>Latest security incidents reported</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Funds Lost</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">{incident.id}</TableCell>
                    <TableCell>{incident.program}</TableCell>
                    <TableCell>{formatTimestamp(incident.timestamp)}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(incident.type)}>
                        {incident.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(incident.fundsLost)}</TableCell>
                    <TableCell>{incident.responseTime.toFixed(1)} hours</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Exploit History */}
      <Card>
        <CardHeader>
          <CardTitle>Exploit History</CardTitle>
          <CardDescription>Historical record of major exploits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Protocol</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exploits.map((exploit) => (
                  <TableRow key={exploit.id}>
                    <TableCell className="font-medium">EXP-{exploit.id.toString().padStart(3, '0')}</TableCell>
                    <TableCell>{exploit.name}</TableCell>
                    <TableCell>{new Date(exploit.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {exploit.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(exploit.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}