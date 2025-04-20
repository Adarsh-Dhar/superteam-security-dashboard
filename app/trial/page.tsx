// app/dashboard/page.tsx
'use client';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
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

export default function Dashboard() {
  // State for all the data from APIs
  const [incidentData, setIncidentData] = useState<IncidentData[]>([]);
  const [fundsLostData, setFundsLostData] = useState<FundsLostData[]>([]);
  const [responseTimeData, setResponseTimeData] = useState<ResponseTimeData[]>([]);
  const [recentIncidents, setRecentIncidents] = useState<RecentIncident[]>([]);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
          summaryResponse
        ] = await Promise.all([
          fetch('/api/incidents/frequency'),
          fetch('/api/incidents/funds-lost'),
          fetch('/api/incidents/response-time'),
          fetch('/api/incidents/recent'),
          fetch('/api/incidents/summary')
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

  // Format funds lost as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

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

  // Show loading state or error message
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
      <h1 className="text-3xl font-bold mb-8">Solana Incident Monitoring Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData?.totalIncidents || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData?.activeIncidents || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Funds Lost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summaryData?.totalFundsLost || 0)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData?.avgResponseTime || 0} secs</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>Latest incidents reported in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Funds Lost</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentIncidents.slice(0, 5).map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.id}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(incident.type)}>
                          {incident.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(incident.fundsLost)}</TableCell>
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
      </div>
      
      {/* Detailed Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Incident Details</CardTitle>
          <CardDescription>Comprehensive list of all recent incidents</CardDescription>
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
                    <TableCell>{incident.responseTime.toFixed(1)} secs</TableCell>
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
    </div>
  );
}