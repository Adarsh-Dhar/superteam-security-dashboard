import { NextResponse } from 'next/server';
import { Connection } from '@solana/web3.js';
import { formatDateToMMDD } from '@/utils/dateUtils';

interface ResponseTimeData {
  day: string;
  hours: number;
}

// Simplified model for incidents in database
interface IncidentRecord {
  id: string;
  detectionTx: string;
  recoveryTx: string | null;
  detectionTime: number;
  recoveryTime: number | null;
  program: string;
  resolved: boolean;
}

// This would be replaced by your actual database implementation
// Here we're simulating a database with an in-memory array
const incidentDatabase: IncidentRecord[] = [
  // In a real implementation, this would be populated from your database
];

// Helper to calculate response time between detection and recovery
async function getResponseTime(
  connection: Connection,
  detectionTx: string,
  recoveryTx: string
): Promise<number> {
  try {
    const [detectionInfo, recoveryInfo] = await Promise.all([
      connection.getTransaction(detectionTx),
      connection.getTransaction(recoveryTx)
    ]);
    
    if (!detectionInfo || !recoveryInfo || 
        !detectionInfo.blockTime || !recoveryInfo.blockTime) {
      return 0;
    }
    
    // Calculate time difference in hours
    const detectTime = detectionInfo.blockTime;
    const recoveryTime = recoveryInfo.blockTime;
    
    return (recoveryTime - detectTime) / 3600; // Convert seconds to hours
  } catch (error) {
    console.error('Error calculating response time:', error);
    return 0;
  }
}

export async function GET() {
  try {
    const connection = new Connection(process.env.SOLANA_RPC_URL || ""); ;
    
    // Get current date and calculate 7 days ago
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6); // 7 days including today
    
    // Initialize response time data for the past week
    const responseTimes = new Map<string, number[]>();
    for (let i = 0; i < 7; i++) {
      const date = new Date(endDate);
      date.setDate(endDate.getDate() - i);
      responseTimes.set(formatDateToMMDD(date), []);
    }
    
    // In a real implementation, fetch incidents from your database
    // Here we'll check our in-memory array simulating a database
    
    // For demonstration purposes, let's populate the database with sample data
    // In a real implementation, this would come from your actual database
    if (incidentDatabase.length === 0) {
      // Populate with some sample data for demonstration
      for (let i = 0; i < 20; i++) {
        const detectionTime = Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 7 * 24 * 3600);
        const responseDelay = Math.random() * 10 * 3600; // 0-10 hours in seconds
        
        incidentDatabase.push({
          id: `inc-${i.toString().padStart(3, '0')}`,
          detectionTx: `sample-detection-tx-${i}`,
          recoveryTx: `sample-recovery-tx-${i}`,
          detectionTime,
          recoveryTime: detectionTime + responseDelay,
          program: ['TokenSwap', 'NFTMarket', 'LendingPool', 'StakingContract'][Math.floor(Math.random() * 4)],
          resolved: Math.random() > 0.2, // 80% resolved
        });
      }
    }
    
    // Process each incident to calculate response time
    for (const incident of incidentDatabase) {
      if (!incident.resolved || !incident.recoveryTime) continue;
      
      const incidentDate = new Date(incident.detectionTime * 1000);
      const dayKey = formatDateToMMDD(incidentDate);
      
      // Only include incidents from the past week
      if (incidentDate >= startDate && incidentDate <= endDate) {
        const responseTimeHours = (incident.recoveryTime - incident.detectionTime) / 3600;
        
        if (responseTimes.has(dayKey)) {
          responseTimes.get(dayKey)?.push(responseTimeHours);
        }
      }
    }
    
    // Calculate average response time per day
    const responseTimeData: ResponseTimeData[] = Array.from(responseTimes.entries())
      .map(([day, times]) => {
        // Calculate average or return 0 if no incidents
        const average = times.length > 0 
          ? times.reduce((sum, time) => sum + time, 0) / times.length
          : 0;
        
        return {
          day,
          hours: parseFloat(average.toFixed(1)) // Round to 1 decimal place
        };
      })
      .sort((a, b) => {
        const dateA = new Date(a.day + " " + new Date().getFullYear());
        const dateB = new Date(b.day + " " + new Date().getFullYear());
        return dateA.getTime() - dateB.getTime();
      });
    
    return NextResponse.json(responseTimeData);
  } catch (error) {
    console.error('Error fetching response time data:', error);
    return NextResponse.json({ error: 'Failed to fetch response time data' }, { status: 500 });
  }
}